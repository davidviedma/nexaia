"use client"

import { useEffect, useRef, useState, useSyncExternalStore } from "react"

const TEXT_INPUTS = "input:not([type='range']), textarea, select"
const POINTER_QUERY = "(pointer: fine)"
const REDUCE_QUERY = "(prefers-reduced-motion: reduce)"

function subscribePointer(cb: () => void) {
  const a = window.matchMedia(POINTER_QUERY)
  const b = window.matchMedia(REDUCE_QUERY)
  a.addEventListener("change", cb)
  b.addEventListener("change", cb)
  return () => {
    a.removeEventListener("change", cb)
    b.removeEventListener("change", cb)
  }
}
const pointerSnapshot = () =>
  window.matchMedia(POINTER_QUERY).matches &&
  !window.matchMedia(REDUCE_QUERY).matches

/**
 * Custom cursor for pointer devices: a small dot that follows the pointer
 * instantly and a ring that eases behind it. Over interactive elements the
 * ring eases behind it. Same look at all times; hidden over text inputs.
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const enabled = useSyncExternalStore(
    subscribePointer,
    pointerSnapshot,
    () => false
  )
  const [state, setState] = useState<"idle" | "hidden">("idle")

  useEffect(() => {
    if (!enabled) return
    document.documentElement.classList.add("has-cursor")

    const target = { x: -100, y: -100 }
    const ring = { x: -100, y: -100 }
    let raf = 0
    let active = false

    const loop = () => {
      ring.x += (target.x - ring.x) * 0.18
      ring.y += (target.y - ring.y) * 0.18
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%)`
      }
      raf = requestAnimationFrame(loop)
    }

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX
      target.y = e.clientY
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`
      }
      if (!active) {
        active = true
        ring.x = e.clientX
        ring.y = e.clientY
        document.documentElement.classList.add("cursor-active")
      }
    }

    // Only hide over text inputs (so the caret stays visible); otherwise
    // the dot + ring are always shown, unchanged.
    const onOver = (e: PointerEvent) => {
      const el = e.target as HTMLElement | null
      setState(el?.closest(TEXT_INPUTS) ? "hidden" : "idle")
    }

    const onLeave = () =>
      document.documentElement.classList.remove("cursor-active")
    const onEnter = () =>
      document.documentElement.classList.add("cursor-active")

    window.addEventListener("pointermove", onMove, { passive: true })
    window.addEventListener("pointerover", onOver, { passive: true })
    document.documentElement.addEventListener("mouseleave", onLeave)
    document.documentElement.addEventListener("mouseenter", onEnter)
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerover", onOver)
      document.documentElement.removeEventListener("mouseleave", onLeave)
      document.documentElement.removeEventListener("mouseenter", onEnter)
      document.documentElement.classList.remove("has-cursor", "cursor-active")
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className="nexa-cursor-dot"
        data-state={state}
      />
      <div
        ref={ringRef}
        aria-hidden
        className="nexa-cursor-ring"
        data-state={state}
      />
    </>
  )
}
