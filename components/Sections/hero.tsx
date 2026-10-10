"use client"

import { useEffect, useRef, useState } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowRight02Icon,
  ArrowDown01Icon,
  CheckmarkCircle02Icon,
  Calendar03Icon,
  Message01Icon,
} from "@hugeicons/core-free-icons"

import { Button } from "@/components/ui/button"
import { Magnetic } from "@/components/magnetic"
import { NeuralOrb } from "@/components/neural-orb"
import {
  BlurText,
  GradientText,
  ShinyText,
} from "@/components/bits/text-effects"
import { hero } from "@/lib/content"
import { cn } from "@/lib/utils"
import { addScrollTask } from "@/lib/scroll-scheduler"

function RotatingWord({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), 2400)
    return () => clearInterval(id)
  }, [words.length])
  return (
    <span className="relative inline-grid h-[1.2em] overflow-hidden align-bottom">
      {words.map((word, i) => (
        <span
          key={word}
          aria-hidden={i !== index}
          className={cn(
            "col-start-1 row-start-1 block whitespace-nowrap transition-[transform,opacity] duration-700 ease-[var(--ease-out-expo)]",
            i === index
              ? "translate-y-0 opacity-100"
              : i === (index + words.length - 1) % words.length
                ? "-translate-y-full opacity-0"
                : "translate-y-full opacity-0"
          )}
        >
          {word}
        </span>
      ))}
    </span>
  )
}

/* Floating automation chips around the orb */
const chips = [
  {
    icon: CheckmarkCircle02Icon,
    title: "Cita confirmada",
    text: "Sin llamadas",
    className: "top-[10%] left-[0%] [animation-delay:-2s]",
  },
  {
    icon: Calendar03Icon,
    title: "Recordatorio enviado",
    text: "Agenda actualizada",
    className: "top-[42%] right-[-2%] [animation-delay:-6s]",
  },
  {
    icon: Message01Icon,
    title: "Duda derivada al equipo",
    text: "Una persona responde",
    className: "bottom-[8%] left-[6%] [animation-delay:-10s]",
  },
]

