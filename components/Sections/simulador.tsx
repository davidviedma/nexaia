"use client"

import { useMemo, useState } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight02Icon } from "@hugeicons/core-free-icons"

import { simulador } from "@/lib/content"
import { cn } from "@/lib/utils"
import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"
import { Button } from "@/components/ui/button"
import { useCountUp } from "@/hooks/use-count-up"
import { useInView } from "@/hooks/use-in-view"

/* Model from the illustrative case:
 *   before  = tasks × minutes
 *   after   = tasks × 0.5 min (quick review) + 80 min (exceptions & supervision)
 */
const REVIEW_MIN = 0.5
const SUPERVISION_MIN = 80

function Slider({
  label,
  value,
  min,
  max,
  step = 1,
  unit,
  onChange,
}: {
  label: string
  value: number
  min: number
  max: number
  step?: number
  unit: string
  onChange: (v: number) => void
}) {
  const fill = ((value - min) / (max - min)) * 100
  return (
    <label className="flex flex-col gap-3">
      <span className="flex items-baseline justify-between">
        <span className="text-sm font-semibold text-ink">{label}</span>
        <span className="text-lg font-bold text-brand-600 tabular-nums">
          {value}
          <span className="ml-1 text-xs font-semibold text-ink-soft">
            {unit}
          </span>
        </span>
      </span>
      <input
        type="range"
        className="nexa-range"
        data-cursor="Mover"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ ["--fill" as string]: `${fill}%` }}
        aria-label={label}
      />
    </label>
  )
}

function fmtHours(min: number) {
  const h = min / 60
  return h >= 10
    ? Math.round(h).toString()
    : (Math.round(h * 10) / 10).toString().replace(".", ",")
}

