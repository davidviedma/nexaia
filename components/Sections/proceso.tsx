"use client"

import { useEffect, useRef, useState } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Search01Icon,
  CheckmarkCircle02Icon,
  RocketIcon,
  Message01Icon,
} from "@hugeicons/core-free-icons"

import { proceso } from "@/lib/content"
import { cn } from "@/lib/utils"
import { Kicker } from "@/components/section-heading"
import { RevealLines } from "@/components/reveal"
import { addScrollTask } from "@/lib/scroll-scheduler"

/**
 * "How it works" inside a scroll-expand panel: the white panel starts as an
 * inset card on a dark backdrop, grows to fill the viewport while pinned,
 * the four step cards light up one after another as you scroll, then the
 * panel shrinks back and the page continues.
 */

const GROW_END = 0.26
const SHRINK_START = 0.76
const STEPS_START = 0.24
const STEPS_END = 0.72

const icons = [Search01Icon, CheckmarkCircle02Icon, RocketIcon, Message01Icon]

const clamp01 = (v: number) => Math.max(0, Math.min(1, v))
const easeInOut = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

export function Proceso() {
  const wrapRef = useRef<HTMLElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const wrap = wrapRef.current
    const panel = panelRef.current
    if (!wrap || !panel) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let last = -1

    return addScrollTask({
      read: () => {
        const rect = wrap.getBoundingClientRect()
        const vh = window.innerHeight
        if (rect.bottom < -vh || rect.top > vh * 2) return null
        return {
          top: rect.top,
          height: rect.height,
          vh,
          pinned: window.innerWidth >= 1024 && !reduce,
        }
      },
      write: (m) => {
        if (!m) return
        let steps: number
        if (m.pinned) {
          const total = Math.max(1, m.height - m.vh)
          const p = clamp01(-m.top / total)
          const expand =
            p < GROW_END
              ? easeInOut(p / GROW_END)
              : p > SHRINK_START
                ? 1 - easeInOut((p - SHRINK_START) / (1 - SHRINK_START))
                : 1
          const scale = 0.84 + 0.16 * expand
          const radius = 48 * (1 - expand)
          panel.style.transform = `scale(${scale.toFixed(4)})`
          panel.style.borderRadius = `${radius.toFixed(1)}px`
          panel.style.boxShadow = `0 ${40 * (1 - expand)}px ${120 * (1 - expand)}px -30px rgba(3,25,91,${0.6 * (1 - expand)})`
          steps = clamp01((p - STEPS_START) / (STEPS_END - STEPS_START))
        } else {
          panel.style.transform = ""
          panel.style.borderRadius = ""
          panel.style.boxShadow = ""
          steps = reduce
            ? 1
            : clamp01((m.vh * 0.85 - m.top) / Math.max(1, m.height * 0.8))
        }
        if (Math.abs(steps - last) > 0.002) {
          last = steps
          setProgress(steps)
        }
      },
    })
  }, [])

  const steps = proceso.steps
  const n = steps.length
  // Which step is "current": 0..n-1 while scrubbing, all done at the end.
  const current = Math.min(n - 1, Math.floor(progress * n))

  return (
    <section
      id="metodo"
      ref={wrapRef}
      data-theme="dark"
      className="relative bg-navy lg:h-[300svh] lg:motion-reduce:h-auto"
    >
      <div className="relative flex items-center justify-center overflow-hidden px-4 py-16 lg:sticky lg:top-0 lg:h-svh lg:p-0 lg:motion-reduce:static lg:motion-reduce:h-auto">
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
          className="relative flex w-full origin-center flex-col justify-center overflow-hidden rounded-[2rem] bg-white will-change-transform lg:h-full lg:rounded-none lg:motion-reduce:h-auto lg:motion-reduce:py-24"
        >
          <div className="container mx-auto px-6 py-14 sm:px-10 lg:px-16">
            {/* Header */}
            <div className="mb-10 flex flex-col gap-6 lg:mb-14 lg:flex-row lg:items-end lg:justify-between">
              <div className="flex flex-col gap-5">
                <Kicker>{proceso.kicker}</Kicker>
                <RevealLines
                  lines={["Primero entendemos", "tu negocio."]}
                  delay={80}
                  className="text-4xl leading-[1.02] font-bold tracking-[-0.03em] text-balance text-ink sm:text-5xl lg:text-6xl"
                />
              </div>
              <div className="flex items-center gap-4 lg:pb-2">
                <p className="max-w-xs text-base text-ink-soft">
                  {proceso.text}
                </p>
                <span className="hidden shrink-0 rounded-full border border-line px-3 py-1.5 text-xs font-bold text-ink tabular-nums sm:inline-flex">
                  Paso {String(current + 1).padStart(2, "0")} / 0{n}
                </span>
              </div>
            </div>

            {/* Steps */}
            <div className="relative">
              {/* Desktop connector through the icon row */}
              <div
                aria-hidden
                className="absolute top-[4.1rem] right-6 left-6 hidden h-px bg-line lg:block"
              />
              <div
                aria-hidden
                className="absolute top-[4.1rem] right-6 left-6 hidden h-px origin-left bg-brand-600 lg:block"
                style={{ transform: `scaleX(${progress})` }}
              />
              {/* Mobile connector */}
              <div
                aria-hidden
                className="absolute top-6 bottom-6 left-[2.35rem] w-px bg-line lg:hidden"
              />
              <div
                aria-hidden
                className="absolute top-6 left-[2.35rem] w-px origin-top bg-brand-600 lg:hidden"
                style={{ height: `calc((100% - 3rem) * ${progress})` }}
              />

              <ol className="grid grid-cols-1 gap-3 lg:grid-cols-4 lg:gap-4">
                {steps.map((s, i) => {
                  const done = progress >= (i + 1) / n - 0.001
                  const active = i === current && progress > 0
                  const lit = done || active
                  return (
                    <li
                      key={s.title}
                      className={cn(
                        "relative flex flex-col gap-5 rounded-[1.75rem] border p-6 transition-all duration-500 ease-[var(--ease-out-expo)] lg:gap-6",
                        active
                          ? "-translate-y-1 border-brand-600 bg-white shadow-[0_28px_60px_-28px_rgba(25,81,252,0.45)]"
                          : done
                            ? "border-line bg-white"
                            : "border-transparent bg-surface"
                      )}
                    >
                      {/* faint number */}
                      <span
                        aria-hidden
                        className={cn(
                          "pointer-events-none absolute top-4 right-5 text-5xl font-bold tracking-[-0.05em] transition-colors duration-500",
                          lit ? "text-brand-50" : "text-line/70"
                        )}
                      >
                        0{i + 1}
                      </span>

                      <span
                        className={cn(
                          "relative z-[1] flex size-12 items-center justify-center rounded-2xl border transition-all duration-500 ease-[var(--ease-out-expo)]",
                          lit
                            ? "border-brand-600 bg-brand-600 text-white shadow-[0_0_0_6px_rgba(25,81,252,0.12)]"
                            : "border-line bg-white text-ink-soft"
                        )}
                      >
                        <HugeiconsIcon icon={icons[i]} size={22} />
                      </span>

                      <div className="flex flex-col gap-2">
                        <h3
                          className={cn(
                            "text-2xl font-bold tracking-tight transition-colors duration-500",
                            lit ? "text-ink" : "text-ink/55"
                          )}
                        >
                          {s.title}
                        </h3>
                        <p
                          className={cn(
                            "text-base transition-colors duration-500",
                            lit ? "text-ink-soft" : "text-ink-soft/60"
                          )}
                        >
                          {s.text}
                        </p>
                      </div>

                      <ul
                        className={cn(
                          "flex flex-col gap-2 transition-opacity duration-500",
                          lit ? "opacity-100" : "opacity-50"
                        )}
                      >
                        {s.points.map((pt) => (
                          <li
                            key={pt}
                            className="flex items-start gap-2.5 text-sm text-ink"
                          >
                            <span
                              className={cn(
                                "mt-1.5 size-1.5 shrink-0 rounded-full transition-colors duration-500",
                                lit ? "bg-cyan" : "bg-line"
                              )}
                            />
                            {pt}
                          </li>
                        ))}
                      </ul>
                    </li>
                  )
                })}
              </ol>
            </div>

            <p className="mt-8 flex items-center gap-3 text-[11px] font-bold tracking-[0.22em] text-ink-soft uppercase lg:mt-12">
              <span className="h-px w-8 bg-cyan" />
              Sigue bajando
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
