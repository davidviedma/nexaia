"use client"

import {
  useRef,
  type CSSProperties,
  type MouseEvent,
  type ReactNode,
} from "react"
import { cn } from "@/lib/utils"

/* ── Spotlight Card ─────────────────────────────────────────── */

export function SpotlightCard({
  children,
  className,
  color = "rgba(6, 195, 214, 0.22)",
  as: Tag = "div",
  ...rest
}: {
  children: ReactNode
  className?: string
  color?: string
  as?: "div" | "button"
} & Omit<React.HTMLAttributes<HTMLElement>, "color">) {
  const ref = useRef<HTMLElement>(null)
  const Comp = Tag as React.ElementType

  function onMove(e: MouseEvent<HTMLElement>) {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty("--spot-x", `${e.clientX - r.left}px`)
    el.style.setProperty("--spot-y", `${e.clientY - r.top}px`)
    rest.onMouseMove?.(
      e as MouseEvent<HTMLDivElement> & MouseEvent<HTMLButtonElement>
    )
  }

  return (
    <Comp
      {...rest}
      ref={ref}
      onMouseMove={onMove}
      className={cn("spotlight-card", className)}
      style={{ ...(rest.style ?? {}), "--spot-color": color } as CSSProperties}
    >
      {children}
    </Comp>
  )
}

/* ── Glare Hover ────────────────────────────────────────────── */

export function GlareHover({
  children,
  className,
  angle = -35,
  opacity = 0.35,
  size = 260,
  duration = 700,
}: {
  children: ReactNode
  className?: string
  angle?: number
  opacity?: number
  size?: number
  duration?: number
}) {
  return (
    <div
      className={cn("glare-hover", className)}
      style={
        {
          "--glare-angle": `${angle}deg`,
          "--glare-opacity": opacity,
          "--glare-size": `${size}%`,
          "--glare-duration": `${duration}ms`,
        } as CSSProperties
      }
    >
      {children}
    </div>
  )
}

/* ── Star Border ────────────────────────────────────────────── */

export function StarBorder({
  children,
  className,
  color = "#06c3d6",
  speed = 6,
  thickness = 1,
}: {
  children: ReactNode
  className?: string
  color?: string
  speed?: number
  thickness?: number
}) {
  return (
    <div
      className={cn(
        "star-border relative inline-block overflow-hidden rounded-full",
        className
      )}
      style={{ padding: thickness }}
    >
      <span
        aria-hidden
        className="star-border__bottom"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 12%)`,
          animationDuration: `${speed}s`,
        }}
      />
      <span
        aria-hidden
        className="star-border__top"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 12%)`,
          animationDuration: `${speed}s`,
        }}
      />
      <span className="relative z-[1] block">{children}</span>
    </div>
  )
}
