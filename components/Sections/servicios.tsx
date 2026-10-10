"use client"

import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons"

import { servicios, type Servicio } from "@/lib/content"
import { cn } from "@/lib/utils"
import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"
import { BentoCard, BentoGrid } from "@/components/bits/magic-bento"
import { LogoLoop } from "@/components/bits/logo-loop"

/* ── Tiny living illustrations, one per service ─────────────── */

function WebIllustration() {
  return (
    <div className="relative h-24 w-full overflow-hidden rounded-xl border border-line bg-white shadow-sm">
      <div className="flex items-center gap-1.5 border-b border-line px-3 py-2">
        <span className="size-1.5 rounded-full bg-brand-600" />
        <span className="size-1.5 rounded-full bg-brand-600/60" />
        <span className="size-1.5 rounded-full bg-cyan" />
        <span className="ml-2 h-1.5 flex-1 rounded-full bg-surface" />
      </div>
      <div className="space-y-2 p-3">
        <div className="h-2 w-2/3 origin-left rounded-full bg-ink/80 transition-transform duration-700 group-hover:scale-x-110" />
        <div className="h-1.5 w-1/2 rounded-full bg-line" />
        <div
          className="h-1.5 w-3/4 origin-left rounded-full bg-brand-600"
          style={{ animation: "loadbar 2.4s var(--ease-out-expo) infinite" }}
        />
      </div>
    </div>
  )
}

function CrmIllustration() {
  const rows = [
    { w: "w-3/5", s: "bg-cyan" },
    { w: "w-2/5", s: "bg-brand-600" },
    { w: "w-1/2", s: "bg-brand-400" },
  ]
  return (
    <div className="relative flex h-24 w-full flex-col justify-center gap-2 rounded-xl border border-line bg-white p-3 shadow-sm">
      {rows.map((r, i) => (
        <div
          key={i}
          className="flex items-center gap-2 rounded-md bg-surface px-2 py-1.5"
          style={{
            animation: "slide-row 3s ease-in-out infinite",
            animationDelay: `${i * 0.4}s`,
          }}
        >
          <span className={cn("size-2 rounded-full", r.s)} />
          <span className={cn("h-1.5 rounded-full bg-ink/70", r.w)} />
          <span className="ml-auto h-1.5 w-6 rounded-full bg-line" />
        </div>
      ))}
    </div>
  )
}

function AutoIllustration() {
  return (
    <div className="relative flex h-24 w-full items-center justify-center rounded-xl border border-line bg-white shadow-sm">
      <div className="relative size-14 rounded-full border-2 border-line">
        <span className="absolute top-1/2 left-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink" />
        <span
          className="absolute top-1/2 left-1/2 h-5 w-0.5 origin-bottom -translate-x-1/2 -translate-y-full rounded-full bg-ink"
          style={{ animation: "spin-slow 8s linear infinite" }}
        />
        <span
          className="absolute top-1/2 left-1/2 h-4 w-0.5 origin-bottom -translate-x-1/2 -translate-y-full rounded-full bg-brand-600"
          style={{ animation: "spin-slow 2s linear infinite" }}
        />
        <span
          className="absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan"
          style={{
            animation: "orbit 4s linear infinite",
            ["--orbit-r" as string]: "34px",
          }}
        />
      </div>
    </div>
  )
}

function RedesIllustration() {
  return (
    <div className="relative flex h-24 w-full flex-col justify-center gap-2 rounded-xl border border-line bg-white p-3 shadow-sm">
      <div className="w-fit max-w-[70%] rounded-2xl rounded-bl-sm bg-surface px-3 py-1.5">
        <span className="block h-1.5 w-20 rounded-full bg-ink/60" />
      </div>
      <div className="ml-auto w-fit rounded-2xl rounded-br-sm bg-brand-600 px-3 py-2">
        <span className="flex items-center gap-1">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="size-1.5 rounded-full bg-white"
              style={{
                animation: "typing 1.4s ease-in-out infinite",
                animationDelay: `${i * 0.18}s`,
              }}
            />
          ))}
        </span>
      </div>
    </div>
  )
}

const illustrations: Record<Servicio["id"], () => React.JSX.Element> = {
  web: WebIllustration,
  crm: CrmIllustration,
  automatizacion: AutoIllustration,
  redes: RedesIllustration,
}

/* ── Bento card: spotlight, border glow, particles, ripple ──── */

function ServiceCard({ item, index }: { item: Servicio; index: number }) {
  const Illustration = illustrations[item.id]

  return (
    <Reveal delay={index * 100} className="h-full">
      <a
        href="#contacto"
        className="block h-full"
        aria-label={`${item.title}: ${item.text} Solicitar diagnóstico`}
        data-cursor="Ver"
      >
        <BentoCard className="group flex h-full flex-col gap-6 rounded-3xl border border-line bg-surface p-6 hover:border-brand-100 sm:p-7">
          <div className="relative">
            <Illustration />
          </div>
          <div className="relative mt-auto flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold tracking-tight text-ink">
                {item.title}
              </h3>
              <span className="flex size-9 items-center justify-center rounded-full border border-line bg-white text-ink transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:border-brand-600 group-hover:bg-brand-600 group-hover:text-white">
                <HugeiconsIcon
                  icon={ArrowUpRight01Icon}
                  size={16}
                  className="transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:rotate-45"
                />
              </span>
            </div>
            <p className="text-base text-ink-soft">{item.text}</p>
            <p className="max-h-0 overflow-hidden text-sm leading-relaxed text-ink-soft/80 opacity-0 transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:max-h-24 group-hover:pt-2 group-hover:opacity-100">
              {item.detail}
            </p>
          </div>
        </BentoCard>
      </a>
    </Reveal>
  )
}

const tools = [
  "WhatsApp",
  "Google Calendar",
  "Gmail",
  "Google Sheets",
  "Notion",
  "Make",
  "Zapier",
  "HubSpot",
  "Instagram",
  "Stripe",
  "Calendly",
  "Shopify",
]

export function Servicios() {
  return (
    <section id="servicios" className="relative bg-white py-24 lg:py-36">
      <div className="container mx-auto px-6 sm:px-10 lg:px-16">
        <div className="mb-14 flex flex-col gap-8 lg:mb-20 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            kicker={servicios.kicker}
            lines={["Herramientas para", "tu día a día."]}
          />
          <Reveal delay={200} className="lg:max-w-xs lg:pb-2">
            <p className="border-l-2 border-cyan pl-4 text-base text-ink-soft">
              {servicios.note}
            </p>
          </Reveal>
        </div>

        <BentoGrid className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {servicios.items.map((item, i) => (
            <ServiceCard key={item.id} item={item} index={i} />
          ))}
        </BentoGrid>

        <Reveal delay={120} className="mt-14 flex flex-col gap-5">
          <p className="text-[11px] font-bold tracking-[0.2em] text-ink-soft uppercase">
            Conectamos lo que ya usas
          </p>
          <LogoLoop
            speed={40}
            gap={12}
            items={tools.map((t) => ({
              key: t,
              node: (
                <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-ink transition-colors duration-300 hover:border-brand-600 hover:text-brand-600">
                  <span className="size-1.5 rounded-full bg-cyan" />
                  {t}
                </span>
              ),
            }))}
          />
        </Reveal>
      </div>
    </section>
  )
}
