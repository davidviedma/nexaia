"use client"

import { useEffect, useState, useSyncExternalStore } from "react"
import { cn } from "@/lib/utils"

const WORDS = ["Digitalización", "IA", "Crecimiento"]
const EXIT_AT = 1500
const DONE_AT = 2500

// Captured once: whether this page load started with the curtain up.
let startedLoading: boolean | null = null
const noopSubscribe = () => () => {}
const loadingSnapshot = () =>
  (startedLoading ??= document.documentElement.classList.contains("is-loading"))

/**
 * Brand curtain shown once per session. The `is-loading` class (set by an
 * inline script in the layout before hydration) pauses the hero intro
 * until the curtain lifts.
 */
export function Preloader() {
  const shouldShow = useSyncExternalStore(
    noopSubscribe,
    loadingSnapshot,
    () => false
  )
  const [phase, setPhase] = useState<"show" | "exit" | "hidden">("show")
  const [word, setWord] = useState(0)

  useEffect(() => {
    if (!shouldShow) return
    const root = document.documentElement

    const words = setInterval(
      () => setWord((w) => Math.min(WORDS.length - 1, w + 1)),
      380
    )
    const exit = setTimeout(() => {
      setPhase("exit")
      root.classList.remove("is-loading")
      try {
        sessionStorage.setItem("nexa-intro", "1")
      } catch {}
    }, EXIT_AT)
    const done = setTimeout(() => setPhase("hidden"), DONE_AT)

    return () => {
      clearInterval(words)
      clearTimeout(exit)
      clearTimeout(done)
    }
  }, [shouldShow])

  if (!shouldShow || phase === "hidden") return null

  return (
    <div
      aria-hidden
      className={cn(
        "fixed inset-0 z-[100] flex items-center justify-center bg-navy text-white",
        "transition-transform duration-[1000ms] ease-[var(--ease-out-expo)]",
        phase === "exit" ? "-translate-y-full" : "translate-y-0"
      )}
    >
      <div
        className={cn(
          "flex flex-col items-center gap-6 transition-[opacity,transform] duration-500",
          phase === "exit" && "-translate-y-6 opacity-0"
        )}
      >
        {/* Plain <img>: must paint instantly, before the image optimizer warms up */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo-icon.png"
          alt=""
          width={88}
          height={88}
          decoding="sync"
          className="animate-preloader-logo size-20 rounded-[22%] shadow-[0_20px_60px_-20px_rgba(6,195,214,0.6)] sm:size-22"
        />
        <div className="relative h-7 w-64 overflow-hidden text-sm font-bold tracking-[0.28em] text-white/80 uppercase">
          {WORDS.map((w, i) => (
            <span
              key={w}
              className={cn(
                "absolute inset-x-0 block text-center whitespace-nowrap transition-[transform,opacity] duration-500 ease-[var(--ease-out-expo)]",
                i === word
                  ? "translate-y-0 opacity-100"
                  : i < word
                    ? "-translate-y-full opacity-0"
                    : "translate-y-full opacity-0"
              )}
            >
              {w}
            </span>
          ))}
        </div>
        <span className="relative h-px w-28 overflow-hidden bg-white/15">
          <span className="animate-preloader-bar absolute inset-y-0 left-0 w-full origin-left bg-cyan" />
        </span>
      </div>
    </div>
  )
}
