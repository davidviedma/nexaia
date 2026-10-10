"use client"

import { useEffect, useRef } from "react"

type Spark = { x: number; y: number; angle: number; start: number }

/**
 * Page-wide click sparks (after React Bits "Click Spark"): short radial
 * strokes burst from wherever the user clicks. Fixed canvas, no layout cost.
 */
export function ClickSpark({
  color = "#06c3d6",
  size = 11,
  radius = 22,
  count = 8,
  duration = 420,
}: {
  color?: string
  size?: number
  radius?: number
  count?: number
  duration?: number
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const sparks: Spark[] = []
    let raf = 0
    let dpr = 1

    const resize = () => {
      dpr = Math.min(2, window.devicePixelRatio || 1)
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const draw = (now: number) => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i]
        const p = (now - s.start) / duration
        if (p >= 1) {
          sparks.splice(i, 1)
          continue
        }
        const eased = p * (2 - p)
        const dist = eased * radius
        const len = size * (1 - eased)
        ctx.strokeStyle = color
        ctx.lineWidth = 2
        ctx.lineCap = "round"
        ctx.beginPath()
        ctx.moveTo(
          s.x + dist * Math.cos(s.angle),
          s.y + dist * Math.sin(s.angle)
        )
        ctx.lineTo(
          s.x + (dist + len) * Math.cos(s.angle),
          s.y + (dist + len) * Math.sin(s.angle)
        )
        ctx.stroke()
      }
      raf = sparks.length ? requestAnimationFrame(draw) : 0
    }

    const onClick = (e: MouseEvent) => {
      const now = performance.now()
      for (let i = 0; i < count; i++) {
        sparks.push({
          x: e.clientX,
          y: e.clientY,
          angle: (2 * Math.PI * i) / count,
          start: now,
        })
      }
      if (!raf) raf = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener("resize", resize)
    window.addEventListener("click", onClick, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
      window.removeEventListener("click", onClick)
    }
  }, [color, size, radius, count, duration])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[110] h-full w-full"
    />
  )
}
