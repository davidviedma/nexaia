"use client"

import { useRef, type MouseEvent } from "react"
import { nosotros } from "@/lib/content"
import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"
import { Parallax } from "@/components/motion/parallax"
import { GlareHover } from "@/components/bits/surfaces"

export function Nosotros() {
  const cardRef = useRef<HTMLDivElement>(null)

  function onMove(e: MouseEvent<HTMLDivElement>) {
    const el = cardRef.current
    if (!el) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    el.style.transform = `perspective(1200px) rotateX(${-py * 6}deg) rotateY(${px * 8}deg)`
    el.style.setProperty("--sx", `${(px + 0.5) * 100}%`)
    el.style.setProperty("--sy", `${(py + 0.5) * 100}%`)
  }

  function onLeave() {
    const el = cardRef.current
    if (!el) return
    el.style.transform = "perspective(1200px) rotateX(0deg) rotateY(0deg)"
  }

  return (
    <section id="nosotros" className="relative bg-surface py-24 lg:py-36">
      <div className="container mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col gap-8 lg:col-span-6">
            <SectionHeading
              kicker={nosotros.kicker}
              lines={["Dos emprendedores.", "Una idea muy clara."]}
              text={nosotros.text}
            />
            <Reveal delay={300}>
              <ul className="flex flex-wrap gap-x-5 gap-y-2">
                {nosotros.values.map((v, i) => (
                  <li
                    key={v}
                    className="text-xl font-bold tracking-tight text-ink"
                    style={{ transitionDelay: `${i * 80}ms` }}
                  >
                    {v}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={380}>
              <p className="text-lg font-semibold text-brand-600">
                {nosotros.question}
              </p>
            </Reveal>
          </div>

          <Reveal variant="scale" delay={160} className="lg:col-span-6">
            <Parallax speed={0.08}>
              <GlareHover
                className="rounded-[2.5rem]"
                opacity={0.28}
                duration={900}
              >
                <div
                  ref={cardRef}
                  onMouseMove={onMove}
                  onMouseLeave={onLeave}
                  className="grain relative flex min-h-[22rem] items-end overflow-hidden rounded-[2.5rem] bg-brand-600 p-8 text-white transition-transform duration-500 ease-[var(--ease-out-expo)] will-change-transform [--grain-opacity:0.16] [--sx:50%] [--sy:50%] sm:min-h-[28rem] sm:p-12"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-90"
                    style={{
                      background:
                        "radial-gradient(600px circle at var(--sx) var(--sy), rgba(6,195,214,0.45), rgba(11,44,177,0.0) 55%), linear-gradient(160deg, #1951fc 0%, #0b2cb1 70%, #03195b 100%)",
                    }}
                  />
                  {/* Decorative node constellation echoing the logo */}
                  <svg
                    aria-hidden
                    viewBox="0 0 200 200"
                    className="pointer-events-none absolute top-8 right-8 size-32 opacity-70 sm:size-44"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                  >
                    <path
                      d="M30 150 L80 60 L130 140 L170 40"
                      className="text-white/60"
                    />
                    <circle
                      cx="30"
                      cy="150"
                      r="6"
                      className="fill-cyan stroke-none"
                    />
                    <circle
                      cx="80"
                      cy="60"
                      r="6"
                      className="fill-white stroke-none"
                    />
                    <circle
                      cx="130"
                      cy="140"
                      r="6"
                      className="fill-cyan stroke-none"
                    />
                    <circle
                      cx="170"
                      cy="40"
                      r="8"
                      className="fill-white stroke-none"
                    >
                      <animate
                        attributeName="r"
                        values="8;11;8"
                        dur="2.6s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  </svg>

                  <blockquote className="relative z-[2] max-w-xl">
                    <p className="text-3xl leading-[1.08] font-bold tracking-[-0.03em] text-balance sm:text-5xl">
                      {nosotros.quote}
                    </p>
                    <footer className="mt-6 flex items-center gap-3 text-sm font-semibold text-white/80">
                      <span className="h-px w-8 bg-cyan" />
                      Nexa IA
                    </footer>
                  </blockquote>
                </div>
              </GlareHover>
            </Parallax>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
