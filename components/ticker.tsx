"use client"

import { useEffect, useRef } from "react"
import { ticker } from "@/lib/content"
import { cn } from "@/lib/utils"

/**
 * Infinite marquee with the brand words. The track skews and nudges with
 * the scroll velocity, so it reacts to how fast you move through the page.
 */
export function Ticker({
  tone = "light",
  className,
}: {
  tone?: "light" | "dark"
  className?: string
}) {
  const trackRef = useRef<HTMLDivElement>(null)
  const items = [...ticker, ...ticker]

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let raf = 0
    let last = window.scrollY
    let vel = 0
    let skew = 0

    const loop = () => {
      const y = window.scrollY
      const lenisVel = parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue(
          "--scroll-velocity"
        )
      )
      const raw = Number.isFinite(lenisVel) ? lenisVel : y - last
      last = y
      vel += (raw - vel) * 0.12
      const targetSkew = Math.max(-14, Math.min(14, vel * 0.45))
      skew += (targetSkew - skew) * 0.15
      el.style.transform = `skewX(${skew.toFixed(2)}deg) translate3d(${(-vel * 1.2).toFixed(1)}px, 0, 0)`
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div
      className={cn(
        "marquee-row relative w-full overflow-hidden py-5",
        tone === "light"
          ? "border-y border-line bg-white"
          : "border-y border-white/10 bg-navy",
        className
      )}
      aria-hidden
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r to-transparent",
          tone === "light" ? "from-white" : "from-navy"
        )}
      />
      <div
        className={cn(
          "pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l to-transparent",
          tone === "light" ? "from-white" : "from-navy"
        )}
      />
      <div ref={trackRef} className="will-change-transform">
        <div
          className="animate-marquee flex w-max items-center"
          style={{ willChange: "transform" }}
        >
          {items.map((word, i) => (
            <span key={`${word}-${i}`} className="flex items-center">
              <span
                className={cn(
                  "px-7 text-sm font-bold tracking-[0.22em] uppercase",
                  tone === "light" ? "text-ink" : "text-white"
                )}
              >
                {word}
              </span>
              <span className="size-2 rounded-full bg-cyan" />
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
