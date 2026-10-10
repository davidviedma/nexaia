"use client"

import { useEffect, useRef, useState } from "react"
import { proceso } from "@/lib/content"
import { cn } from "@/lib/utils"
import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"

/**
 * Scroll-expand section: the white panel starts as an inset card on a dark
 * backdrop, grows to fill the viewport while the section is pinned, the
 * step line draws itself during the hold, and the panel shrinks back as
 * you scroll on.
 */

// Scroll-progress keyframes (0 → 1 across the tall wrapper)
const GROW_END = 0.28
const SHRINK_START = 0.74
const LINE_START = 0.26
const LINE_END = 0.7

const clamp01 = (v: number) => Math.max(0, Math.min(1, v))
const easeInOut = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

export function Proceso() {
  const wrapRef = useRef<HTMLElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const [lineProgress, setLineProgress] = useState(0)

  useEffect(() => {
    const wrap = wrapRef.current
    const panel = panelRef.current
    if (!wrap || !panel) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let raf = 0
    let lastLine = -1

    const update = () => {
      raf = 0
      const rect = wrap.getBoundingClientRect()
      const vh = window.innerHeight
      const total = Math.max(1, rect.height - vh)
      const p = clamp01(-rect.top / total)

      // 0 → 1 while growing, 1 during the hold, 1 → 0 while shrinking
      const expand =
        p < GROW_END
          ? easeInOut(p / GROW_END)
          : p > SHRINK_START
            ? 1 - easeInOut((p - SHRINK_START) / (1 - SHRINK_START))
            : 1

      if (!reduce) {
        const scale = 0.84 + 0.16 * expand
        const radius = 48 * (1 - expand)
        panel.style.transform = `scale(${scale.toFixed(4)})`
        panel.style.borderRadius = `${radius.toFixed(1)}px`
        panel.style.boxShadow = `0 ${40 * (1 - expand)}px ${120 * (1 - expand)}px -30px rgba(3,25,91,${0.6 * (1 - expand)})`
      }

      const line = clamp01((p - LINE_START) / (LINE_END - LINE_START))
      if (Math.abs(line - lastLine) > 0.002) {
        lastLine = line
        setLineProgress(line)
      }
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  const steps = proceso.steps

  return (
    <section
      id="metodo"
      ref={wrapRef}
      data-theme="dark"
      className="relative bg-navy motion-reduce:h-auto"
      style={{ height: "300svh" }}
    >
      {/* Ambient glow behind the card */}
      <div className="sticky top-0 flex h-svh items-center justify-center overflow-hidden motion-reduce:static motion-reduce:h-auto">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(700px circle at 20% 20%, rgba(25,81,252,0.35), transparent 60%), radial-gradient(600px circle at 85% 80%, rgba(6,195,214,0.18), transparent 60%)",
          }}
        />

        <div
          ref={panelRef}
          data-theme="light"
          className="relative flex h-full w-full origin-center flex-col justify-center overflow-hidden bg-white will-change-transform motion-reduce:h-auto motion-reduce:py-24"
          style={{ transform: "scale(0.84)", borderRadius: 48 }}
        >
          <div className="container mx-auto px-6 py-16 sm:px-10 lg:px-16">
            <SectionHeading
              kicker={proceso.kicker}
              lines={["Primero entendemos", "tu negocio."]}
              className="mb-12 lg:mb-20"
            />

            <div className="relative">
              {/* Track: vertical on mobile, horizontal on desktop */}
              <div
                aria-hidden
                className="absolute top-5 left-5 h-[calc(100%-2.5rem)] w-px bg-line lg:hidden"
              />
              <div
                aria-hidden
                className="absolute top-5 left-5 w-px bg-brand-600 lg:hidden"
                style={{ height: `calc((100% - 2.5rem) * ${lineProgress})` }}
              />
              <div
                aria-hidden
                className="absolute top-5 left-0 hidden h-px w-full bg-line lg:block"
              />
              <div
                aria-hidden
                className="absolute top-5 left-0 hidden h-px w-full origin-left bg-brand-600 lg:block"
                style={{ transform: `scaleX(${lineProgress})` }}
              />

              <ol className="grid grid-cols-1 gap-8 lg:grid-cols-4 lg:gap-6">
                {steps.map((s, i) => {
                  const threshold = i / steps.length + 0.04
                  const reached = lineProgress >= threshold
                  return (
                    <li
                      key={s.title}
                      className="relative flex gap-6 lg:flex-col lg:gap-8"
                    >
                      <span
                        className={cn(
                          "relative z-[1] flex size-10 shrink-0 items-center justify-center rounded-full border text-xs font-bold tabular-nums transition-all duration-500 ease-[var(--ease-out-expo)]",
                          reached
                            ? "border-brand-600 bg-brand-600 text-white shadow-[0_0_0_6px_rgba(25,81,252,0.12)]"
                            : "border-line bg-white text-ink-soft"
                        )}
                      >
                        0{i + 1}
                      </span>
                      <Reveal
                        delay={i * 90}
                        className="flex flex-col gap-2 pt-1 lg:pr-6"
                      >
                        <h3
                          className={cn(
                            "text-2xl font-bold tracking-tight transition-colors duration-500",
                            reached ? "text-ink" : "text-ink/60"
                          )}
                        >
                          {s.title}
                        </h3>
                        <p className="text-base text-ink-soft">{s.text}</p>
                      </Reveal>
                    </li>
                  )
                })}
              </ol>
            </div>

            <p className="mt-12 flex items-center gap-3 text-[11px] font-bold tracking-[0.22em] text-ink-soft uppercase lg:mt-20">
              <span className="h-px w-8 bg-cyan" />
              Sigue bajando
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
