"use client"

import { useState } from "react"
import { faqs } from "@/lib/content"
import { cn } from "@/lib/utils"
import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"

function FaqItem({
  q,
  a,
  index,
  open,
  onToggle,
}: {
  q: string
  a: string
  index: number
  open: boolean
  onToggle: () => void
}) {
  return (
    <Reveal
      delay={index * 80}
      as="li"
      className="border-t border-line last:border-b"
    >
      <button
        onClick={onToggle}
        aria-expanded={open}
        className="group flex w-full items-start gap-5 py-6 text-left sm:items-center sm:gap-8"
      >
        <span className="pt-1 text-xs font-bold text-ink-soft tabular-nums sm:pt-0">
          0{index + 1}
        </span>
        <span
          className={cn(
            "flex-1 text-xl font-bold tracking-tight transition-colors duration-300 sm:text-2xl",
            open ? "text-brand-600" : "text-ink group-hover:text-brand-600"
          )}
        >
          {q}
        </span>
        <span
          className={cn(
            "relative flex size-9 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ease-[var(--ease-out-expo)]",
            open
              ? "rotate-45 border-brand-600 bg-brand-600 text-white"
              : "border-line text-ink"
          )}
        >
          <span className="absolute h-3.5 w-px bg-current" />
          <span className="absolute h-px w-3.5 bg-current" />
        </span>
      </button>
      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-500 ease-[var(--ease-out-expo)]",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="min-h-0 overflow-hidden">
          <p className="max-w-2xl pb-7 pl-8 text-base leading-relaxed text-ink-soft sm:pl-14">
            {a}
          </p>
        </div>
      </div>
    </Reveal>
  )
}

export function Faqs() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section id="faqs" className="relative bg-white py-24 lg:py-36">
      <div className="container mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading
              kicker="Dudas"
              lines={["Lo que nos", "suelen", "preguntar."]}
            />
          </div>
          <ul className="lg:col-span-8">
            {faqs.map((f, i) => (
              <FaqItem
                key={f.q}
                index={i}
                q={f.q}
                a={f.a}
                open={open === i}
                onToggle={() => setOpen(open === i ? null : i)}
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
