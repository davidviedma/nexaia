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
  near: number
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
    const mouse = { x: -9999, y: -9999, sx: -9999, sy: -9999, active: false }

    const palette =
      color === "light"
        ? {
            dot: "#06c3d6",
            dot2: "#3781fc",
            hot: "#ffffff",
            line: "255,255,255",
            pointerLine: "6,195,214",
          }
        : {
            dot: "#1951fc",
            dot2: "#06c3d6",
            hot: "#0b2cb1",
            line: "25,81,252",
            pointerLine: "25,81,252",
          }

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
        near: 0,
      }))
    }

    function step() {
      ctx!.clearRect(0, 0, width, height)
      const linkDist = Math.min(170, Math.max(110, width * 0.14))
      const reach = Math.min(260, Math.max(170, width * 0.18))

      // Smooth the pointer so the field follows it with a little lag.
      if (mouse.active) {
        mouse.sx += (mouse.x - mouse.sx) * 0.18
        mouse.sy += (mouse.y - mouse.sy) * 0.18
      }

      for (const n of nodes) {
        n.near = 0
        if (!reduce) {
          n.x += n.vx
          n.y += n.vy
          if (mouse.active) {
            const dx = mouse.sx - n.x
            const dy = mouse.sy - n.y
            const d = Math.hypot(dx, dy)
            if (d < reach && d > 0.1) {
              const t = 1 - d / reach
              n.near = t
              // Pull towards the pointer, but push back when very close so
              // the nodes swirl around it instead of collapsing onto it.
              const pull = d > 70 ? t * 0.045 : -(1 - d / 70) * 0.09
              n.vx += (dx / d) * pull
              n.vy += (dy / d) * pull
              // slight tangential drift → orbiting feel
              n.vx += (-dy / d) * t * 0.012
              n.vy += (dx / d) * t * 0.012
            }
          }
          // damping (stronger when energised so it settles quickly)
          const damp = n.near > 0 ? 0.94 : 0.985
          n.vx *= damp
          n.vy *= damp
          // wrap
          if (n.x < -20) n.x = width + 20
          if (n.x > width + 20) n.x = -20
          if (n.y < -20) n.y = height + 20
          if (n.y > height + 20) n.y = -20
        }
      }

      // links between nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i]
          const b = nodes[j]
          const d = Math.hypot(a.x - b.x, a.y - b.y)
          if (d < linkDist) {
            const boost = Math.max(a.near, b.near)
            const alpha = (1 - d / linkDist) * (0.22 + boost * 0.5)
            ctx!.strokeStyle = `rgba(${palette.line},${alpha})`
            ctx!.lineWidth = 1 + boost * 0.6
            ctx!.beginPath()
            ctx!.moveTo(a.x, a.y)
            ctx!.lineTo(b.x, b.y)
            ctx!.stroke()
          }
        }
      }

      // links from the pointer to nearby nodes
      if (mouse.active && !reduce) {
        for (const n of nodes) {
          if (n.near > 0) {
            ctx!.strokeStyle = `rgba(${palette.pointerLine},${(n.near * 0.55).toFixed(3)})`
            ctx!.lineWidth = 1
            ctx!.beginPath()
            ctx!.moveTo(mouse.sx, mouse.sy)
            ctx!.lineTo(n.x, n.y)
            ctx!.stroke()
          }
        }
        // the pointer node itself
        ctx!.beginPath()
        ctx!.fillStyle = palette.dot
        ctx!.shadowColor = palette.dot
        ctx!.shadowBlur = 14
        ctx!.arc(mouse.sx, mouse.sy, 2.5, 0, Math.PI * 2)
        ctx!.fill()
        ctx!.shadowBlur = 0
      }

      // dots (nearby ones grow and brighten)
      for (const n of nodes) {
        const color = n.hue ? palette.dot2 : palette.dot
        ctx!.beginPath()
        ctx!.fillStyle = n.near > 0.4 ? palette.hot : color
        ctx!.shadowColor = color
        ctx!.shadowBlur = 10 + n.near * 14
        ctx!.arc(n.x, n.y, n.r * (1 + n.near * 1.1), 0, Math.PI * 2)
        ctx!.fill()
        ctx!.shadowBlur = 0
      }

      if (!reduce) raf = requestAnimationFrame(step)
    }

    const onMove = (e: PointerEvent) => {
      const rect = canvas!.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
      if (!mouse.active) {
        mouse.sx = mouse.x
        mouse.sy = mouse.y
      }
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
