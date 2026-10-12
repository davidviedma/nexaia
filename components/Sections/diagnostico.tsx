"use client"

import { useEffect, useState } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowRight02Icon,
  Search01Icon,
  FocusPointIcon,
  Grid2X2Icon,
  CheckmarkCircle02Icon,
  Idea01Icon,
  RankingIcon,
  Clock01Icon,
  CoinsEuroIcon,
  ChartLineData01Icon,
} from "@hugeicons/core-free-icons"

import { diagnostico } from "@/lib/content"
import { cn } from "@/lib/utils"
import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"
import { Button } from "@/components/ui/button"
import { useInView } from "@/hooks/use-in-view"
import { StarBorder } from "@/components/bits/surfaces"

const phaseIcons = [
  Search01Icon,
  FocusPointIcon,
  Grid2X2Icon,
  CheckmarkCircle02Icon,
]
const deliverableIcons = [
  Idea01Icon,
  RankingIcon,
  Clock01Icon,
  CoinsEuroIcon,
  ChartLineData01Icon,
]

/**
 * Opportunities found during a diagnosis, placed on the impact / effort
 * matrix. x = effort (0 left, 1 right), y = impact (0 bottom, 1 top).
 */
const dots = [
  { x: 0.22, y: 0.82, big: true },
  { x: 0.36, y: 0.68 },
  { x: 0.12, y: 0.72 },
  { x: 0.74, y: 0.78 },
  { x: 0.3, y: 0.28 },
  { x: 0.58, y: 0.2 },
  { x: 0.84, y: 0.34 },
]

function Matrix({ active, phase }: { active: boolean; phase: number }) {
  const m = diagnostico.matrix
  // Dots appear as soon as the section is in view; the "Primero" quadrant
  // lights up on the "Priorizar" and "Decidir" phases.
  const lit = active && phase >= 2
  return (
    <div className="relative w-full pb-8 pl-8 select-none">
      {/* axis labels */}
      <span
        aria-hidden
        className="absolute top-0 bottom-8 left-0 flex w-8 items-center justify-center"
      >
        <span className="rotate-180 text-[11px] font-bold tracking-[0.2em] whitespace-nowrap text-white/50 uppercase [writing-mode:vertical-rl]">
          {m.axisY} ↑
        </span>
      </span>
      <span
        aria-hidden
        className="absolute right-0 bottom-0 left-8 flex h-8 items-center justify-center text-[11px] font-bold tracking-[0.2em] whitespace-nowrap text-white/50 uppercase"
      >
        {m.axisX} →
      </span>

      <div className="relative grid aspect-square w-full grid-cols-2 grid-rows-2 gap-2 sm:gap-2.5">
        {m.quadrants.map((q, i) => {
          const first = i === 0
          return (
            <div
              key={q.label}
              className={cn(
                "relative flex flex-col justify-end overflow-hidden rounded-2xl border p-3 transition-all duration-700 ease-[var(--ease-out-expo)] sm:p-4",
                first
                  ? lit
                    ? "border-cyan/60 bg-cyan/15 shadow-[0_0_0_1px_rgba(6,195,214,0.35),0_0_60px_-10px_rgba(6,195,214,0.45)]"
                    : "border-cyan/25 bg-white/[0.05]"
                  : "border-white/10 bg-white/[0.04]"
              )}
            >
              <span
                className={cn(
                  "text-base font-bold tracking-tight transition-colors duration-500 sm:text-lg",
                  first && lit ? "text-cyan" : "text-white/85"
                )}
              >
                {q.label}
              </span>
              <span className="hidden text-xs text-white/45 sm:block">
                {q.hint}
              </span>
            </div>
          )
        })}

        {/* opportunities */}
        {dots.map((d, i) => {
          const inFirst = d.x < 0.5 && d.y > 0.5
          const r = d.big ? 12 : 7
          return (
            <span
              key={i}
              aria-hidden
              className={cn(
                "absolute rounded-full transition-[transform,opacity,background-color,box-shadow] duration-700 ease-[var(--ease-spring)]",
                d.big ? "size-6" : "size-3.5",
                active ? "scale-100 opacity-100" : "scale-0 opacity-0",
                lit && inFirst
                  ? "bg-cyan shadow-[0_0_0_6px_rgba(6,195,214,0.25)]"
                  : "bg-white/80"
              )}
              style={{
                left: `calc(${d.x * 100}% - ${r}px)`,
                top: `calc(${(1 - d.y) * 100}% - ${r}px)`,
                transitionDelay: `${i * 90}ms`,
              }}
            >
              {d.big && (
                <>
                  <span
                    className={cn(
                      "absolute inset-0 rounded-full bg-cyan/60",
                      lit && "animate-ping"
                    )}
                  />
                  <span
                    className={cn(
                      "absolute top-1/2 left-full ml-3 hidden -translate-y-1/2 rounded-full bg-cyan px-2.5 py-1 text-[11px] font-bold whitespace-nowrap text-ink transition-[opacity,transform] duration-500 ease-[var(--ease-out-expo)] sm:block",
                      lit
                        ? "translate-x-0 opacity-100"
                        : "-translate-x-2 opacity-0"
                    )}
                  >
                    Confirmar citas
                  </span>
                </>
              )}
            </span>
          )
        })}
      </div>
    </div>
  )
}

