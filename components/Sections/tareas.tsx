"use client"

import { useEffect, useState } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Message01Icon,
  Calendar03Icon,
  LeftToRightListBulletIcon,
  Link04Icon,
  StarIcon,
  ArrowRight02Icon,
} from "@hugeicons/core-free-icons"

import { tareas } from "@/lib/content"
import { cn } from "@/lib/utils"
import { Reveal } from "@/components/reveal"
import { Kicker } from "@/components/section-heading"
import { useInView } from "@/hooks/use-in-view"
import { Parallax } from "@/components/motion/parallax"
import { DecryptedText } from "@/components/bits/text-effects"
import { StarBorder } from "@/components/bits/surfaces"

const icons = [
  Message01Icon,
  Calendar03Icon,
  LeftToRightListBulletIcon,
  Link04Icon,
  StarIcon,
]

export function Tareas() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const { ref, inView } = useInView<HTMLElement>({
    threshold: 0.35,
    once: false,
  })

  useEffect(() => {
    if (paused || !inView) return
    const id = setInterval(
      () => setActive((i) => (i + 1) % tareas.items.length),
      4200
    )
    return () => clearInterval(id)
  }, [paused, inView])

  const current = tareas.items[active]

  return (
    <section
      id="tareas"
      ref={ref}
      data-theme="dark"
      className="grain relative overflow-hidden bg-navy py-24 text-white [--grain-opacity:0.1] lg:py-36"
    >
      {/* ambient glow */}
      <div
        aria-hidden
        className="animate-drift pointer-events-none absolute -top-40 -right-40 h-[40rem] w-[40rem] rounded-full opacity-40"
        style={{
          background:
            "radial-gradient(circle closest-side, rgba(25,81,252,0.8), rgba(6,195,214,0.15) 55%, transparent 100%)",
        }}
      />

      <div className="relative z-[2] container mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-12">
          {/* Left column */}
          <div className="flex flex-col gap-8 lg:col-span-5">
            <Reveal>
              <Kicker tone="dark">{tareas.kicker}</Kicker>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="flex items-start gap-4 sm:gap-6">
                <Parallax as="span" speed={-0.12} className="inline-block">
                  <span className="bg-gradient-to-b from-brand-400 to-cyan bg-clip-text text-[7.5rem] leading-[0.85] font-bold tracking-[-0.06em] text-transparent sm:text-[10rem] lg:text-[12rem]">
                    {tareas.number}
                  </span>
                </Parallax>
                <span className="pt-2 text-3xl leading-[1.05] font-bold tracking-[-0.03em] text-balance sm:text-4xl lg:text-5xl">
                  {tareas.title}
                </span>
              </h2>
            </Reveal>
            <Reveal delay={180}>
              <p className="max-w-md text-lg text-white/70">
                {tareas.subtitle}
              </p>
            </Reveal>

            <Reveal delay={260}>
              <ul
                className="flex flex-col"
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
              >
                {tareas.items.map((t, i) => {
                  const isActive = i === active
                  return (
                    <li key={t.label}>
                      <button
                        onClick={() => setActive(i)}
                        onMouseEnter={() => setActive(i)}
                        aria-pressed={isActive}
                        className={cn(
                          "group flex w-full items-center gap-4 border-t border-white/10 py-4 text-left transition-colors duration-300",
                          i === tareas.items.length - 1 && "border-b"
                        )}
                      >
                        <span
                          className={cn(
                            "text-xs font-bold tabular-nums transition-colors duration-300",
                            isActive ? "text-cyan" : "text-white/35"
                          )}
                        >
                          0{i + 1}
                        </span>
                        <span
                          className={cn(
                            "text-xl font-semibold tracking-tight transition-[color,transform] duration-500 ease-[var(--ease-out-expo)] sm:text-2xl",
                            isActive
                              ? "translate-x-1 text-white"
                              : "text-white/55 group-hover:text-white"
                          )}
                        >
                          {t.label}
                        </span>
                        <span className="relative ml-auto h-px w-12 overflow-hidden rounded-full bg-white/10">
                          <span
                            className={cn(
                              "absolute inset-y-0 left-0 bg-cyan",
                              isActive && !paused && inView ? "w-full" : "w-0"
                            )}
                            style={{
                              transition:
                                isActive && !paused
                                  ? "width 4.2s linear"
                                  : "width 0.3s ease",
                            }}
                          />
                        </span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </Reveal>
          </div>

          {/* Right column: detail panel */}
          <div className="lg:col-span-7 lg:pl-6">
            <Reveal delay={200} className="lg:sticky lg:top-28">
              <div
                className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-7 sm:p-10"
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -top-24 -right-24 size-80 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle closest-side, rgba(25,81,252,0.35), transparent 100%)",
                  }}
                />
                <div
                  key={active}
                  className="animate-fade-up relative flex flex-col gap-6"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold tracking-[0.2em] text-cyan uppercase">
                      Tarea 0{active + 1} / 0{tareas.items.length}
                    </span>
                    <span className="flex size-11 items-center justify-center rounded-2xl bg-white/10 text-cyan">
                      <HugeiconsIcon icon={icons[active]} size={22} />
                    </span>
                  </div>
                  <h3 className="text-3xl leading-[1.05] font-bold tracking-[-0.03em] text-balance sm:text-4xl lg:text-5xl">
                    <DecryptedText text={current.title} speed={26} />
                  </h3>
                  <p className="text-lg text-white/65">{current.problem}</p>

                  <StarBorder
                    className="mt-2 block w-full rounded-2xl"
                    color="#06c3d6"
                    speed={5}
                  >
                    <div className="rounded-2xl bg-white p-6 text-ink sm:p-7">
                      <p className="mb-3 flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] text-brand-600 uppercase">
                        <span className="size-1.5 rounded-full bg-cyan" />
                        Cómo simplificarla
                      </p>
                      <p className="text-xl leading-snug font-bold tracking-tight sm:text-2xl">
                        {current.solution}
                      </p>
                    </div>
                  </StarBorder>

                  <p className="flex items-center gap-2 text-sm text-white/60">
                    <HugeiconsIcon
                      icon={ArrowRight02Icon}
                      size={14}
                      className="text-cyan"
                    />
                    {current.note}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal delay={120} className="mt-16 lg:mt-24">
          <div className="flex flex-col gap-6 rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.06] to-transparent p-7 sm:p-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col gap-2">
              <p className="text-[11px] font-bold tracking-[0.2em] text-cyan uppercase">
                Empieza por una
              </p>
              <p className="max-w-2xl text-2xl font-bold tracking-tight text-balance sm:text-3xl">
                Elige una tarea que repitas mucho.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {[
                { n: "01", t: "Frecuencia", q: "¿Cuántas veces la haces?" },
                { n: "02", t: "Tiempo", q: "¿Cuánto tardas cada vez?" },
              ].map((d) => (
                <div
                  key={d.n}
                  className="flex min-w-0 flex-col gap-1 rounded-2xl bg-white/[0.06] p-5 transition-colors duration-300 hover:bg-white/[0.1] sm:min-w-52"
                >
                  <span className="text-2xl font-bold text-cyan">{d.n}</span>
                  <span className="text-lg font-bold">{d.t}</span>
                  <span className="text-sm text-white/60">{d.q}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
