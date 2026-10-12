"use client"

import Image from "next/image"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  HeadsetIcon,
  Settings02Icon,
  HandshakeIcon,
} from "@hugeicons/core-free-icons"

import { nosotros } from "@/lib/content"
import { founders } from "@/lib/site"
import { cn } from "@/lib/utils"
import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"
import { ProfileCard } from "@/components/bits/profile-card"

const valueIcons = [HeadsetIcon, Settings02Icon, HandshakeIcon]

/* ── Generative art for the tiles (until there are photos) ──── */

function NodesArt() {
  const nodes = [
    [22, 70],
    [40, 34],
    [58, 62],
    [78, 26],
    [86, 72],
    [50, 86],
  ]
  const edges = [
    [0, 1],
    [1, 2],
    [2, 3],
    [2, 4],
    [0, 5],
    [5, 4],
    [1, 3],
  ]
  return (
    <svg
      aria-hidden
      viewBox="0 0 100 100"
      className="absolute inset-0 size-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="founder-bg-a" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0b2cb1" />
          <stop offset="1" stopColor="#03195b" />
        </linearGradient>
      </defs>
      <rect width="100" height="100" fill="url(#founder-bg-a)" />
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a][0]}
          y1={nodes[a][1]}
          x2={nodes[b][0]}
          y2={nodes[b][1]}
          stroke="rgba(165,243,252,0.45)"
          strokeWidth="0.5"
        />
      ))}
      {nodes.map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={i % 2 ? 2.2 : 1.6}
          fill={i % 2 ? "#06c3d6" : "#ffffff"}
          style={{
            animation: "pulse-dot 3s ease-in-out infinite",
            animationDelay: `${i * 0.4}s`,
            transformBox: "fill-box",
            transformOrigin: "center",
          }}
        />
      ))}
    </svg>
  )
}

function RingsArt() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, #1951fc 0%, #0b2cb1 60%, #03195b 100%)",
      }}
    >
      {[0, 1, 2, 3].map((i) => (
        <span
          key={i}
          className="absolute rounded-full border border-cyan-soft/40"
          style={{
            width: `${28 + i * 22}%`,
            aspectRatio: "1",
            animation: "float 6s ease-in-out infinite",
            animationDelay: `${i * 0.6}s`,
            opacity: 0.9 - i * 0.18,
          }}
        />
      ))}
      <span className="absolute size-5 rounded-full bg-cyan shadow-[0_0_0_10px_rgba(6,195,214,0.2)]" />
    </div>
  )
}

function FounderCard({
  f,
  index,
}: {
  f: (typeof founders)[number]
  index: number
}) {
  const initial = f.name ? f.name[0] : "N"
  return (
    <ProfileCard
      intro={index === 0}
      footer={
        <>
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-600 to-cyan text-sm font-bold text-white">
            {initial}
          </span>
          <span className="flex min-w-0 flex-col">
            <span className="truncate text-sm font-bold text-ink">
              {f.name || f.role}
            </span>
            <span className="truncate text-xs text-ink-soft">
              {f.name ? f.role : f.focus}
            </span>
          </span>
        </>
      }
    >
      {f.photo ? (
        <Image
          src={f.photo}
          alt={f.name || f.role}
          fill
          sizes="(min-width: 1024px) 420px, 90vw"
          className="object-cover"
        />
      ) : f.art === "nodes" ? (
        <NodesArt />
      ) : (
        <RingsArt />
      )}
      {/* scrim + caption */}
      <span
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-1/2"
        style={{
          background:
            "linear-gradient(to top, rgba(3,25,91,0.85), rgba(3,25,91,0))",
        }}
      />
      <span className="absolute right-5 bottom-5 left-5 flex flex-col gap-1 text-white">
        <span className="text-2xl font-bold tracking-tight sm:text-3xl">
          {f.focus}
        </span>
        <span className="text-sm text-white/75">{f.text}</span>
      </span>
    </ProfileCard>
  )
}

export function Nosotros() {
  return (
    <section id="nosotros" className="relative bg-surface py-24 lg:py-32">
      <div className="container mx-auto px-6 sm:px-10 lg:px-16">
        <SectionHeading
          kicker={nosotros.kicker}
          lines={nosotros.title}
          align="center"
          className="mx-auto mb-12 lg:mb-16"
        />

        <div className="mx-auto grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
          {founders.map((f, i) => (
            <Reveal key={f.focus} variant="scale" delay={i * 140}>
              <FounderCard f={f} index={i} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={200} className="mt-14 flex flex-col items-center gap-8">
          <p className="max-w-xl text-center text-2xl font-bold tracking-tight text-balance text-ink sm:text-3xl">
            {nosotros.quote}
          </p>
          <ul className="flex flex-wrap justify-center gap-3">
            {nosotros.values.map((v, i) => (
              <li
                key={v.title}
                className={cn(
                  "flex items-center gap-3 rounded-full border border-line bg-white py-2 pr-5 pl-2 transition-colors duration-300 hover:border-brand-600"
                )}
              >
                <span className="flex size-9 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                  <HugeiconsIcon icon={valueIcons[i]} size={18} />
                </span>
                <span className="flex flex-col leading-tight">
                  <span className="text-sm font-bold text-ink">{v.title}</span>
                  <span className="text-xs text-ink-soft">{v.text}</span>
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
