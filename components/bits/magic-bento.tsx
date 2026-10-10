"use client"

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  type MouseEvent,
  type ReactNode,
} from "react"
import { cn } from "@/lib/utils"

/**
 * After React Bits "Magic Bento": a spotlight that follows the pointer
 * across the grid, lights the borders of nearby cards, spawns drifting
 * particles on hover and ripples on click.
 */

const GLOW = "25, 81, 252"
const PARTICLE = "6, 195, 214"

const GridContext = createContext<{ radius: number } | null>(null)

export function BentoGrid({
  children,
  className,
  radius = 320,
}: {
  children: ReactNode
  className?: string
  radius?: number
}) {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return
    if (!window.matchMedia("(pointer: fine)").matches) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const spot = document.createElement("div")
    spot.setAttribute("aria-hidden", "true")
    spot.style.cssText = `position:fixed;left:0;top:0;width:${radius * 2.6}px;height:${radius * 2.6}px;border-radius:50%;pointer-events:none;z-index:5;opacity:0;transform:translate(-50%,-50%);transition:opacity .35s ease;background:radial-gradient(circle, rgba(${GLOW},0.14) 0%, rgba(${GLOW},0.07) 20%, rgba(${GLOW},0.03) 40%, transparent 70%);`
    document.body.appendChild(spot)

    const proximity = radius * 0.5
    const fade = radius * 0.8
    let raf = 0
    let mx = 0
    let my = 0

    const update = () => {
      raf = 0
      const rect = grid.getBoundingClientRect()
      const inside =
        mx >= rect.left - 80 &&
        mx <= rect.right + 80 &&
        my >= rect.top - 80 &&
        my <= rect.bottom + 80
      const cards = grid.querySelectorAll<HTMLElement>("[data-bento-card]")
      if (!inside) {
        spot.style.opacity = "0"
        cards.forEach((c) => c.style.setProperty("--glow-intensity", "0"))
        return
      }
      let min = Infinity
      cards.forEach((card) => {
        const r = card.getBoundingClientRect()
        const cx = r.left + r.width / 2
        const cy = r.top + r.height / 2
        const d = Math.max(
          0,
          Math.hypot(mx - cx, my - cy) - Math.max(r.width, r.height) / 2
        )
        min = Math.min(min, d)
        const glow =
          d <= proximity ? 1 : d <= fade ? (fade - d) / (fade - proximity) : 0
        card.style.setProperty(
          "--glow-x",
          `${((mx - r.left) / r.width) * 100}%`
        )
        card.style.setProperty(
          "--glow-y",
          `${((my - r.top) / r.height) * 100}%`
        )
        card.style.setProperty("--glow-intensity", glow.toFixed(3))
        card.style.setProperty("--glow-radius", `${radius}px`)
      })
      spot.style.left = `${mx}px`
      spot.style.top = `${my}px`
      const o =
        min <= proximity
          ? 0.9
          : min <= fade
            ? ((fade - min) / (fade - proximity)) * 0.9
            : 0
      spot.style.opacity = o.toFixed(2)
    }
    const onMove = (e: PointerEvent) => {
      mx = e.clientX
      my = e.clientY
      if (!raf) raf = requestAnimationFrame(update)
    }
    const onLeave = () => {
      spot.style.opacity = "0"
      grid
        .querySelectorAll<HTMLElement>("[data-bento-card]")
        .forEach((c) => c.style.setProperty("--glow-intensity", "0"))
    }
    window.addEventListener("pointermove", onMove, { passive: true })
    document.documentElement.addEventListener("mouseleave", onLeave)
    return () => {
      window.removeEventListener("pointermove", onMove)
      document.documentElement.removeEventListener("mouseleave", onLeave)
      if (raf) cancelAnimationFrame(raf)
      spot.remove()
    }
  }, [radius])

  return (
    <GridContext.Provider value={{ radius }}>
      <div ref={gridRef} className={className}>
        {children}
      </div>
    </GridContext.Provider>
  )
}

export function BentoCard({
  children,
  className,
  particles = 10,
  tilt = true,
  onMouseMove,
}: {
  children: ReactNode
  className?: string
  particles?: number
  tilt?: boolean
  onMouseMove?: (e: MouseEvent<HTMLDivElement>) => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const spawned = useRef<HTMLElement[]>([])
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  useContext(GridContext)

  const clear = () => {
    timers.current.forEach(clearTimeout)
    timers.current = []
    spawned.current.forEach((p) => {
      p.style.opacity = "0"
      p.style.transform += " scale(0)"
      setTimeout(() => p.remove(), 300)
    })
    spawned.current = []
  }

  function handleEnter() {
    const el = ref.current
    if (!el) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const { width, height } = el.getBoundingClientRect()
    for (let i = 0; i < particles; i++) {
      const t = setTimeout(() => {
        const p = document.createElement("span")
        p.className = "bento-particle"
        p.style.left = `${Math.random() * width}px`
        p.style.top = `${Math.random() * height}px`
        p.style.setProperty("--dx", `${(Math.random() - 0.5) * 90}px`)
        p.style.setProperty("--dy", `${(Math.random() - 0.5) * 90}px`)
        p.style.setProperty("--dur", `${2 + Math.random() * 2}s`)
        p.style.background = `rgba(${PARTICLE},1)`
        p.style.boxShadow = `0 0 8px rgba(${PARTICLE},0.7)`
        el.appendChild(p)
        spawned.current.push(p)
      }, i * 90)
      timers.current.push(t)
    }
  }

  function handleMove(e: MouseEvent<HTMLDivElement>) {
    onMouseMove?.(e)
    const el = ref.current
    if (!el || !tilt) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    el.style.transform = `perspective(900px) rotateX(${(-py * 5).toFixed(2)}deg) rotateY(${(px * 6).toFixed(2)}deg) translateY(-4px)`
  }

  function handleLeave() {
    clear()
    const el = ref.current
    if (el) el.style.transform = ""
  }

  function handleClick(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = e.clientX - r.left
    const y = e.clientY - r.top
    const max = Math.max(
      Math.hypot(x, y),
      Math.hypot(x - r.width, y),
      Math.hypot(x, y - r.height),
      Math.hypot(x - r.width, y - r.height)
    )
    const ripple = document.createElement("span")
    ripple.className = "bento-ripple"
    ripple.style.width = ripple.style.height = `${max * 2}px`
    ripple.style.left = `${x - max}px`
    ripple.style.top = `${y - max}px`
    ripple.style.background = `radial-gradient(circle, rgba(${GLOW},0.35) 0%, rgba(${GLOW},0.15) 30%, transparent 70%)`
    el.appendChild(ripple)
    setTimeout(() => ripple.remove(), 800)
  }

  useEffect(() => () => clear(), [])

  return (
    <div
      ref={ref}
      data-bento-card
      onMouseEnter={handleEnter}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={handleClick}
      className={cn("bento-card relative overflow-hidden", className)}
    >
      {children}
    </div>
  )
}
