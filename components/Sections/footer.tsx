import Image from "next/image"
import Link from "next/link"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  InstagramIcon,
  Linkedin01Icon,
  WhatsappIcon,
  Mail01Icon,
  ArrowUpRight01Icon,
} from "@hugeicons/core-free-icons"

import { nav, servicios } from "@/lib/content"
import { site, whatsappHref } from "@/lib/site"
import { FloatText } from "@/components/bits/text-effects"

function Column({
  title,
  links,
}: {
  title: string
  links: { label: string; href: string }[]
}) {
  return (
    <div className="flex flex-col gap-5">
      <p className="text-[11px] font-bold tracking-[0.2em] text-brand-600 uppercase">
        {title}
      </p>
      <ul className="flex flex-col gap-3">
        {links.map((l) => (
          <li key={l.href + l.label}>
            <Link
              href={l.href}
              className="link-underline text-[15px] font-medium text-ink-soft transition-colors hover:text-ink"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Footer() {
  const socials = [
    site.instagram && {
      label: "Instagram",
      href: site.instagram,
      icon: InstagramIcon,
    },
    site.linkedin && {
      label: "LinkedIn",
      href: site.linkedin,
      icon: Linkedin01Icon,
    },
    whatsappHref() && {
      label: "WhatsApp",
      href: whatsappHref()!,
      icon: WhatsappIcon,
    },
    { label: "Email", href: `mailto:${site.email}`, icon: Mail01Icon },
  ].filter(Boolean) as {
    label: string
    href: string
    icon: typeof Mail01Icon
  }[]

  const serviceLinks = servicios.items.map((s) => ({
    label: s.title,
    href: "/#servicios",
  }))

  return (
    <footer className="relative overflow-hidden border-t border-line bg-white">
      <div className="w-full px-6 pt-16 pb-8 sm:px-10 lg:px-12 xl:px-16">
        {/* Top: brand + CTA */}
        <div className="flex flex-col gap-8 border-b border-line pb-12 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-6">
            <Link href="/" aria-label="Nexa IA – Inicio" className="w-fit">
              <Image
                src="/logo-wordmark.webp"
                alt="Nexa IA – Digitalización · IA · Crecimiento"
                width={1983}
                height={793}
                className="h-auto w-60 sm:w-72"
              />
            </Link>
            <p className="max-w-md text-lg leading-relaxed text-ink-soft">
              {site.description.split(". ")[0]}.
            </p>
          </div>
          <Link
            href="/#contacto"
            className="group inline-flex w-fit items-center gap-4 rounded-full border border-line py-3 pr-3 pl-6 text-base font-semibold text-ink transition-colors duration-300 hover:border-brand-600"
          >
            Solicitar Diagnóstico Nexa
            <span className="flex size-10 items-center justify-center rounded-full bg-brand-600 text-white transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:rotate-45">
              <HugeiconsIcon icon={ArrowUpRight01Icon} size={18} />
            </span>
          </Link>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 py-12 md:grid-cols-4 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <Column title="Navegación" links={nav.links} />
          </div>
          <div className="lg:col-span-3">
            <Column title="Servicios" links={serviceLinks} />
          </div>
          <div className="lg:col-span-3">
            <Column
              title="Empieza"
              links={[
                { label: "Diagnóstico Nexa", href: "/#diagnostico" },
                { label: "Lo que recuperas", href: "/#resultados" },
                { label: "Contacto", href: "/#contacto" },
              ]}
            />
          </div>
          <div className="col-span-2 flex flex-col gap-5 md:col-span-1 lg:col-span-3">
            <p className="text-[11px] font-bold tracking-[0.2em] text-brand-600 uppercase">
              Hablemos
            </p>
            <a
              href={`mailto:${site.email}`}
              className="link-underline w-fit text-xl font-bold tracking-tight text-ink"
            >
              {site.email}
            </a>
            <p className="text-sm text-ink-soft">
              Te explicamos alcance y condiciones del Diagnóstico Nexa antes de
              concertarlo.
            </p>
            <p className="text-sm text-ink-soft">{site.location}</p>
            <div className="flex items-center gap-2 pt-1">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    s.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  aria-label={s.label}
                  className="flex size-10 items-center justify-center rounded-full border border-line text-ink transition-all duration-300 hover:border-ink hover:bg-ink hover:text-white"
                >
                  <HugeiconsIcon icon={s.icon} size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Brand bar: edge to edge */}
        <div
          aria-hidden
          className="-mx-6 mt-4 flex justify-center overflow-hidden select-none sm:-mx-10 lg:-mx-12 xl:-mx-16"
        >
          <FloatText
            text="Nexa IA"
            step={45}
            className="text-[clamp(5.5rem,27vw,30rem)] leading-[0.78] font-bold tracking-[-0.07em] whitespace-nowrap"
            letterClassName="bg-gradient-to-b from-brand-100 via-brand-50 to-white bg-clip-text text-transparent"
          />
        </div>

        <div className="mt-2 flex flex-col gap-3 border-t border-line pt-6 text-xs text-ink-soft sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. Todos los derechos
            reservados.
          </p>
          <p className="flex items-center gap-2 font-semibold tracking-[0.18em] uppercase">
            Digitalización <span className="size-1 rounded-full bg-cyan" /> IA{" "}
            <span className="size-1 rounded-full bg-cyan" /> Crecimiento
          </p>
        </div>
      </div>
    </footer>
  )
}
