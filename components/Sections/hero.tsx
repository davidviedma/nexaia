"use client"

import { useEffect, useRef, useState } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import Image from "next/image"
import {
  ArrowRight02Icon,
  ArrowDown01Icon,
  BrowserIcon,
  LeftToRightListBulletIcon,
  Clock01Icon,
  Message01Icon,
} from "@hugeicons/core-free-icons"

import { Button } from "@/components/ui/button"
import { Magnetic } from "@/components/magnetic"
import { DotGrid } from "@/components/bits/dot-grid"
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

/* Feature nodes around the Nexa core */
const features = [
  {
    icon: BrowserIcon,
    title: "Web",
    text: "Captar clientes",
    pos: "lg:top-0 lg:left-0",
    path: "M 300 165 L 500 310",
    delay: "0s",
  },
  {
    icon: LeftToRightListBulletIcon,
    title: "CRM",
    text: "Hacer seguimiento",
    pos: "lg:top-0 lg:right-0",
    path: "M 700 165 L 500 310",
    delay: "-1.2s",
  },
  {
    icon: Clock01Icon,
    title: "Automatización",
    text: "Agilizar tareas",
    pos: "lg:bottom-0 lg:left-0",
    path: "M 300 455 L 500 310",
    delay: "-2.4s",
  },
  {
    icon: Message01Icon,
    title: "Redes",
    text: "Comunicar mejor",
    pos: "lg:bottom-0 lg:right-0",
    path: "M 700 455 L 500 310",
    delay: "-3.6s",
  },
]

function Core() {
  return (
    <div className="relative flex size-44 items-center justify-center sm:size-52 lg:size-56">
      {/* rings */}
      <span
        aria-hidden
        className="absolute inset-0 rounded-full border border-white/15"
      />
      <span
        aria-hidden
        className="absolute inset-[12%] rounded-full border border-white/10"
      />
      <span
        aria-hidden
        className="animate-spin-slow absolute inset-[-10%] rounded-full"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0deg, rgba(6,195,214,0.55) 40deg, transparent 80deg)",
          WebkitMask:
            "radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 1px))",
          mask: "radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 1px))",
        }}
      />
      <span
        aria-hidden
        className="absolute inset-[22%] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(6,195,214,0.35), rgba(25,81,252,0.15) 55%, transparent 75%)",
        }}
      />
      {/* disc with logo */}
      <span className="relative flex size-[56%] items-center justify-center overflow-hidden rounded-full border border-cyan/40 bg-[#061329] shadow-[0_0_60px_-10px_rgba(6,195,214,0.55)]">
        <Image
          src="/logo-icon.png"
          alt="Nexa IA"
          width={160}
          height={160}
          priority
          className="size-[82%] object-contain"
        />
      </span>
    </div>
  )
}

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
        if (window.innerWidth < 1024) return
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
      {/* Interactive dot grid */}
      <DotGrid
        className="-z-10 opacity-80"
        gap={32}
        dotSize={2.5}
        baseColor="rgba(165,243,252,0.16)"
        activeColor="#06c3d6"
        proximity={150}
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
        <div ref={contentRef} className="will-change-transform lg:col-span-6">
          <p className="animate-fade-up mb-8 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[11px] font-bold tracking-[0.2em] text-cyan uppercase [animation-delay:120ms]">
            <span className="animate-pulse-dot size-1.5 rounded-full bg-cyan" />
            <ShinyText color="rgba(6,195,214,0.75)" shine="#ffffff" speed={3.5}>
              {hero.kicker}
            </ShinyText>
          </p>

          <h1 className="text-[2.9rem] leading-[0.98] font-bold tracking-[-0.035em] text-white sm:text-6xl md:text-7xl lg:text-[4.4rem] xl:text-[5.2rem]">
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

        {/* Visual: Nexa core with the four features wired to it */}
        <div
          ref={visualRef}
          className="animate-fade-up relative will-change-transform [animation-delay:400ms] lg:col-span-6"
        >
          {/* Mobile: core + 2×2 grid. Desktop: corner cards around the core. */}
          <div className="grid grid-cols-2 gap-3 lg:relative lg:block lg:aspect-[1000/620]">
            <div className="col-span-2 flex justify-center py-2 lg:absolute lg:top-1/2 lg:left-1/2 lg:z-[2] lg:-translate-x-1/2 lg:-translate-y-1/2 lg:py-0">
              <Core />
            </div>

            {/* Connectors with travelling light */}
            <svg
              aria-hidden
              viewBox="0 0 1000 620"
              preserveAspectRatio="none"
              className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
            >
              <defs>
                <linearGradient id="hero-link" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="rgba(6,195,214,0.15)" />
                  <stop offset="1" stopColor="rgba(6,195,214,0.7)" />
                </linearGradient>
              </defs>
              {features.map((f) => (
                <g key={f.title}>
                  <path
                    d={f.path}
                    stroke="url(#hero-link)"
                    strokeWidth="1.5"
                    fill="none"
                    vectorEffect="non-scaling-stroke"
                  />
                  <circle r="4" fill="#ffffff">
                    <animateMotion
                      dur="2.8s"
                      begin={f.delay}
                      repeatCount="indefinite"
                      path={f.path}
                      keyPoints="0;1"
                      keyTimes="0;1"
                      calcMode="linear"
                    />
                  </circle>
                  <circle r="9" fill="rgba(6,195,214,0.25)">
                    <animateMotion
                      dur="2.8s"
                      begin={f.delay}
                      repeatCount="indefinite"
                      path={f.path}
                    />
                  </circle>
                </g>
              ))}
            </svg>

            {features.map((f) => (
              <div
                key={f.title}
                className={cn(
                  "animate-float flex min-w-0 flex-col gap-3 rounded-2xl border border-white/12 bg-[#071a3d]/80 p-3.5 text-white shadow-[0_24px_60px_-28px_rgba(3,25,91,0.9)] sm:p-4 lg:absolute lg:w-[36%] lg:p-5",
                  f.pos
                )}
                style={{ animationDelay: f.delay, animationDuration: "9s" }}
              >
                <div className="flex items-center gap-3">
                  <span className="flex size-9 items-center justify-center rounded-xl bg-cyan/12 text-cyan">
                    <HugeiconsIcon icon={f.icon} size={18} />
                  </span>
                  <span className="text-lg font-bold tracking-tight">
                    {f.title}
                  </span>
                </div>
                <span className="text-sm text-white/70">{f.text}</span>
              </div>
            ))}
          </div>
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
