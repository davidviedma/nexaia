"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

type Dot = {
  ox: number
  oy: number
  x: number
  y: number
  vx: number
  vy: number
}

/**
 * Field of dots that are pushed away by the pointer and spring back,
 * with a shockwave on click. After React Bits "Dot Grid" (canvas version).
 */
export function DotGrid({
  className,
  gap = 26,
  dotSize = 3,
  baseColor = "rgba(255,255,255,0.22)",
  activeColor = "#06c3d6",
  proximity = 140,
  strength = 4,
  shockRadius = 260,
  shockStrength = 9,
}: {
  className?: string
  gap?: number
  dotSize?: number
  baseColor?: string
  activeColor?: string
  proximity?: number
  strength?: number
  shockRadius?: number
  shockStrength?: number
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    let dots: Dot[] = []
    let width = 0
    let height = 0
    let raf = 0
    let visible = false
    const mouse = { x: -9999, y: -9999, lx: -9999, ly: -9999, speed: 0 }

    const active = parseColor(activeColor)
    const base = parseColor(baseColor)

    const build = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      width = rect.width
      height = rect.height
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const cols = Math.floor((width + gap) / (dotSize + gap))
      const rows = Math.floor((height + gap) / (dotSize + gap))
      const cell = dotSize + gap
      const sx = (width - cell * cols + gap) / 2 + dotSize / 2
      const sy = (height - cell * rows + gap) / 2 + dotSize / 2
      dots = []
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = sx + c * cell
          const y = sy + r * cell
          dots.push({ ox: x, oy: y, x, y, vx: 0, vy: 0 })
        }
      }
      draw()
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      const pr2 = proximity * proximity
      for (const d of dots) {
        const dx = d.x - mouse.x
        const dy = d.y - mouse.y
        const dist2 = dx * dx + dy * dy
        let t = 0
        if (dist2 < pr2) t = 1 - Math.sqrt(dist2) / proximity
        const disp = Math.hypot(d.x - d.ox, d.y - d.oy)
        const k = Math.min(1, Math.max(t, disp / 18))
        ctx.fillStyle = mix(base, active, k)
        ctx.beginPath()
        ctx.arc(d.x, d.y, dotSize / 2 + k * 1.2, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    let energy = 0
    const wake = () => {
      if (visible && !raf) raf = requestAnimationFrame(step)
    }

    const step = () => {
      energy = 0
      if (!reduce) {
        for (const d of dots) {
          const dx = d.x - mouse.x
          const dy = d.y - mouse.y
          const dist = Math.hypot(dx, dy)
          if (dist < proximity && mouse.speed > 0.2) {
            const f =
              ((proximity - dist) / proximity) *
              strength *
              Math.min(2, mouse.speed * 0.08)
            d.vx += (dx / (dist || 1)) * f
            d.vy += (dy / (dist || 1)) * f
          }
          // spring back
          d.vx += (d.ox - d.x) * 0.06
          d.vy += (d.oy - d.y) * 0.06
          d.vx *= 0.82
          d.vy *= 0.82
          d.x += d.vx
          d.y += d.vy
          energy += Math.abs(d.vx) + Math.abs(d.vy)
        }
        mouse.speed *= 0.9
      }
      draw()
      // Sleep once everything has settled; pointer/click wakes it again.
      const idle = reduce || (energy < 0.08 && mouse.speed < 0.05)
      raf = visible && !idle ? requestAnimationFrame(step) : 0
    }

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      mouse.speed = Math.hypot(x - mouse.lx, y - mouse.ly)
      mouse.lx = x
      mouse.ly = y
      mouse.x = x
      mouse.y = y
      wake()
    }
    const onLeave = () => {
      mouse.x = -9999
      mouse.y = -9999
    }
    const onClick = (e: PointerEvent) => {
      if (reduce) return
      const rect = canvas.getBoundingClientRect()
      const cx = e.clientX - rect.left
      const cy = e.clientY - rect.top
      for (const d of dots) {
        const dx = d.x - cx
        const dy = d.y - cy
        const dist = Math.hypot(dx, dy)
        if (dist < shockRadius) {
          const f = (1 - dist / shockRadius) * shockStrength
          d.vx += (dx / (dist || 1)) * f
          d.vy += (dy / (dist || 1)) * f
        }
      }
      wake()
    }

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) {
        draw()
        wake()
      }
    })
    io.observe(canvas)
    const ro = new ResizeObserver(build)
    ro.observe(canvas)
    const host = canvas.parentElement ?? canvas
    host.addEventListener("pointermove", onMove, { passive: true })
    host.addEventListener("pointerleave", onLeave)
    host.addEventListener("pointerdown", onClick)
    build()

    return () => {
      io.disconnect()
      ro.disconnect()
      host.removeEventListener("pointermove", onMove)
      host.removeEventListener("pointerleave", onLeave)
      host.removeEventListener("pointerdown", onClick)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [
    gap,
    dotSize,
    baseColor,
    activeColor,
    proximity,
    strength,
    shockRadius,
    shockStrength,
  ])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full",
        className
      )}
    />
  )
}

type Rgba = [number, number, number, number]

function parseColor(input: string): Rgba {
  const c = document.createElement("canvas").getContext("2d")
  if (!c) return [255, 255, 255, 1]
  c.fillStyle = input
  const v = String(c.fillStyle)
  if (v.startsWith("#")) {
    const n = parseInt(v.slice(1), 16)
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255, 1]
  }
  const m = v.match(/[\d.]+/g) ?? ["255", "255", "255", "1"]
  return [
    Number(m[0]),
    Number(m[1]),
    Number(m[2]),
    m[3] !== undefined ? Number(m[3]) : 1,
  ]
}

function mix(a: Rgba, b: Rgba, t: number) {
  const r = Math.round(a[0] + (b[0] - a[0]) * t)
  const g = Math.round(a[1] + (b[1] - a[1]) * t)
  const bl = Math.round(a[2] + (b[2] - a[2]) * t)
  const al = a[3] + (b[3] - a[3]) * t
  return `rgba(${r},${g},${bl},${al.toFixed(3)})`
}
