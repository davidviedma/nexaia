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
  phase: number
  near: number
}

type Pulse = { a: Node; b: Node; t: number; speed: number }

/**
 * A slow-drifting constellation echoing the connected dots of the Nexa IA
 * mark. Nodes twinkle, light pulses travel along the links, and the field
 * reacts to the pointer: nearby nodes swirl around it, brighten, and link
 * to it. Pointer tracking is done on `window` so it works regardless of
 * what sits on top of the canvas. Pauses when off screen.
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
    const finePointer = window.matchMedia("(pointer: fine)").matches
    let raf = 0
    let visible = false
    let nodes: Node[] = []
    let pulses: Pulse[] = []
    let width = 0
    let height = 0
    let lastPulse = 0
    const mouse = { x: -9999, y: -9999, sx: -9999, sy: -9999, active: false }

    const palette =
      color === "light"
        ? {
            dot: "6,195,214",
            dot2: "55,129,252",
            hot: "255,255,255",
            line: "255,255,255",
            pointerLine: "6,195,214",
          }
        : {
            dot: "25,81,252",
            dot2: "6,195,214",
            hot: "11,44,177",
            line: "25,81,252",
            pointerLine: "25,81,252",
          }

    function resize() {
      const rect = canvas!.getBoundingClientRect()
      const dpr = Math.min(1.5, window.devicePixelRatio || 1)
      width = rect.width
      height = rect.height
      canvas!.width = width * dpr
      canvas!.height = height * dpr
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)

      const count = Math.round(((width * height) / 26000) * density)
      nodes = Array.from({ length: Math.max(14, Math.min(52, count)) }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: 1.5 + Math.random() * 2.2,
        hue: Math.random() > 0.7 ? 1 : 0,
        phase: Math.random() * Math.PI * 2,
        near: 0,
      }))
      pulses = []
      if (reduce) draw(0)
    }

    function spawnPulse(linkDist: number) {
      for (let tries = 0; tries < 6; tries++) {
        const a = nodes[Math.floor(Math.random() * nodes.length)]
        const candidates = nodes.filter(
          (b) => b !== a && Math.hypot(a.x - b.x, a.y - b.y) < linkDist
        )
        if (candidates.length) {
          const b = candidates[Math.floor(Math.random() * candidates.length)]
          pulses.push({ a, b, t: 0, speed: 0.012 + Math.random() * 0.01 })
          return
        }
      }
    }

    function draw(now: number) {
      ctx!.clearRect(0, 0, width, height)
      const linkDist = Math.min(170, Math.max(110, width * 0.14))
      const reach = Math.min(260, Math.max(170, width * 0.18))
      const time = now / 1000

      if (mouse.active) {
        mouse.sx += (mouse.x - mouse.sx) * 0.18
        mouse.sy += (mouse.y - mouse.sy) * 0.18
      }

      for (const n of nodes) {
        n.near = 0
        if (reduce) continue
        n.x += n.vx
        n.y += n.vy
        if (mouse.active) {
          const dx = mouse.sx - n.x
          const dy = mouse.sy - n.y
          const d = Math.hypot(dx, dy)
          if (d < reach && d > 0.1) {
            const t = 1 - d / reach
            n.near = t
            const pull = d > 70 ? t * 0.045 : -(1 - d / 70) * 0.09
            n.vx += (dx / d) * pull
            n.vy += (dy / d) * pull
            n.vx += (-dy / d) * t * 0.012
            n.vy += (dx / d) * t * 0.012
          }
        }
        const damp = n.near > 0 ? 0.94 : 0.985
        n.vx *= damp
        n.vy *= damp
        if (n.x < -20) n.x = width + 20
        if (n.x > width + 20) n.x = -20
        if (n.y < -20) n.y = height + 20
        if (n.y > height + 20) n.y = -20
      }

      // links
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i]
          const b = nodes[j]
          const d = Math.hypot(a.x - b.x, a.y - b.y)
          if (d < linkDist) {
            const boost = Math.max(a.near, b.near)
            const alpha = (1 - d / linkDist) * (0.2 + boost * 0.5)
            ctx!.strokeStyle = `rgba(${palette.line},${alpha.toFixed(3)})`
            ctx!.lineWidth = 1 + boost * 0.6
            ctx!.beginPath()
            ctx!.moveTo(a.x, a.y)
            ctx!.lineTo(b.x, b.y)
            ctx!.stroke()
          }
        }
      }

      // pulses travelling along links
      if (!reduce) {
        if (now - lastPulse > 520 && pulses.length < 7) {
          lastPulse = now
          spawnPulse(linkDist)
        }
        for (let i = pulses.length - 1; i >= 0; i--) {
          const p = pulses[i]
          p.t += p.speed
          if (p.t >= 1) {
            pulses.splice(i, 1)
            continue
          }
          const x = p.a.x + (p.b.x - p.a.x) * p.t
          const y = p.a.y + (p.b.y - p.a.y) * p.t
          const tt = Math.max(0, p.t - 0.14)
          const tx = p.a.x + (p.b.x - p.a.x) * tt
          const ty = p.a.y + (p.b.y - p.a.y) * tt
          const fade = Math.sin(p.t * Math.PI)
          ctx!.strokeStyle = `rgba(${palette.dot},${(0.55 * fade).toFixed(3)})`
          ctx!.lineWidth = 1.5
          ctx!.beginPath()
          ctx!.moveTo(tx, ty)
          ctx!.lineTo(x, y)
          ctx!.stroke()
          ctx!.fillStyle = `rgba(${palette.hot},${(0.9 * fade).toFixed(3)})`
          ctx!.beginPath()
          ctx!.arc(x, y, 1.8, 0, Math.PI * 2)
          ctx!.fill()
        }
      }

      // pointer links + pointer node
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
        ctx!.fillStyle = `rgba(${palette.dot},0.25)`
        ctx!.beginPath()
        ctx!.arc(mouse.sx, mouse.sy, 9, 0, Math.PI * 2)
        ctx!.fill()
        ctx!.fillStyle = `rgba(${palette.dot},1)`
        ctx!.beginPath()
        ctx!.arc(mouse.sx, mouse.sy, 2.5, 0, Math.PI * 2)
        ctx!.fill()
      }

      // dots: soft halo (cheap, no shadowBlur) + twinkling core
      for (const n of nodes) {
        const tw = 0.75 + 0.25 * Math.sin(time * 1.6 + n.phase)
        const base = n.hue ? palette.dot2 : palette.dot
        const r = n.r * (1 + n.near * 1.1) * tw
        ctx!.fillStyle = `rgba(${base},${(0.18 + n.near * 0.25).toFixed(3)})`
        ctx!.beginPath()
        ctx!.arc(n.x, n.y, r * 2.6, 0, Math.PI * 2)
        ctx!.fill()
        ctx!.fillStyle = `rgba(${n.near > 0.4 ? palette.hot : base},1)`
        ctx!.beginPath()
        ctx!.arc(n.x, n.y, r, 0, Math.PI * 2)
        ctx!.fill()
      }
    }

    function loop(now: number) {
      draw(now)
      raf = visible && !reduce ? requestAnimationFrame(loop) : 0
    }

    const onMove = (e: PointerEvent) => {
      const rect = canvas!.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const inside = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height
      if (!inside) {
        mouse.active = false
        return
      }
      mouse.x = x
      mouse.y = y
      if (!mouse.active) {
        mouse.sx = x
        mouse.sy = y
      }
      mouse.active = true
    }
    const onLeave = () => {
      mouse.active = false
    }

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible && !raf) raf = requestAnimationFrame(loop)
    })
    io.observe(canvas)
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    resize()
    if (finePointer) {
      window.addEventListener("pointermove", onMove, { passive: true })
      document.documentElement.addEventListener("mouseleave", onLeave)
    }

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      ro.disconnect()
      window.removeEventListener("pointermove", onMove)
      document.documentElement.removeEventListener("mouseleave", onLeave)
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
