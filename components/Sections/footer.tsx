import Image from "next/image"
import Link from "next/link"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  InstagramIcon,
  Linkedin01Icon,
  WhatsappIcon,
  Mail01Icon,
} from "@hugeicons/core-free-icons"

import { nav } from "@/lib/content"
import { site, whatsappHref } from "@/lib/site"

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

  return (
    <footer className="relative border-t border-line bg-white">
      <div className="container mx-auto px-6 py-16 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="flex flex-col gap-6 md:col-span-5">
            <Link href="/" aria-label="Nexa IA – Inicio" className="w-fit">
              <Image
                src="/logo-wordmark.webp"
                alt="Nexa IA – Digitalización · IA · Crecimiento"
                width={1983}
                height={793}
                className="h-auto w-56 sm:w-64"
              />
            </Link>
            <p className="max-w-sm text-base leading-relaxed text-ink-soft">
              {site.description.split(". ")[0]}.
            </p>
            <div className="flex items-center gap-2">
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

          <div className="flex flex-col gap-5 md:col-span-3">
            <p className="text-[11px] font-bold tracking-[0.2em] text-brand-600 uppercase">
              Navegación
            </p>
            <ul className="flex flex-col gap-3">
              {nav.links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="link-underline text-sm font-medium text-ink-soft transition-colors hover:text-ink"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/#contacto"
                  className="link-underline text-sm font-medium text-ink-soft transition-colors hover:text-ink"
                >
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-5 md:col-span-4">
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
              Escríbenos y te explicamos alcance y condiciones del Diagnóstico
              Nexa.
            </p>
            <p className="text-sm text-ink-soft">{site.location}</p>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-6 text-xs text-ink-soft sm:flex-row sm:items-center sm:justify-between">
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
