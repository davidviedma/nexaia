"use client"

import { useEffect, useRef, useState, useSyncExternalStore } from "react"

const INTERACTIVE =
  "a, button, [role='button'], summary, input[type='range'], [data-cursor]"
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
 * ring grows; `data-cursor="Texto"` shows a label inside it.
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const enabled = useSyncExternalStore(
    subscribePointer,
    pointerSnapshot,
    () => false
  )
  const [label, setLabel] = useState<string | null>(null)
  const [state, setState] = useState<"idle" | "hover" | "hidden">("idle")

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

    const onOver = (e: PointerEvent) => {
      const el = e.target as HTMLElement | null
      if (!el) return
      if (el.closest(TEXT_INPUTS)) {
        setState("hidden")
        setLabel(null)
        return
      }
      const hit = el.closest<HTMLElement>(INTERACTIVE)
      if (hit) {
        setState("hover")
        setLabel(
          hit.dataset.cursor ??
            hit.closest<HTMLElement>("[data-cursor]")?.dataset.cursor ??
            null
        )
      } else {
        setState("idle")
        setLabel(null)
      }
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
        data-label={label ? "true" : "false"}
      >
        {label && <span>{label}</span>}
      </div>
    </>
  )
}
