"use client"

import { useState, type FormEvent } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowRight02Icon,
  Mail01Icon,
  WhatsappIcon,
} from "@hugeicons/core-free-icons"

import { cta } from "@/lib/content"
import { site, diagnosticoMailto, whatsappHref } from "@/lib/site"
import { cn } from "@/lib/utils"
import { Reveal } from "@/components/reveal"
import { Kicker } from "@/components/section-heading"
import { RevealLines } from "@/components/reveal"
import { Button } from "@/components/ui/button"
import { DotGrid } from "@/components/bits/dot-grid"
import { StarBorder } from "@/components/bits/surfaces"
import { Magnetic } from "@/components/magnetic"

const fieldClass =
  "w-full rounded-2xl border border-white/20 bg-white/10 px-5 py-4 text-base text-white placeholder:text-white/50 outline-none transition-[border-color,background-color,box-shadow] duration-300 focus:border-white focus:bg-white/15 focus:ring-4 focus:ring-white/15"

export function Cta() {
  const [nombre, setNombre] = useState("")
  const [negocio, setNegocio] = useState("")
  const [tarea, setTarea] = useState("")

  const wa = whatsappHref(
    `Hola Nexa IA, me gustaría solicitar el Diagnóstico Nexa. Tengo un negocio de ${negocio || "..."} y la tarea que más tiempo me quita es ${tarea || "..."}.`
  )

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    window.location.href = diagnosticoMailto({ nombre, negocio, tarea })
  }

  return (
    <section
      id="contacto"
      data-theme="dark"
      className="grain relative overflow-hidden bg-brand-600 py-24 text-white [--grain-opacity:0.16] lg:py-36"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(800px circle at 0% 0%, rgba(6,195,214,0.35), transparent 55%), radial-gradient(700px circle at 100% 100%, rgba(3,25,91,0.6), transparent 60%)",
        }}
      />
      <DotGrid
        className="z-[1] opacity-80"
        gap={28}
        dotSize={3}
        baseColor="rgba(255,255,255,0.18)"
        activeColor="#06c3d6"
      />

      <div className="relative z-[2] container mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="flex flex-col gap-7 lg:col-span-6">
            <Reveal>
              <Kicker tone="blue">{cta.kicker}</Kicker>
            </Reveal>
            <RevealLines
              lines={["Cuéntanos qué", "te está quitando", "tiempo."]}
              delay={80}
              className="text-5xl leading-[0.98] font-bold tracking-[-0.035em] text-balance sm:text-6xl lg:text-7xl"
            />
            <Reveal delay={240}>
              <p className="max-w-md text-lg leading-relaxed text-white/80 sm:text-xl">
                {cta.text}
              </p>
            </Reveal>
            <Reveal delay={320}>
              <ul className="flex flex-col gap-2 text-lg font-semibold">
                {cta.questions.map((q) => (
                  <li key={q} className="flex items-center gap-3">
                    <span className="size-2 rounded-full bg-cyan" />
                    {q}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={400}>
              <p className="text-sm text-white/65">{cta.footer}</p>
            </Reveal>
          </div>

          <Reveal variant="scale" delay={200} className="lg:col-span-6">
            <form
              onSubmit={onSubmit}
              className="flex flex-col gap-4 rounded-[2rem] border border-white/15 bg-white/[0.06] p-6 sm:p-8"
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <input
                  className={fieldClass}
                  placeholder="Tu nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  autoComplete="name"
                  required
                />
                <input
                  className={fieldClass}
                  placeholder="¿A qué te dedicas?"
                  value={negocio}
                  onChange={(e) => setNegocio(e.target.value)}
                  required
                />
              </div>
              <textarea
                className={cn(fieldClass, "min-h-32 resize-y")}
                placeholder="¿Qué tarea te quita más tiempo?"
                value={tarea}
                onChange={(e) => setTarea(e.target.value)}
                required
              />
              <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
                <Magnetic strength={0.15}>
                  <StarBorder
                    color="#ffffff"
                    speed={4.5}
                    className="w-full sm:w-auto"
                  >
                    <Button
                      type="submit"
                      size="xl"
                      variant="light"
                      className="w-full sm:w-auto"
                    >
                      <HugeiconsIcon icon={Mail01Icon} size={18} />
                      {cta.button}
                      <HugeiconsIcon
                        icon={ArrowRight02Icon}
                        size={16}
                        className="transition-transform duration-300 group-hover/button:translate-x-1"
                      />
                    </Button>
                  </StarBorder>
                </Magnetic>
                {wa && (
                  <Button
                    asChild
                    size="xl"
                    variant="outline-light"
                    className="w-full sm:w-auto"
                  >
                    <a href={wa} target="_blank" rel="noopener noreferrer">
                      <HugeiconsIcon icon={WhatsappIcon} size={18} />
                      Por WhatsApp
                    </a>
                  </Button>
                )}
              </div>
              <p className="text-xs text-white/55">
                Se abrirá tu correo con el mensaje preparado para{" "}
                <a
                  href={`mailto:${site.email}`}
                  className="link-underline font-semibold text-white"
                >
                  {site.email}
                </a>
                .
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
