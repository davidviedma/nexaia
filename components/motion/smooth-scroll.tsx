"use client"

import { useEffect } from "react"
import Lenis from "lenis"
import "lenis/dist/lenis.css"
import { setExternalVelocity } from "@/lib/scroll-velocity"

declare global {
  interface Window {
    __lenis?: Lenis
  }
}

/**
 * Inertia scrolling (Lenis). Anchor links are handled by Lenis so the
 * island nav keeps working. Disabled when the user prefers reduced motion.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      anchors: { offset: -24 },
    })
    window.__lenis = lenis

    let raf = 0
    const loop = (time: number) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    // Expose velocity for scroll-reactive components (ticker skew, etc.)
    const onScroll = ({ velocity }: { velocity: number }) => {
      setExternalVelocity(velocity)
    }
    lenis.on("scroll", onScroll)

    return () => {
      cancelAnimationFrame(raf)
      lenis.off("scroll", onScroll)
      setExternalVelocity(null)
      lenis.destroy()
      delete window.__lenis
    }
  }, [])

  return null
}
