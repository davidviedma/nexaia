"use client"

import { HugeiconsIcon } from "@hugeicons/react"
import {
  CheckListIcon,
  UserMultiple02Icon,
  Target02Icon,
} from "@hugeicons/core-free-icons"

import { mision } from "@/lib/content"
import { cn } from "@/lib/utils"
import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"
import { SpotlightCard } from "@/components/bits/surfaces"
import { useCountUp } from "@/hooks/use-count-up"
import { useInView } from "@/hooks/use-in-view"

const icons = {
  sencilla: CheckListIcon,
  cercana: UserMultiple02Icon,
  util: Target02Icon,
} as const

/* Tiny living illustrations, one per pillar */

function SencillaArt() {
  // Three steps lighting up one after another.
  return (
    <div className="flex items-center gap-2">
      {[0, 1, 2].map((i) => (
        <span key={i} className="flex items-center gap-2">
          <span
            className="size-2.5 rounded-full bg-brand-600"
            style={{
              animation: "pulse-dot 2.4s ease-in-out infinite",
              animationDelay: `${i * 0.5}s`,
            }}
          />
          {i < 2 && <span className="h-px w-6 bg-line" />}
        </span>
      ))}
    </div>
  )
}

function CercanaArt() {
  // Two overlapping circles: you and Nexa.
  return (
    <div className="relative flex h-5 w-14 items-center">
      <span className="absolute left-0 size-5 rounded-full border-2 border-brand-600 bg-white" />
      <span
        className="absolute left-5 size-5 rounded-full bg-cyan"
        style={{ animation: "float 4s ease-in-out infinite" }}
      />
    </div>
  )
}

function UtilArt() {
  // A bar that grows towards the target.
  return (
    <div className="flex h-5 w-16 items-end gap-1">
      {[40, 65, 100].map((h, i) => (
        <span
          key={h}
          className={cn(
            "w-3 origin-bottom rounded-sm",
            i === 2 ? "bg-cyan" : "bg-brand-100"
          )}
          style={{
            height: `${h}%`,
            animation: "loadbar 2.8s var(--ease-out-expo) infinite",
            animationDelay: `${i * 0.25}s`,
          }}
        />
      ))}
    </div>
  )
}

const art = {
  sencilla: SencillaArt,
  cercana: CercanaArt,
  util: UtilArt,
} as const

/* "2 de cada 10": twenty cells, the lit ones follow the percentage */

function Cells({ value, active }: { value: number; active: boolean }) {
  const total = 20
  const lit = Math.round((value / 100) * total)
  return (
    <div
      aria-hidden
      className="grid w-full grid-cols-10 gap-1.5 sm:gap-2"
      style={{ gridTemplateColumns: "repeat(10, minmax(0, 1fr))" }}
    >
      {Array.from({ length: total }).map((_, i) => {
        const on = i < lit
        return (
          <span
            key={i}
            className={cn(
              "aspect-square rounded-md transition-[background-color,transform] duration-500 ease-[var(--ease-out-expo)]",
              on ? "bg-cyan" : "bg-white/15",
              active ? "scale-100" : "scale-50"
            )}
            style={{ transitionDelay: `${i * 35}ms` }}
          />
        )
      })}
    </div>
  )
}

export function Mision() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.35 })
  const v = useCountUp(mision.stat.value, 1200, inView)

  return (
    <section id="mision" className="relative bg-white py-24 lg:py-32">
      <div className="container mx-auto px-6 sm:px-10 lg:px-16">
        <SectionHeading
          kicker={mision.kicker}
          lines={mision.title}
          align="center"
          className="mx-auto mb-12 lg:mb-16"
        />

        {/* Three pillars, side by side */}
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {mision.pillars.map((p, i) => {
            const Icon = icons[p.id as keyof typeof icons]
            const Art = art[p.id as keyof typeof art]
            return (
              <Reveal key={p.id} as="li" delay={i * 110} className="h-full">
                <SpotlightCard
                  color="rgba(25,81,252,0.10)"
                  className="group flex h-full flex-col items-center gap-6 rounded-[1.75rem] border border-line bg-surface px-6 py-9 text-center transition-colors duration-300 hover:border-brand-100"
                >
                  <span className="flex size-14 items-center justify-center rounded-2xl bg-white text-brand-600 shadow-sm ring-1 ring-line transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-1">
                    <HugeiconsIcon icon={Icon} size={26} />
                  </span>
                  <span className="flex flex-col items-center gap-1.5">
                    <span className="text-2xl font-bold tracking-tight text-ink">
                      {p.title}
                    </span>
                    <span className="text-base text-ink-soft">{p.text}</span>
                  </span>
                  <span className="mt-auto flex h-6 items-center">
                    <Art />
                  </span>
                </SpotlightCard>
              </Reveal>
            )
          })}
        </ul>

        {/* The one number that matters, drawn as cells */}
        <Reveal delay={200} className="mt-4">
          <div
            ref={ref}
            data-theme="dark"
            className="relative grid grid-cols-1 items-center gap-8 overflow-hidden rounded-[1.75rem] bg-navy px-7 py-8 text-white sm:px-9 lg:grid-cols-12 lg:gap-10"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -top-24 -left-24 size-72 rounded-full"
              style={{
                background:
                  "radial-gradient(circle closest-side, rgba(25,81,252,0.55), transparent 100%)",
              }}
            />
            <p className="relative flex items-baseline gap-1 leading-none lg:col-span-3">
              <span className="text-6xl font-bold tracking-[-0.05em] text-cyan tabular-nums sm:text-7xl">
                {v.toFixed(1).replace(".", ",")}
              </span>
              <span className="text-3xl font-bold text-cyan">
                {mision.stat.suffix}
              </span>
            </p>
            <div className="relative lg:col-span-5">
              <Cells value={mision.stat.value} active={inView} />
            </div>
            <div className="relative flex flex-col gap-1.5 lg:col-span-4">
              <p className="text-xl font-bold tracking-tight text-balance">
                {mision.stat.label}
              </p>
              <p className="text-sm text-white/70">{mision.stat.hint}</p>
              <p className="mt-2 text-[11px] font-semibold tracking-[0.14em] text-white/40 uppercase">
                {mision.stat.source}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
