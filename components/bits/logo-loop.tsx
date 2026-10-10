"use client"

import { useEffect, useRef, type ReactNode } from "react"
import { cn } from "@/lib/utils"

/**
 * Seamless horizontal loop of items that eases to a stop on hover.
 * After React Bits "Logo Loop".
 */
export function LogoLoop({
  items,
  speed = 50,
  gap = 14,
  className,
  fadeClassName = "from-white",
  renderItem,
  direction = "left",
}: {
  items: { key: string; node: ReactNode }[]
  speed?: number
  gap?: number
  className?: string
  fadeClassName?: string
  renderItem?: (node: ReactNode) => ReactNode
  direction?: "left" | "right"
}) {
  const trackRef = useRef<HTMLDivElement>(null)
  const seqRef = useRef<HTMLUListElement>(null)
  const hoverRef = useRef(false)

  useEffect(() => {
    const track = trackRef.current
    const seq = seqRef.current
    if (!track || !seq) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let width = seq.offsetWidth
    const ro = new ResizeObserver(() => {
      width = seq.offsetWidth
    })
    ro.observe(seq)

    let x = 0
    let vel = speed
    let last = performance.now()
    let raf = 0
    const sign = direction === "left" ? 1 : -1

    const loop = (now: number) => {
      const dt = Math.min(64, now - last) / 1000
      last = now
      const target = hoverRef.current ? 0 : speed
      vel += (target - vel) * Math.min(1, dt / 0.25)
      x += sign * vel * dt
      if (width > 0) {
        x = ((x % width) + width) % width
        track.style.transform = `translate3d(${-x}px, 0, 0)`
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [speed, direction])

  const copies = 3
  return (
    <div
      className={cn("relative overflow-hidden", className)}
      onMouseEnter={() => (hoverRef.current = true)}
      onMouseLeave={() => (hoverRef.current = false)}
    >
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r to-transparent",
          fadeClassName
        )}
      />
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l to-transparent",
          fadeClassName
        )}
      />
      <div ref={trackRef} className="flex w-max will-change-transform">
        {Array.from({ length: copies }).map((_, c) => (
          <ul
            key={c}
            ref={c === 0 ? seqRef : undefined}
            className="flex shrink-0 items-center"
            style={{ gap, paddingRight: gap }}
            aria-hidden={c > 0}
          >
            {items.map((it) => (
              <li key={`${c}-${it.key}`} className="shrink-0">
                {renderItem ? renderItem(it.node) : it.node}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}
