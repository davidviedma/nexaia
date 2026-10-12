"use client"

import { useState } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowRight02Icon,
  Clock01Icon,
  Tick02Icon,
} from "@hugeicons/core-free-icons"

import { resultados } from "@/lib/content"
import { cn } from "@/lib/utils"
import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"
import { Button } from "@/components/ui/button"
import { StarBorder } from "@/components/bits/surfaces"
import { useCountUp } from "@/hooks/use-count-up"
import { useInView } from "@/hooks/use-in-view"

type Period = "mes" | "año"

// Spanish CLDR leaves 4-digit numbers ungrouped ("1680"); readers expect "1.680".
const fmt = (n: number) =>
  String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ".")

/* Ten tiles = ten hours a month. Seven of them come back. */
function HourTiles({ active }: { active: boolean }) {
  const total = resultados.before.hours
  const kept = resultados.after.hours
  return (
    <div className="grid grid-cols-5 gap-2 sm:gap-2.5">
      {Array.from({ length: total }).map((_, i) => {
        const freed = i >= kept
        const on = active && freed
        return (
          <span
            key={i}
            aria-hidden
            className={cn(
              "flex aspect-square items-center justify-center rounded-xl border transition-[background-color,border-color,transform,color] duration-500 ease-[var(--ease-spring)]",
              on
                ? "scale-100 border-cyan bg-cyan text-ink"
                : "border-white/15 bg-white/[0.06] text-white/60",
              active ? "scale-100" : "scale-90"
            )}
            style={{ transitionDelay: `${150 + (i - kept) * 110}ms` }}
          >
            <HugeiconsIcon
              icon={on ? Tick02Icon : Clock01Icon}
              size={18}
              strokeWidth={on ? 2.4 : 1.8}
            />
          </span>
        )
      })}
    </div>
  )
}

function StatTile({
  value,
  unit,
  label,
  active,
  tone = "light",
  delay = 0,
}: {
  value: number
  unit: string
  label: string
  active: boolean
  tone?: "light" | "blue" | "dark"
  delay?: number
}) {
  const v = useCountUp(value, 900, active)
  return (
    <Reveal delay={delay} className="h-full">
      <div
        className={cn(
          "flex h-full flex-col justify-between gap-6 rounded-[1.75rem] border p-6 sm:p-7",
          tone === "light" && "border-line bg-surface text-ink",
          tone === "blue" && "border-brand-600 bg-brand-600 text-white",
          tone === "dark" && "border-navy bg-navy text-white"
        )}
      >
        <p className="flex items-baseline gap-1 text-5xl font-bold tracking-[-0.04em] tabular-nums sm:text-6xl">
          <span>{fmt(v)}</span>
          <span className="text-2xl font-bold sm:text-3xl">{unit}</span>
        </p>
        <p
          className={cn(
            "text-sm font-semibold",
            tone === "light" ? "text-ink-soft" : "text-white/75"
          )}
        >
          {label}
        </p>
      </div>
    </Reveal>
  )
}

export function Resultados() {
  const [period, setPeriod] = useState<Period>("año")
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.25 })

  const months = period === "año" ? 12 : 1
  const savedPerMonth = resultados.before.hours - resultados.after.hours // 7 h
  const savedHours = savedPerMonth * months
  const euros = savedHours * resultados.hourRate
  const allTasksHours = savedPerMonth * resultados.tasks * months
  const heroValue = useCountUp(resultados.hero.value, 1200, inView)

  return (
    <section id="resultados" className="relative bg-white py-24 lg:py-32">
      <div className="container mx-auto px-6 sm:px-10 lg:px-16">
        <div className="mb-12 flex flex-col gap-8 lg:mb-16 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading kicker={resultados.kicker} lines={resultados.title} />
          {/* Period toggle */}
          <Reveal delay={200}>
            <div
              role="tablist"
              aria-label="Periodo"
              className="relative inline-flex rounded-full border border-line bg-surface p-1"
            >
              <span
                aria-hidden
                className="absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full bg-ink transition-transform duration-500 ease-[var(--ease-spring)]"
                style={{
                  transform: `translateX(${period === "mes" ? "0%" : "100%"})`,
                }}
              />
              {(["mes", "año"] as Period[]).map((p) => (
                <button
                  key={p}
                  role="tab"
                  aria-selected={period === p}
                  onClick={() => setPeriod(p)}
                  className={cn(
                    "relative z-[1] w-24 rounded-full py-2 text-sm font-semibold transition-colors duration-300",
                    period === p ? "text-white" : "text-ink-soft hover:text-ink"
                  )}
                >
                  Al {p}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <div ref={ref} className="grid grid-cols-1 gap-4 lg:grid-cols-12">
          {/* Hero figure + hour tiles */}
          <Reveal className="lg:col-span-7">
            <div
              data-theme="dark"
              className="grain relative grid h-full grid-cols-1 gap-10 overflow-hidden rounded-[2rem] bg-navy p-7 text-white [--grain-opacity:0.1] sm:grid-cols-2 sm:items-center sm:p-10"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -top-32 -right-32 size-[30rem] rounded-full"
                style={{
                  background:
                    "radial-gradient(circle closest-side, rgba(25,81,252,0.45), transparent 100%)",
                }}
              />
              <div className="relative z-[2] flex flex-col">
                <p className="text-[11px] font-bold tracking-[0.2em] text-cyan uppercase">
                  {resultados.scenario}
                </p>
                <p className="mt-5 flex items-baseline leading-none">
                  <span className="text-[6rem] font-bold tracking-[-0.06em] text-cyan tabular-nums sm:text-[7.5rem] lg:text-[8.5rem]">
                    −{Math.round(heroValue)}
                  </span>
                  <span className="ml-1 text-4xl font-bold text-cyan sm:text-5xl">
                    %
                  </span>
                </p>
                <p className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
                  {resultados.hero.label}
                </p>
              </div>

              <div className="relative z-[2] flex flex-col gap-4">
                <HourTiles active={inView} />
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-white/70">
                    <span className="size-2.5 rounded-sm border border-white/30 bg-white/10" />
                    {resultados.before.label} · {resultados.before.hours} h
                  </span>
                  <span className="flex items-center gap-2 font-bold text-cyan">
                    <span className="size-2.5 rounded-sm bg-cyan" />
                    {resultados.after.label} · {resultados.after.hours} h
                  </span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* KPI column */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:col-span-5 lg:grid-cols-1">
            <StatTile
              value={savedHours}
              unit="h"
              label={`Recuperadas al ${period}`}
              active={inView}
              tone="blue"
              delay={80}
            />
            <StatTile
              value={euros}
              unit="€"
              label={`Valor de ese tiempo al ${period}`}
              active={inView}
              delay={160}
            />
            <StatTile
              value={allTasksHours}
              unit="h"
              label={`Con ${resultados.tasks} tareas al ${period}`}
              active={inView}
              tone="dark"
              delay={240}
            />
          </div>
        </div>

        <Reveal
          delay={120}
          className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="max-w-lg text-xs leading-relaxed text-ink-soft/80">
            {resultados.footnote}
          </p>
          <StarBorder color="#1951fc" speed={5} className="w-fit shrink-0">
            <Button asChild size="lg" className="w-fit">
              <a href="#contacto">
                {resultados.button}
                <HugeiconsIcon icon={ArrowRight02Icon} size={16} />
              </a>
            </Button>
          </StarBorder>
        </Reveal>
      </div>
    </section>
  )
}
