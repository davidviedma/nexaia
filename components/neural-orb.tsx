"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

type P = { x: number; y: number; z: number }

/**
 * A rotating sphere of points joined to their nearest neighbours, with a
 * glowing core and two orbit rings. Rotation drifts on its own and leans
 * towards the pointer. 2D canvas, edges precomputed once (rotation keeps
 * distances), so it stays cheap. Pauses when off screen.
 */
export function NeuralOrb({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    const cv: CanvasRenderingContext2D = ctx
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const fine = window.matchMedia("(pointer: fine)").matches

    const N = 320
    const pts: P[] = []
    const golden = Math.PI * (3 - Math.sqrt(5))
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2
      const r = Math.sqrt(1 - y * y)
      const th = golden * i
      pts.push({ x: Math.cos(th) * r, y, z: Math.sin(th) * r })
    }
    // nearest-neighbour edges (static)
    const edges: [number, number][] = []
    for (let i = 0; i < N; i++) {
      const d: { j: number; d: number }[] = []
      for (let j = 0; j < N; j++) {
        if (i === j) continue
        const dx = pts[i].x - pts[j].x
        const dy = pts[i].y - pts[j].y
        const dz = pts[i].z - pts[j].z
        d.push({ j, d: dx * dx + dy * dy + dz * dz })
      }
      d.sort((a, b) => a.d - b.d)
      for (let k = 0; k < 3; k++) if (d[k].j > i) edges.push([i, d[k].j])
    }

    let w = 0
    let h = 0
    let raf = 0
    let visible = false
    let rotY = 0
    const rotX = 0.35
    const target = { x: 0, y: 0 }
    const lean = { x: 0, y: 0 }
    const proj: { x: number; y: number; z: number }[] = pts.map(() => ({
      x: 0,
      y: 0,
      z: 0,
    }))

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(1.5, window.devicePixelRatio || 1)
      w = rect.width
      h = rect.height
      canvas.width = w * dpr
      canvas.height = h * dpr
      cv.setTransform(dpr, 0, 0, dpr, 0, 0)
      if (reduce) draw(0)
    }

    function draw(now: number) {
      cv.clearRect(0, 0, w, h)
      const cx = w / 2
      const cy = h / 2
      const R = Math.min(w, h) * 0.34
      const t = now / 1000

      lean.x += (target.x - lean.x) * 0.05
      lean.y += (target.y - lean.y) * 0.05
      if (!reduce) rotY += 0.0035
      const ay = rotY + lean.x * 0.6
      const ax = rotX + lean.y * 0.4
      const cy1 = Math.cos(ay),
        sy1 = Math.sin(ay)
      const cx1 = Math.cos(ax),
        sx1 = Math.sin(ax)

      // core glow
      const g = cv.createRadialGradient(cx, cy, 0, cx, cy, R * 1.25)
      g.addColorStop(0, "rgba(6,195,214,0.35)")
      g.addColorStop(0.35, "rgba(25,81,252,0.22)")
      g.addColorStop(1, "rgba(25,81,252,0)")
      cv.fillStyle = g
      cv.beginPath()
      cv.arc(cx, cy, R * 1.25, 0, Math.PI * 2)
      cv.fill()

      // project
      for (let i = 0; i < N; i++) {
        const p = pts[i]
        // rotate Y
        const x1 = p.x * cy1 - p.z * sy1
        const z1 = p.x * sy1 + p.z * cy1
        // rotate X
        const y2 = p.y * cx1 - z1 * sx1
        const z2 = p.y * sx1 + z1 * cx1
        const persp = 1 / (1.9 - z2 * 0.6)
        proj[i].x = cx + x1 * R * persp
        proj[i].y = cy + y2 * R * persp
        proj[i].z = z2
      }

      // edges (back faces dimmer)
      cv.lineWidth = 1
      for (const [a, b] of edges) {
        const za = (proj[a].z + proj[b].z) / 2
        const alpha = 0.08 + (za + 1) * 0.18
        cv.strokeStyle = `rgba(165,243,252,${alpha.toFixed(3)})`
        cv.beginPath()
        cv.moveTo(proj[a].x, proj[a].y)
        cv.lineTo(proj[b].x, proj[b].y)
        cv.stroke()
      }

      // points
      for (let i = 0; i < N; i++) {
        const z = proj[i].z
        const s = 0.8 + (z + 1) * 0.9
        const a = 0.25 + (z + 1) * 0.37
        const tw = 0.85 + 0.15 * Math.sin(t * 2 + i)
        cv.fillStyle =
          i % 9 === 0
            ? `rgba(255,255,255,${a})`
            : `rgba(6,195,214,${(a * tw).toFixed(3)})`
        cv.beginPath()
        cv.arc(proj[i].x, proj[i].y, s, 0, Math.PI * 2)
        cv.fill()
      }

      // orbit rings with travelling sparks
      for (const ring of [
        { rx: R * 1.55, ry: R * 0.42, tilt: -0.45, speed: 0.5, off: 0 },
        { rx: R * 1.35, ry: R * 0.9, tilt: 0.9, speed: -0.35, off: 2.1 },
      ]) {
        cv.save()
        cv.translate(cx, cy)
        cv.rotate(ring.tilt + lean.x * 0.15)
        cv.strokeStyle = "rgba(255,255,255,0.14)"
        cv.lineWidth = 1
        cv.beginPath()
        cv.ellipse(0, 0, ring.rx, ring.ry, 0, 0, Math.PI * 2)
        cv.stroke()
        const ang = t * ring.speed + ring.off
        const sx = Math.cos(ang) * ring.rx
        const sy = Math.sin(ang) * ring.ry
        const sg = cv.createRadialGradient(sx, sy, 0, sx, sy, 10)
        sg.addColorStop(0, "rgba(255,255,255,0.95)")
        sg.addColorStop(0.3, "rgba(6,195,214,0.6)")
        sg.addColorStop(1, "rgba(6,195,214,0)")
        cv.fillStyle = sg
        cv.beginPath()
        cv.arc(sx, sy, 10, 0, Math.PI * 2)
        cv.fill()
        cv.restore()
      }
    }

    const loop = (now: number) => {
      draw(now)
      raf = visible && !reduce ? requestAnimationFrame(loop) : 0
    }

    const onMove = (e: PointerEvent) => {
      target.x = (e.clientX / window.innerWidth - 0.5) * 2
      target.y = (e.clientY / window.innerHeight - 0.5) * 2
    }

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible && !raf) raf = requestAnimationFrame(loop)
    })
    io.observe(canvas)
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    resize()
    if (fine) window.addEventListener("pointermove", onMove, { passive: true })

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      ro.disconnect()
      window.removeEventListener("pointermove", onMove)
    }
  }, [])

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={cn("pointer-events-none h-full w-full", className)}
    />
  )
}
