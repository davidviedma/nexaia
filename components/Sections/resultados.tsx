"use client"

import { useState } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight02Icon } from "@hugeicons/core-free-icons"

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

function StatTile({
  value,
  unit,
  label,
  detail,
  active,
  tone = "light",
  delay = 0,
}: {
  value: number
  unit: string
  label: string
  detail: string
  active: boolean
  tone?: "light" | "blue" | "dark"
  delay?: number
}) {
  const v = useCountUp(value, 900, active)
  return (
    <Reveal delay={delay} className="h-full">
      <div
        className={cn(
          "flex h-full flex-col gap-3 rounded-[1.75rem] border p-6 sm:p-7",
          tone === "light" && "border-line bg-surface text-ink",
          tone === "blue" && "border-brand-600 bg-brand-600 text-white",
          tone === "dark" && "border-navy bg-navy text-white"
        )}
      >
        <p
          className={cn(
            "text-[11px] font-bold tracking-[0.2em] uppercase",
            tone === "light" ? "text-brand-600" : "text-cyan"
          )}
        >
          {label}
        </p>
        <p className="flex items-baseline gap-1 text-5xl font-bold tracking-[-0.04em] sm:text-6xl">
          <span>{fmt(v)}</span>
          <span className="text-2xl font-bold sm:text-3xl">{unit}</span>
        </p>
        <p
          className={cn(
            "text-sm",
            tone === "light" ? "text-ink-soft" : "text-white/70"
          )}
        >
          {detail}
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
  const ratio = resultados.after.hours / resultados.before.hours

  return (
    <section id="resultados" className="relative bg-white py-24 lg:py-36">
      <div className="container mx-auto px-6 sm:px-10 lg:px-16">
        <div className="mb-14 flex flex-col gap-8 lg:mb-20 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            kicker={resultados.kicker}
            lines={resultados.title}
            text={resultados.text}
          />
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
          {/* Hero figure */}
          <Reveal className="lg:col-span-7">
            <div
              data-theme="dark"
              className="grain relative flex h-full flex-col justify-between gap-10 overflow-hidden rounded-[2rem] bg-navy p-7 text-white [--grain-opacity:0.1] sm:p-10"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -top-32 -right-32 size-96 rounded-full bg-brand-600/40 blur-3xl"
              />
              <div className="relative z-[2]">
                <p className="text-[11px] font-bold tracking-[0.2em] text-cyan uppercase">
                  Caso ilustrativo · Peluquería
                </p>
                <p className="mt-6 flex items-baseline gap-2 leading-none">
                  <span className="text-[6.5rem] font-bold tracking-[-0.06em] text-cyan sm:text-[9rem] lg:text-[11rem]">
                    {resultados.hero.prefix}
                    {Math.round(heroValue)}
                  </span>
                  <span className="text-4xl font-bold text-cyan sm:text-5xl">
                    {resultados.hero.suffix}
                  </span>
                </p>
                <p className="mt-4 max-w-md text-2xl font-bold tracking-tight text-balance sm:text-3xl">
                  {resultados.hero.label}
                </p>
                <p className="mt-2 max-w-md text-white/65">
                  {resultados.hero.detail}
                </p>
              </div>

              {/* Before / after bars */}
              <div className="relative z-[2] flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <div className="flex items-baseline justify-between text-sm">
                    <span className="text-white/70">
                      {resultados.before.label}
                    </span>
                    <span className="font-bold">
                      {resultados.before.hours} h / mes
                    </span>
                  </div>
                  <div className="h-3 w-full overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-white/60 transition-[width] duration-1000 ease-[var(--ease-out-expo)]"
                      style={{ width: inView ? "100%" : "0%" }}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-baseline justify-between text-sm">
                    <span className="text-white/70">
                      {resultados.after.label}
                    </span>
                    <span className="font-bold text-cyan">
                      {resultados.after.hours} h / mes
                    </span>
                  </div>
                  <div className="h-3 w-full overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-cyan transition-[width] [transition-delay:250ms] duration-1000 ease-[var(--ease-out-expo)]"
                      style={{ width: inView ? `${ratio * 100}%` : "0%" }}
                    />
                  </div>
                </div>
                <ol className="flex flex-wrap items-center gap-x-2 gap-y-1.5 pt-2 text-xs font-medium text-white/60">
                  {resultados.flow.map((step, i) => (
                    <li key={step} className="flex items-center gap-2">
                      {step}
                      {i < resultados.flow.length - 1 && (
                        <HugeiconsIcon
                          icon={ArrowRight02Icon}
                          size={11}
                          className="text-cyan"
                        />
                      )}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </Reveal>

          {/* KPI column */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
            <StatTile
              value={savedHours}
              unit="h"
              label={`Recuperadas al ${period}`}
              detail="En una sola tarea: confirmar citas."
              active={inView}
              tone="blue"
              delay={80}
            />
            <StatTile
              value={euros}
              unit="€"
              label={`Valor de ese tiempo al ${period}`}
              detail={`Valorando tu hora a ${resultados.hourRate} €.`}
              active={inView}
              delay={160}
            />
            <StatTile
              value={allTasksHours}
              unit="h"
              label={`Si aplicamos el patrón a ${resultados.tasks} tareas`}
              detail="Consultas, citas, seguimientos, datos y reseñas."
              active={inView}
              tone="dark"
              delay={240}
            />
          </div>
        </div>

        {/* What you do with those hours */}
        <Reveal
          delay={120}
          className="mt-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between"
        >
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span className="text-[11px] font-bold tracking-[0.2em] text-ink-soft uppercase">
              Esas horas sirven para
            </span>
            {resultados.uses.map((u) => (
              <span
                key={u}
                className="text-xl font-bold tracking-tight text-ink"
              >
                {u}
              </span>
            ))}
          </div>
          <StarBorder color="#1951fc" speed={5} className="w-fit">
            <Button asChild size="lg" className="w-fit">
              <a href="#contacto">
                Hagamos las cuentas de tu negocio
                <HugeiconsIcon icon={ArrowRight02Icon} size={16} />
              </a>
            </Button>
          </StarBorder>
        </Reveal>

        <Reveal delay={160}>
          <p className="mt-8 max-w-3xl text-xs leading-relaxed text-ink-soft/80">
            {resultados.footnote}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