export function Diagnostico() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const { ref, inView } = useInView<HTMLDivElement>({
    threshold: 0.35,
    once: false,
  })
  const phases = diagnostico.phases
  const n = phases.length

  useEffect(() => {
    if (paused || !inView) return
    const id = setInterval(() => setActive((i) => (i + 1) % n), 3000)
    return () => clearInterval(id)
  }, [paused, inView, n])

  return (
    <section
      id="diagnostico"
      data-theme="dark"
      className="grain relative overflow-hidden bg-brand-950 py-24 text-white [--grain-opacity:0.12] lg:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(900px circle at 85% 15%, rgba(25,81,252,0.45), transparent 60%), radial-gradient(700px circle at 10% 90%, rgba(6,195,214,0.18), transparent 60%)",
        }}
      />

      <div
        ref={ref}
        className="relative z-[2] container mx-auto px-6 sm:px-10 lg:px-16"
      >
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-12">
          {/* Left: heading, stepper, deliverables, CTA */}
          <div className="flex flex-col gap-10 lg:col-span-6">
            <SectionHeading
              kicker={diagnostico.kicker}
              lines={diagnostico.title}
              tone="dark"
            />

            {/* Stepper */}
            <Reveal delay={120}>
              <ol
                className="relative grid grid-cols-4 gap-2"
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
              >
                {/* track */}
                <span
                  aria-hidden
                  className="absolute top-7 right-[12.5%] left-[12.5%] h-px bg-white/15"
                />
                <span
                  aria-hidden
                  className="absolute top-7 left-[12.5%] h-px w-[75%] origin-left bg-cyan transition-transform duration-700 ease-[var(--ease-out-expo)]"
                  style={{ transform: `scaleX(${active / (n - 1)})` }}
                />
                {phases.map((p, i) => {
                  const on = i === active
                  const done = i < active
                  return (
                    <li
                      key={p.title}
                      className="relative flex flex-col items-center gap-3 text-center"
                    >
                      <button
                        type="button"
                        onClick={() => setActive(i)}
                        onFocus={() => setActive(i)}
                        aria-current={on ? "step" : undefined}
                        aria-label={`${i + 1}. ${p.title}`}
                        className={cn(
                          "relative z-[1] flex size-14 items-center justify-center rounded-full border transition-all duration-500 ease-[var(--ease-out-expo)]",
                          on
                            ? "scale-110 border-cyan bg-cyan text-ink shadow-[0_0_0_8px_rgba(6,195,214,0.18)]"
                            : done
                              ? "border-cyan/60 bg-brand-950 text-cyan"
                              : "border-white/15 bg-brand-950 text-white/60 hover:border-white/40 hover:text-white"
                        )}
                      >
                        <HugeiconsIcon icon={phaseIcons[i]} size={22} />
                      </button>
                      <span
                        className={cn(
                          "text-sm font-bold tracking-tight transition-colors duration-300 sm:text-base",
                          on ? "text-white" : "text-white/55"
                        )}
                      >
                        {p.title}
                      </span>
                    </li>
                  )
                })}
              </ol>
              {/* one line for the active phase */}
              <div className="relative mt-5 h-8 overflow-hidden text-center">
                {phases.map((p, i) => (
                  <p
                    key={p.title}
                    aria-hidden={i !== active}
                    className={cn(
                      "absolute inset-x-0 text-lg font-medium text-white/85 transition-[transform,opacity] duration-500 ease-[var(--ease-out-expo)]",
                      i === active
                        ? "translate-y-0 opacity-100"
                        : i < active
                          ? "-translate-y-full opacity-0"
                          : "translate-y-full opacity-0"
                    )}
                  >
                    <span className="mr-2 text-cyan">0{i + 1}</span>
                    {p.text}
                  </p>
                ))}
              </div>
            </Reveal>

            {/* Deliverables as chips */}
            <Reveal delay={200} className="flex flex-col gap-4">
              <p className="text-[11px] font-bold tracking-[0.2em] text-white/50 uppercase">
                {diagnostico.deliverables.label}
              </p>
              <ul className="flex flex-wrap gap-2">
                {diagnostico.deliverables.items.map((item, i) => (
                  <li
                    key={item}
                    className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.05] py-2 pr-4 pl-2 text-sm font-semibold transition-colors duration-300 hover:border-cyan/50 hover:bg-white/[0.09]"
                  >
                    <span className="flex size-7 items-center justify-center rounded-full bg-cyan/15 text-cyan">
                      <HugeiconsIcon icon={deliverableIcons[i]} size={15} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={260}>
              <StarBorder color="#06c3d6" speed={5} className="w-fit">
                <Button asChild size="lg" variant="light" className="w-fit">
                  <a href="#contacto">
                    {diagnostico.button}
                    <HugeiconsIcon icon={ArrowRight02Icon} size={16} />
                  </a>
                </Button>
              </StarBorder>
            </Reveal>
          </div>

          {/* Right: the priority matrix */}
          <Reveal
            variant="scale"
            delay={160}
            className="lg:col-span-6 lg:flex lg:items-center"
          >
            <div className="mx-auto w-full max-w-[32rem]">
              <Matrix active={inView} phase={active} />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
