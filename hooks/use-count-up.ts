"use client"

import { useEffect, useRef, useState } from "react"

/**
 * Animates a number towards `target` whenever it changes.
 * While `active` is false the target is returned as-is (no animation).
 */
export function useCountUp(target: number, duration = 900, active = true) {
  const [value, setValue] = useState(target)
  const fromRef = useRef(target)
  const currentRef = useRef(target)

  useEffect(() => {
    if (!active) return
    const from = fromRef.current
    const start = performance.now()
    const ease = (t: number) => 1 - Math.pow(1 - t, 3)
    let raf = 0

    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration)
      const v = from + (target - from) * ease(p)
      currentRef.current = v
      setValue(v)
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      fromRef.current = currentRef.current
    }
  }, [target, duration, active])

  return active ? value : target
}
