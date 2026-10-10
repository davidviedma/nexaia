"use client"

import { useEffect, useRef, useState } from "react"
import { proceso } from "@/lib/content"
import { cn } from "@/lib/utils"
import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"

/**
 * Four steps joined by a line that draws itself as you scroll through.
 */
export function Proceso() {
  const ref = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf = 0
    const update = () => {
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      // 0 when the element's top reaches 85% of the viewport, 1 when its bottom reaches 45%.
      const start = vh * 0.85
      const end = vh * 0.45
      const p = (start - rect.top) / (rect.height + start - end)
      setProgress(Math.max(0, Math.min(1, p)))
    }
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  const steps = proceso.steps

  return (
    <section id="metodo" className="relative bg-white py-24 lg:py-36">
      <div className="container mx-auto px-6 sm:px-10 lg:px-16">
        <SectionHeading
          kicker={proceso.kicker}
          lines={["Primero entendemos", "tu negocio."]}
          className="mb-16 lg:mb-24"
        />

        <div ref={ref} className="relative">
          {/* Track: vertical on mobile, horizontal on desktop */}
          <div
            aria-hidden
            className="absolute top-5 left-5 h-[calc(100%-2.5rem)] w-px bg-line lg:hidden"
          />
          <div
            aria-hidden
            className="absolute top-5 left-5 w-px bg-brand-600 lg:hidden"
            style={{ height: `calc((100% - 2.5rem) * ${progress})` }}
          />
          <div
            aria-hidden
            className="absolute top-5 left-0 hidden h-px w-full bg-line lg:block"
          />
          <div
            aria-hidden
            className="absolute top-5 left-0 hidden h-px w-full origin-left bg-brand-600 lg:block"
            style={{ transform: `scaleX(${progress})` }}
          />

          <ol className="grid grid-cols-1 gap-10 lg:grid-cols-4 lg:gap-6">
            {steps.map((s, i) => {
              const threshold = i / steps.length + 0.04
              const reached = progress >= threshold
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
      </div>
    </section>
  )
}
