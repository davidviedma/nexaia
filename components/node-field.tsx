"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

type Node = {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  hue: 0 | 1
}

/**
 * A slow-drifting constellation of nodes and connectors, echoing the
 * connected dots of the Nexa IA mark. Nodes are gently attracted to the
 * cursor. Pure canvas, no dependencies.
 */
export function NodeField({
  className,
  density = 1,
  color = "light",
}: {
  className?: string
  density?: number
  color?: "light" | "dark"
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let raf = 0
    let nodes: Node[] = []
    let width = 0
    let height = 0
    let dpr = 1
    const mouse = { x: -9999, y: -9999, active: false }

    const palette =
      color === "light"
        ? { dot: "#06c3d6", dot2: "#3781fc", line: "255,255,255" }
        : { dot: "#1951fc", dot2: "#06c3d6", line: "25,81,252" }

    function resize() {
      const rect = canvas!.getBoundingClientRect()
      dpr = Math.min(2, window.devicePixelRatio || 1)
      width = rect.width
      height = rect.height
      canvas!.width = width * dpr
      canvas!.height = height * dpr
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)

      const count = Math.round(((width * height) / 26000) * density)
      nodes = Array.from({ length: Math.max(14, Math.min(60, count)) }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: 1.5 + Math.random() * 2.2,
        hue: Math.random() > 0.7 ? 1 : 0,
      }))
    }

    function step() {
      ctx!.clearRect(0, 0, width, height)
      const linkDist = Math.min(170, Math.max(110, width * 0.14))

      for (const n of nodes) {
        if (!reduce) {
          n.x += n.vx
          n.y += n.vy
          if (mouse.active) {
            const dx = mouse.x - n.x
            const dy = mouse.y - n.y
            const d = Math.hypot(dx, dy)
            if (d < 220 && d > 0.1) {
              const f = ((220 - d) / 220) * 0.012
              n.vx += (dx / d) * f
              n.vy += (dy / d) * f
            }
          }
          // damping
          n.vx *= 0.985
          n.vy *= 0.985
          // wrap
          if (n.x < -20) n.x = width + 20
          if (n.x > width + 20) n.x = -20
          if (n.y < -20) n.y = height + 20
          if (n.y > height + 20) n.y = -20
        }
      }

      // links
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i]
          const b = nodes[j]
          const d = Math.hypot(a.x - b.x, a.y - b.y)
          if (d < linkDist) {
            const alpha = (1 - d / linkDist) * 0.28
            ctx!.strokeStyle = `rgba(${palette.line},${alpha})`
            ctx!.lineWidth = 1
            ctx!.beginPath()
            ctx!.moveTo(a.x, a.y)
            ctx!.lineTo(b.x, b.y)
            ctx!.stroke()
          }
        }
      }

      // dots
      for (const n of nodes) {
        ctx!.beginPath()
        ctx!.fillStyle = n.hue ? palette.dot2 : palette.dot
        ctx!.shadowColor = n.hue ? palette.dot2 : palette.dot
        ctx!.shadowBlur = 10
        ctx!.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx!.fill()
        ctx!.shadowBlur = 0
      }

      if (!reduce) raf = requestAnimationFrame(step)
    }

    const onMove = (e: PointerEvent) => {
      const rect = canvas!.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
      mouse.active = true
    }
    const onLeave = () => {
      mouse.active = false
    }

    resize()
    step()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    const host = canvas.parentElement ?? canvas
    host.addEventListener("pointermove", onMove)
    host.addEventListener("pointerleave", onLeave)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      host.removeEventListener("pointermove", onMove)
      host.removeEventListener("pointerleave", onLeave)
    }
  }, [density, color])

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
