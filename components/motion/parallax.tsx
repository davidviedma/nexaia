"use client"

import { useEffect, useRef, type ElementType, type ReactNode } from "react"
import { cn } from "@/lib/utils"
import { addScrollTask, requestScrollFlush } from "@/lib/scroll-scheduler"

/**
 * Moves its children vertically at a fraction of the scroll speed.
 * Positive `speed` lags behind the page (feels further away), negative
 * runs ahead of it.
 */
export function Parallax({
  children,
  speed = 0.15,
  className,
  as: Tag = "div",
}: {
  children: ReactNode
  speed?: number
  className?: string
  as?: ElementType
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let visible = false
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        requestScrollFlush()
      },
      { rootMargin: "30% 0px 30% 0px" }
    )
    io.observe(el)
    const remove = addScrollTask({
      read: () => {
        if (!visible) return null
        const rect = el.getBoundingClientRect()
        return rect.top + rect.height / 2 - window.innerHeight / 2
      },
      write: (centre) => {
        if (centre === null) return
        el.style.transform = `translate3d(0, ${(-centre * speed).toFixed(1)}px, 0)`
      },
    })
    return () => {
      io.disconnect()
      remove()
    }
  }, [speed])

  return (
    <Tag ref={ref} className={cn("will-change-transform", className)}>
      {children}
    </Tag>
  )
}
