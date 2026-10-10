"use client"

import { useEffect, useRef, type ReactNode } from "react"
import { cn } from "@/lib/utils"
import {
  getScrollVelocity,
  subscribeScrollVelocity,
} from "@/lib/scroll-velocity"

/**
 * Infinite row of content that drifts on its own and speeds up (and flips
 * direction) with the scroll velocity. After React Bits "Scroll Velocity".
 */
export function VelocityRow({
  children,
  baseVelocity = 60,
  copies = 4,
  className,
  trackClassName,
}: {
  children: ReactNode
  baseVelocity?: number
  copies?: number
  className?: string
  trackClassName?: string
}) {
  const trackRef = useRef<HTMLDivElement>(null)
  const firstRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const track = trackRef.current
    const first = firstRef.current
    if (!track || !first) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const unsubscribe = subscribeScrollVelocity()

    let x = 0
    let width = first.offsetWidth
    let dir = Math.sign(baseVelocity) || 1
    let last = performance.now()
    let raf = 0
    let visible = false

    const ro = new ResizeObserver(() => {
      width = first.offsetWidth
    })
    ro.observe(first)

    const loop = (now: number) => {
      if (!visible) {
        raf = 0
        return
      }
      const dt = Math.min(64, now - last) / 1000
      last = now
      const v = reduce ? 0 : getScrollVelocity()
      if (v < -0.5) dir = -Math.sign(baseVelocity)
      else if (v > 0.5) dir = Math.sign(baseVelocity)
      const boost = 1 + Math.min(6, Math.abs(v) * 0.12)
      x += dir * Math.abs(baseVelocity) * boost * dt
      if (width > 0) {
        x = ((x % width) + width) % width
        track.style.transform = `translate3d(${-x}px, 0, 0)`
      }
      raf = requestAnimationFrame(loop)
    }
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible && !raf) {
        last = performance.now()
        raf = requestAnimationFrame(loop)
      }
    })
    io.observe(track)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      unsubscribe()
    }
  }, [baseVelocity])

  return (
    <div className={cn("relative overflow-hidden", className)} aria-hidden>
      <div
        ref={trackRef}
        className={cn("flex w-max will-change-transform", trackClassName)}
      >
        {Array.from({ length: copies }).map((_, i) => (
          <div
            key={i}
            ref={i === 0 ? firstRef : undefined}
            className="flex shrink-0 items-center"
          >
            {children}
          </div>
        ))}
      </div>
    </div>
  )
}