export function Simulador() {
  const [tasks, setTasks] = useState(200)
  const [minutes, setMinutes] = useState(3)
  const [rate, setRate] = useState(20)
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.3 })

  const { before, after, saved, euros } = useMemo(() => {
    const before = tasks * minutes
    const after = Math.min(before, tasks * REVIEW_MIN + SUPERVISION_MIN)
    const saved = Math.max(0, before - after)
    const euros = Math.round((saved / 60) * rate)
    return { before, after, saved, euros }
  }, [tasks, minutes, rate])

  const animBefore = useCountUp(before, 700, inView)
  const animAfter = useCountUp(after, 700, inView)
  const animSaved = useCountUp(saved, 800, inView)
  const animEuros = useCountUp(euros, 900, inView)
  const ratio = before > 0 ? after / before : 0

  return (
    <section id="simulador" className="relative bg-white py-24 lg:py-36">
      <div className="container mx-auto px-6 sm:px-10 lg:px-16">
        <SectionHeading
          kicker={simulador.kicker}
          lines={["¿Y si confirmar citas", "ocupara menos tiempo?"]}
          text={simulador.text}
          className="mb-14 lg:mb-20"
        />

        <div ref={ref} className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Controls */}
          <Reveal className="lg:col-span-5">
            <div className="flex h-full flex-col gap-8 rounded-[2rem] border border-line bg-surface p-7 sm:p-9">
              <p className="text-[11px] font-bold tracking-[0.2em] text-brand-600 uppercase">
                Tus números
              </p>
              <Slider
                label="Confirmaciones al mes"
                value={tasks}
                min={20}
                max={600}
                step={10}
                unit="al mes"
                onChange={setTasks}
              />
              <Slider
                label="Minutos por confirmación"
                value={minutes}
                min={1}
                max={15}
                unit="min"
                onChange={setMinutes}
              />
              <Slider
                label="Cuánto vale tu hora"
                value={rate}
                min={10}
                max={80}
                step={5}
                unit="€/h"
                onChange={setRate}
              />

              <div className="mt-auto flex flex-col gap-2 border-t border-line pt-6">
                <p className="text-[11px] font-bold tracking-[0.2em] text-ink-soft uppercase">
                  Un flujo conectado a la agenda
                </p>
                <ol className="flex flex-wrap items-center gap-x-2 gap-y-1.5 text-sm font-medium text-ink">
                  {simulador.flow.map((step, i) => (
                    <li key={step} className="flex items-center gap-2">
                      <span
                        className={cn(
                          "flex size-5 items-center justify-center rounded-full text-[10px] font-bold text-white",
                          i === simulador.flow.length - 1
                            ? "bg-cyan text-ink"
                            : "bg-brand-600"
                        )}
                      >
                        {i + 1}
                      </span>
                      {step}
                      {i < simulador.flow.length - 1 && (
                        <HugeiconsIcon
                          icon={ArrowRight02Icon}
                          size={12}
                          className="text-ink-soft/60"
                        />
                      )}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </Reveal>

          {/* Results */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-7">
            <Reveal delay={80}>
              <div className="flex h-full flex-col gap-3 rounded-[2rem] border border-line bg-surface p-7 sm:p-8">
                <p className="text-[11px] font-bold tracking-[0.2em] text-ink-soft uppercase">
                  Antes · todo a mano
                </p>
                <p className="text-5xl font-bold tracking-[-0.04em] text-ink tabular-nums sm:text-6xl">
                  {fmtHours(animBefore)} h
                </p>
                <p className="text-sm text-ink-soft">
                  {tasks} confirmaciones × {minutes} min al mes
                </p>
                <div className="mt-auto h-3 w-full overflow-hidden rounded-full bg-line">
                  <div className="h-full w-full rounded-full bg-ink/70" />
                </div>
              </div>
            </Reveal>

            <Reveal delay={160}>
              <div className="relative flex h-full flex-col gap-3 overflow-hidden rounded-[2rem] bg-brand-600 p-7 text-white sm:p-8">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -top-16 -right-16 size-48 rounded-full bg-cyan/30 blur-3xl"
                />
                <p className="relative text-[11px] font-bold tracking-[0.2em] text-white/70 uppercase">
                  Después · revisión y supervisión
                </p>
                <p className="relative text-5xl font-bold tracking-[-0.04em] tabular-nums sm:text-6xl">
                  {fmtHours(animAfter)} h
                </p>
                <p className="relative text-sm text-white/75">
                  {tasks} revisiones × 30 s + {SUPERVISION_MIN} min de
                  excepciones
                </p>
                <div className="relative mt-auto h-3 w-full overflow-hidden rounded-full bg-white/20">
                  <div
                    className="h-full rounded-full bg-cyan transition-[width] duration-700 ease-[var(--ease-out-expo)]"
                    style={{ width: `${Math.max(4, ratio * 100)}%` }}
                  />
                </div>
              </div>
            </Reveal>

            <Reveal delay={240} className="sm:col-span-2">
              <div
                data-theme="dark"
                className="grain relative overflow-hidden rounded-[2rem] bg-navy p-7 text-white [--grain-opacity:0.1] sm:p-9"
              >
                <div className="relative z-[2] grid grid-cols-1 gap-8 md:grid-cols-2 md:items-end">
                  <div className="flex flex-col gap-2">
                    <p className="text-[11px] font-bold tracking-[0.2em] text-cyan uppercase">
                      Disponibles para otras tareas
                    </p>
                    <p className="text-6xl font-bold tracking-[-0.04em] text-cyan tabular-nums sm:text-7xl">
                      {fmtHours(animSaved)} h
                    </p>
                    <p className="text-white/65">
                      al mes · {fmtHours(before)} h − {fmtHours(after)} h
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 md:text-right">
                    <p className="text-[11px] font-bold tracking-[0.2em] text-white/60 uppercase">
                      Valor teórico de ese tiempo
                    </p>
                    <p className="text-6xl font-bold tracking-[-0.04em] tabular-nums sm:text-7xl">
                      {Math.round(animEuros).toLocaleString("es-ES")} €
                    </p>
                    <p className="text-white/65">
                      {fmtHours(saved)} h × {rate} € al mes
                    </p>
                  </div>
                </div>
                <p className="relative z-[2] mt-8 border-t border-white/10 pt-5 text-sm text-white/55">
                  {simulador.disclaimer}
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal
          delay={120}
          className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="max-w-xl text-base text-ink-soft">
            <span className="font-semibold text-ink">El equipo sigue ahí.</span>{" "}
            {simulador.teamNote}
          </p>
          <Button asChild size="lg" className="w-fit">
            <a href="#contacto">
              Hagamos las cuentas de tu negocio
              <HugeiconsIcon icon={ArrowRight02Icon} size={16} />
            </a>
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