export function Hero() {
  const contentRef = useRef<HTMLDivElement>(null)
  const visualRef = useRef<HTMLDivElement>(null)

  // Content drifts up and fades; the orb drifts slower. Runs inside the
  // shared scroll scheduler and only reads window.scrollY.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    return addScrollTask({
      read: () => ({ y: window.scrollY, vh: window.innerHeight }),
      write: ({ y, vh }) => {
        if (y > vh * 1.2) return
        const p = Math.min(1, y / (vh * 0.9))
        if (contentRef.current) {
          contentRef.current.style.transform = `translate3d(0, ${(y * 0.25).toFixed(1)}px, 0)`
          contentRef.current.style.opacity = String(1 - p * 0.9)
        }
        if (visualRef.current) {
          visualRef.current.style.transform = `translate3d(0, ${(y * 0.12).toFixed(1)}px, 0)`
          visualRef.current.style.opacity = String(1 - p * 0.7)
        }
      },
    })
  }, [])

  return (
    <section
      data-theme="dark"
      className="grain relative isolate flex min-h-svh flex-col overflow-hidden bg-navy [--grain-opacity:0.16]"
    >
      {/* Deep gradient + horizon */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, #050f26 0%, #061b3c 40%, #0b2cb1 78%, #1951fc 92%, #ffffff 100%)",
        }}
      />
      {/* Perspective grid floor */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[62%] opacity-[0.22]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(165,243,252,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(165,243,252,0.35) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          transform: "perspective(600px) rotateX(62deg)",
          transformOrigin: "50% 100%",
          maskImage:
            "linear-gradient(180deg, transparent 0%, black 45%, black 80%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(180deg, transparent 0%, black 45%, black 80%, transparent 100%)",
        }}
      />
      {/* Soft lights */}
      <div
        aria-hidden
        className="animate-drift pointer-events-none absolute -top-40 right-[-6%] -z-10 h-[46rem] w-[46rem] rounded-full"
        style={{
          background:
            "radial-gradient(circle closest-side, rgba(25,81,252,0.55), rgba(6,195,214,0.12) 55%, transparent 100%)",
        }}
      />
      <div
        aria-hidden
        className="animate-drift pointer-events-none absolute top-1/3 left-[-18%] -z-10 h-[34rem] w-[34rem] rounded-full [animation-delay:-6s]"
        style={{
          background:
            "radial-gradient(circle closest-side, rgba(11,44,177,0.8), transparent 100%)",
        }}
      />
      {/* Scanline sweep */}
      <div
        aria-hidden
        className="animate-scan pointer-events-none absolute inset-x-0 top-0 -z-10 h-40 opacity-60"
        style={{
          background:
            "linear-gradient(180deg, transparent, rgba(6,195,214,0.10) 50%, transparent)",
        }}
      />

      <div className="relative z-10 container mx-auto grid flex-1 grid-cols-1 items-center gap-10 px-6 pt-32 pb-16 sm:px-10 lg:grid-cols-12 lg:px-16 lg:pt-28">
        {/* Copy */}
        <div ref={contentRef} className="will-change-transform lg:col-span-7">
          <p className="animate-fade-up mb-8 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[11px] font-bold tracking-[0.2em] text-cyan uppercase [animation-delay:120ms]">
            <span className="animate-pulse-dot size-1.5 rounded-full bg-cyan" />
            <ShinyText color="rgba(6,195,214,0.75)" shine="#ffffff" speed={3.5}>
              {hero.kicker}
            </ShinyText>
          </p>

          <h1 className="text-[2.9rem] leading-[0.98] font-bold tracking-[-0.035em] text-white sm:text-6xl md:text-7xl lg:text-[4.9rem] xl:text-[5.8rem]">
            {hero.title.map((line, i) =>
              i === hero.title.length - 1 ? (
                <span key={line} className="block">
                  <GradientText className="animate-blur-in inline-block py-[0.06em] leading-none">
                    <span style={{ animationDelay: `${180 + i * 160}ms` }}>
                      {line}
                    </span>
                  </GradientText>
                </span>
              ) : (
                <BlurText
                  key={line}
                  as="span"
                  text={line}
                  delay={180 + i * 160}
                  step={90}
                  className="block"
                />
              )
            )}
          </h1>

          <div className="animate-fade-up mt-8 flex flex-col gap-3 [animation-delay:620ms] sm:mt-10 sm:flex-row sm:items-end sm:gap-10">
            <p className="max-w-md text-lg leading-relaxed text-white/75 sm:text-xl">
              {hero.subtitle}
            </p>
            <p className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              <RotatingWord words={hero.words} />
            </p>
          </div>

          <div className="animate-fade-up mt-10 flex flex-wrap items-center gap-3 [animation-delay:780ms] sm:mt-12">
            <Magnetic>
              <Button asChild size="xl" variant="light">
                <a href="#contacto">
                  {hero.primary}
                  <HugeiconsIcon
                    icon={ArrowRight02Icon}
                    size={18}
                    className="transition-transform duration-300 group-hover/button:translate-x-1"
                  />
                </a>
              </Button>
            </Magnetic>
            <Magnetic strength={0.2}>
              <Button asChild size="xl" variant="outline-light">
                <a href="#mision">{hero.secondary}</a>
              </Button>
            </Magnetic>
          </div>
        </div>

        {/* Visual: AI core + floating chips */}
        <div
          ref={visualRef}
          className="animate-fade-up relative mx-auto aspect-square w-full max-w-[30rem] will-change-transform [animation-delay:400ms] lg:col-span-5 lg:max-w-none"
        >
          <NeuralOrb className="absolute inset-0" />
          {chips.map((c) => (
            <div
              key={c.title}
              className={cn(
                "animate-float absolute flex items-center gap-3 rounded-2xl border border-white/15 bg-navy/75 py-2.5 pr-4 pl-2.5 text-white shadow-[0_20px_50px_-20px_rgba(3,25,91,0.8)]",
                c.className
              )}
            >
              <span className="flex size-9 items-center justify-center rounded-xl bg-cyan/15 text-cyan">
                <HugeiconsIcon icon={c.icon} size={18} />
              </span>
              <span className="flex flex-col leading-tight">
                <span className="text-sm font-bold">{c.title}</span>
                <span className="text-[11px] text-white/60">{c.text}</span>
              </span>
              <span className="animate-pulse-dot ml-1 size-1.5 rounded-full bg-cyan" />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 container mx-auto flex items-end justify-between px-6 pb-8 sm:px-10 lg:px-16">
        <a
          href="#mision"
          className="animate-fade-up flex items-center gap-2 text-[11px] font-bold tracking-[0.22em] text-ink/70 uppercase [animation-delay:1000ms]"
        >
          Desliza
          <HugeiconsIcon
            icon={ArrowDown01Icon}
            size={14}
            className="animate-bounce"
          />
        </a>
        <p className="animate-fade-up hidden text-[11px] font-bold tracking-[0.22em] text-ink/60 uppercase [animation-delay:1000ms] sm:block">
          IA para pymes
        </p>
      </div>
    </section>
  )
}
