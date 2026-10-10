"use client"

import { useEffect, useRef, type ElementType, type ReactNode } from "react"
import { cn } from "@/lib/utils"

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

    let raf = 0
    let visible = false

    const update = () => {
      raf = 0
      if (!visible) return
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      const centre = rect.top + rect.height / 2 - vh / 2
      el.style.transform = `translate3d(0, ${(-centre * speed).toFixed(1)}px, 0)`
    }
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        schedule()
      },
      { rootMargin: "30% 0px 30% 0px" }
    )
    io.observe(el)
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule)
    schedule()

    return () => {
      io.disconnect()
      window.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", schedule)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [speed])

  return (
    <Tag ref={ref} className={cn("will-change-transform", className)}>
      {children}
    </Tag>
  )
}
