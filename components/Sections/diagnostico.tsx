"use client"

import { useEffect, useState } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  CheckmarkCircle02Icon,
  ArrowRight02Icon,
} from "@hugeicons/core-free-icons"

import { diagnostico } from "@/lib/content"
import { cn } from "@/lib/utils"
import { Reveal } from "@/components/reveal"
import { Kicker, SectionHeading } from "@/components/section-heading"
import { Button } from "@/components/ui/button"
import { useInView } from "@/hooks/use-in-view"
import { SpotlightCard, StarBorder } from "@/components/bits/surfaces"

export function Diagnostico() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const { ref, inView } = useInView<HTMLDivElement>({
    threshold: 0.4,
    once: false,
  })
  const d = diagnostico.deliverables

  useEffect(() => {
    if (paused || !inView) return
    const id = setInterval(
      () => setActive((i) => (i + 1) % diagnostico.phases.length),
      3600
    )
    return () => clearInterval(id)
  }, [paused, inView])

  return (
    <section
      id="diagnostico"
      data-theme="dark"
      className="grain relative overflow-hidden bg-brand-950 py-24 text-white [--grain-opacity:0.12] lg:py-36"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(900px circle at 85% 15%, rgba(25,81,252,0.45), transparent 60%), radial-gradient(700px circle at 10% 90%, rgba(6,195,214,0.18), transparent 60%)",
        }}
      />

      <div className="relative z-[2] container mx-auto px-6 sm:px-10 lg:px-16">
        <SectionHeading
          kicker={diagnostico.kicker}
          lines={["Antes de invertir,", "descubre por", "dónde empezar."]}
          text={diagnostico.text}
          tone="dark"
          className="mb-16 lg:mb-20"
        />

        {/* Phases */}
        <div
          ref={ref}
          className="grid grid-cols-1 gap-3 md:grid-cols-3"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {diagnostico.phases.map((p, i) => {
            const isActive = active === i
            return (
              <Reveal key={p.n} delay={i * 100} className="h-full">
                <SpotlightCard
                  as="button"
                  color={
                    isActive ? "rgba(25,81,252,0.10)" : "rgba(6,195,214,0.20)"
                  }
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  aria-expanded={isActive}
                  className={cn(
                    "group relative flex h-full w-full flex-col gap-5 overflow-hidden rounded-[1.75rem] border p-7 text-left transition-all duration-500 ease-[var(--ease-out-expo)] sm:p-8",
                    isActive
                      ? "border-white/20 bg-white text-ink shadow-[0_40px_80px_-40px_rgba(0,0,0,0.6)]"
                      : "border-white/10 bg-white/[0.04] text-white hover:bg-white/[0.08]"
                  )}
                >
                  <span
                    className={cn(
                      "text-5xl font-bold tracking-[-0.04em] transition-colors duration-500",
                      isActive ? "text-brand-600" : "text-cyan"
                    )}
                  >
                    {p.n}
                  </span>
                  <span className="flex flex-col gap-1">
                    <span className="text-2xl font-bold tracking-tight">
                      {p.title}
                    </span>
                    <span
                      className={cn(
                        "text-base",
                        isActive ? "text-ink-soft" : "text-white/60"
                      )}
                    >
                      {p.text}
                    </span>
                  </span>

                  <ul
                    className={cn(
                      "grid overflow-hidden transition-[grid-template-rows,opacity] duration-500 ease-[var(--ease-out-expo)]",
                      isActive
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0 md:grid-rows-[1fr] md:opacity-60"
                    )}
                  >
                    <div className="min-h-0">
                      <div className="flex flex-col gap-2 pt-2">
                        {p.items.map((item) => (
                          <span
                            key={item}
                            className={cn(
                              "flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium transition-colors duration-300",
                              isActive
                                ? "bg-surface text-ink"
                                : "bg-white/[0.05] text-white/80"
                            )}
                          >
                            <span className="size-1.5 shrink-0 rounded-full bg-cyan" />
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </ul>
                </SpotlightCard>
              </Reveal>
            )
          })}
        </div>

        {/* Deliverables */}
        <div className="mt-20 grid grid-cols-1 gap-12 lg:mt-28 lg:grid-cols-12 lg:gap-10">
          <div className="flex flex-col gap-6 lg:col-span-5">
            <Reveal>
              <Kicker tone="dark">{d.kicker}</Kicker>
            </Reveal>
            <Reveal delay={80}>
              <h3 className="text-4xl leading-[1.02] font-bold tracking-[-0.03em] text-balance sm:text-5xl">
                Un plan claro. <br />
                Una decisión <span className="text-cyan">con criterio.</span>
              </h3>
            </Reveal>
            <Reveal delay={160}>
              <p className="max-w-md text-lg text-white/65">{d.footer}</p>
            </Reveal>
            <Reveal delay={240}>
              <StarBorder color="#06c3d6" speed={5} className="w-fit">
                <Button asChild size="lg" variant="light" className="w-fit">
                  <a href="#contacto">
                    Solicitar Diagnóstico Nexa
                    <HugeiconsIcon icon={ArrowRight02Icon} size={16} />
                  </a>
                </Button>
              </StarBorder>
            </Reveal>
          </div>

          <Reveal delay={200} className="lg:col-span-7">
            <ol className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.04]">
              {d.items.map((item, i) => (
                <li
                  key={item}
                  className="group flex items-center gap-5 border-b border-white/10 px-6 py-6 transition-colors duration-300 last:border-b-0 hover:bg-white/[0.06] sm:px-8"
                >
                  <span className="text-sm font-bold text-cyan tabular-nums">
                    0{i + 1}
                  </span>
                  <span className="text-xl font-bold tracking-tight transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1 sm:text-2xl">
                    {item}
                  </span>
                  <HugeiconsIcon
                    icon={CheckmarkCircle02Icon}
                    size={22}
                    className="ml-auto text-white/30 transition-colors duration-300 group-hover:text-cyan"
                  />
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
