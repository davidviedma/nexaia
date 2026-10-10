"use client"

import { useEffect, useRef, useState } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight02Icon, ArrowDown01Icon } from "@hugeicons/core-free-icons"

import { Button } from "@/components/ui/button"
import { Magnetic } from "@/components/magnetic"
import { NodeField } from "@/components/node-field"
import { hero } from "@/lib/content"
import { cn } from "@/lib/utils"

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

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const el = sectionRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty("--glow-x", `${e.clientX - rect.left}px`)
    el.style.setProperty("--glow-y", `${e.clientY - rect.top}px`)
  }

  function handleMouseLeave() {
    sectionRef.current?.style.setProperty("--glow-x", "-9999px")
    sectionRef.current?.style.setProperty("--glow-y", "-9999px")
  }

  return (
    <section
      ref={sectionRef}
      data-theme="dark"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="grain relative isolate flex min-h-svh flex-col overflow-hidden bg-navy [--glow-x:-9999px] [--glow-y:-9999px] [--grain-opacity:0.18]"
    >
      {/* Gradient: deep navy → electric blue → white, like the feed */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, #061b3c 0%, #03195b 32%, #0b2cb1 58%, #1951fc 76%, #3781fc 88%, #ffffff 100%)",
        }}
      />
      {/* Soft drifting blobs */}
      <div
        aria-hidden
        className="animate-drift pointer-events-none absolute -top-40 right-[-10%] -z-10 h-[46rem] w-[46rem] rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 40% 40%, rgba(55,129,252,0.55), rgba(6,195,214,0.18) 45%, transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="animate-drift pointer-events-none absolute top-1/3 left-[-20%] -z-10 h-[34rem] w-[34rem] rounded-full opacity-50 blur-3xl [animation-delay:-6s]"
        style={{
          background:
            "radial-gradient(circle, rgba(11,44,177,0.9), transparent 65%)",
        }}
      />
      {/* Cursor glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-70"
        style={{
          background:
            "radial-gradient(260px circle at var(--glow-x) var(--glow-y), rgba(6,195,214,0.22), transparent 70%)",
        }}
      />

      <NodeField className="-z-10 opacity-80" />

      <div className="relative z-10 container mx-auto flex flex-1 flex-col justify-center px-6 pt-32 pb-20 sm:px-10 lg:px-16 lg:pt-36">
        <div className="max-w-5xl">
          <p className="animate-fade-up mb-8 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[11px] font-bold tracking-[0.2em] text-cyan uppercase backdrop-blur-sm [animation-delay:120ms]">
            <span className="animate-pulse-dot size-1.5 rounded-full bg-cyan" />
            {hero.kicker}
          </p>

          <h1 className="text-[2.9rem] leading-[0.98] font-bold tracking-[-0.035em] text-white sm:text-6xl md:text-7xl lg:text-[6.2rem]">
            {hero.title.map((line, i) => (
              <span key={line} className="mask-line is-visible block">
                <span
                  className="animate-rise block"
                  style={{ animationDelay: `${180 + i * 110}ms` }}
                >
                  {line}
                </span>
              </span>
            ))}
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
