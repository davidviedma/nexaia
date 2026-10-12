"use client"

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react"
import { cn } from "@/lib/utils"

/**
 * After React Bits "Profile Card": a tile that tilts towards the pointer on
 * a spring, with a moving glare and a holographic sheen in the brand hues.
 * Pointer position is written to CSS variables; the layers are pure CSS.
 */

const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v))

export function ProfileCard({
  children,
  footer,
  className,
  tilt = 10,
  intro = true,
}: {
  children: ReactNode
  footer?: ReactNode
  className?: string
  tilt?: number
  intro?: boolean
}) {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
    const fine = window.matchMedia("(pointer: fine)").matches
    const x = { p: 0, v: 0, target: 0 }
    const y = { p: 0, v: 0, target: 0 }
    const light = { p: 0, target: 0 }
    let raf = 0
    let last = 0
    let slowUntil = 0

    const write = () => {
      const angle = reduced ? 0 : tilt
      const reach = Math.min(1, Math.hypot(x.p, y.p))
      const s = root.style
      s.setProperty("--pc-px", `${((x.p + 1) * 50).toFixed(2)}%`)
      s.setProperty("--pc-py", `${((y.p + 1) * 50).toFixed(2)}%`)
      s.setProperty("--pc-rx", `${(y.p * angle).toFixed(3)}deg`)
      s.setProperty("--pc-ry", `${(-x.p * angle).toFixed(3)}deg`)
      s.setProperty("--pc-band", `${(50 + x.p * 25).toFixed(2)}%`)
      s.setProperty("--pc-reach", reach.toFixed(4))
      s.setProperty("--pc-active", light.p.toFixed(4))
    }

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000 || 0)
      last = now
      const slow = now < slowUntil
      const stiffness = slow ? 24 : 120
      const damping = slow ? 9 : 16
      const steps = Math.max(1, Math.ceil(dt / (1 / 120)))
      const h = dt / steps
      for (let i = 0; i < steps; i++) {
        for (const axis of [x, y]) {
          axis.v += (stiffness * (axis.target - axis.p) - damping * axis.v) * h
          axis.p += axis.v * h
        }
      }
      const tau = light.target > light.p ? 0.18 : slow ? 0.9 : 0.45
      light.p += (light.target - light.p) * (1 - Math.exp(-dt / tau))
      write()
      const moving =
        Math.abs(x.target - x.p) > 0.0005 ||
        Math.abs(y.target - y.p) > 0.0005 ||
        Math.abs(x.v) > 0.0005 ||
        Math.abs(y.v) > 0.0005 ||
        Math.abs(light.target - light.p) > 0.002
      if (moving) {
        raf = requestAnimationFrame(frame)
      } else {
        x.p = x.target
        y.p = y.target
        light.p = light.target
        write()
        raf = 0
      }
    }

    const wake = () => {
      if (raf) return
      last = performance.now()
      raf = requestAnimationFrame(frame)
    }

    const aim = (nx: number, ny: number, on = true) => {
      x.target = clamp(nx, -1, 1)
      y.target = clamp(ny, -1, 1)
      light.target = on ? 1 : 0
      slowUntil = 0
      wake()
    }

    const onMove = (e: PointerEvent) => {
      const r = root.getBoundingClientRect()
      if (!r.width || !r.height) return
      aim(
        ((e.clientX - r.left) / r.width) * 2 - 1,
        ((e.clientY - r.top) / r.height) * 2 - 1
      )
    }
    const onLeave = () => aim(0, 0, false)

    if (fine) {
      root.addEventListener("pointerenter", onMove)
      root.addEventListener("pointermove", onMove)
      root.addEventListener("pointerleave", onLeave)
    }

    // Intro: start tilted and settle slowly, so the card reads as 3D at once.
    if (intro && !reduced) {
      x.p = 0.62
      y.p = -0.55
      light.p = 1
      slowUntil = performance.now() + 1400
      write()
      wake()
    } else {
      write()
    }

    return () => {
      cancelAnimationFrame(raf)
      root.removeEventListener("pointerenter", onMove)
      root.removeEventListener("pointermove", onMove)
      root.removeEventListener("pointerleave", onLeave)
    }
  }, [tilt, intro])

  return (
    <div
      ref={rootRef}
      className={cn("profile-card", className)}
      style={
        {
          "--pc-px": "50%",
          "--pc-py": "50%",
          "--pc-rx": "0deg",
          "--pc-ry": "0deg",
          "--pc-band": "50%",
          "--pc-reach": 0,
          "--pc-active": 0,
        } as CSSProperties
      }
    >
      <div className="profile-card__body">
        <div className="profile-card__tile">
          {children}
          <span aria-hidden className="profile-card__holo" />
          <span aria-hidden className="profile-card__glare" />
          <span aria-hidden className="profile-card__rim" />
        </div>
        {footer && <div className="profile-card__footer">{footer}</div>}
      </div>
    </div>
  )
}
