"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { HugeiconsIcon } from "@hugeicons/react"
import { Menu01Icon, Cancel01Icon } from "@hugeicons/core-free-icons"

import { cn } from "@/lib/utils"
import { nav } from "@/lib/content"
import { Logo } from "@/components/logo"

/**
 * Floating "island" navigation: starts collapsed as a pill with the logo,
 * expands on scroll/hover, and highlights the current section.
 */
export function Nav() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [open, setOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [autoExpand, setAutoExpand] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const [locked, setLocked] = useState(false)
  const [onDark, setOnDark] = useState(true)
  const [hoverHref, setHoverHref] = useState<string | null>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const pillRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => {
      const isScrolled = window.scrollY > 24
      setScrolled(isScrolled)
      if (isScrolled) setLocked(true)
    }
    const onResize = () => setIsMobile(window.innerWidth < 768)

    onResize()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onResize, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onResize)
    }
  }, [])

  useEffect(() => {
    const ids = nav.links.map((l) => l.href.split("#")[1])

    const onScroll = () => {
      const threshold = window.innerHeight * 0.3
      let current = ""
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= threshold) current = id
      }
      setActiveSection(current)

      // Detect whether the island sits on a dark section.
      const probe = document.elementFromPoint(window.innerWidth / 2, 80)
      const themed = probe?.closest<HTMLElement>("[data-theme]")
      const darkHost = themed?.dataset.theme === "dark" ? themed : null
      setOnDark(Boolean(darkHost))
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const expand = setTimeout(() => {
      setAutoExpand(true)
      setLocked(true)
    }, 700)
    const collapse = setTimeout(() => setAutoExpand(false), 2400)
    return () => {
      clearTimeout(expand)
      clearTimeout(collapse)
    }
  }, [])

  // Once expanded for the first time, the island stays open.
  const expanded = scrolled || hovered || autoExpand || locked || open

  const isLinkActive = (href: string) =>
    href.startsWith("/#")
      ? pathname === "/" && activeSection === href.slice(2)
      : pathname.startsWith(href)

  const pillHref =
    hoverHref ?? nav.links.find((l) => isLinkActive(l.href))?.href ?? null

  // Slide the pill behind the hovered / active link.
  useEffect(() => {
    const list = listRef.current
    const pill = pillRef.current
    if (!list || !pill) return
    const target = pillHref
      ? list.querySelector<HTMLElement>(`[data-href="${pillHref}"]`)
      : null
    if (!target || !expanded) {
      pill.style.opacity = "0"
      return
    }
    const lr = list.getBoundingClientRect()
    const tr = target.getBoundingClientRect()
    pill.style.left = `${tr.left - lr.left}px`
    pill.style.width = `${tr.width}px`
    pill.style.opacity = "1"
  })

  const islandWidth = isMobile ? (expanded ? 190 : 60) : expanded ? 900 : 60

  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center">
      <div className="pointer-events-auto relative flex flex-col items-center">
        <nav
          aria-label="Navegación principal"
          onMouseEnter={() => {
            setHovered(true)
            setLocked(true)
          }}
          onMouseLeave={() => setHovered(false)}
          className={cn(
            "relative flex h-[60px] items-center overflow-hidden rounded-full",
            "border backdrop-blur-2xl",
            "transition-[width,background-color,border-color,box-shadow] duration-[480ms] ease-[var(--ease-spring)]",
            onDark
              ? "border-white/10 bg-navy/70 shadow-[0_8px_40px_rgba(3,25,91,0.35),0_1px_0_rgba(255,255,255,0.08)_inset]"
              : "border-ink/8 bg-white/80 shadow-[0_8px_40px_rgba(3,25,91,0.12),0_1px_0_rgba(255,255,255,0.8)_inset]"
          )}
          style={{ width: islandWidth }}
        >
          <Link
            href="/"
            aria-label="Nexa IA – Inicio"
            className={cn(
              "flex shrink-0 items-center transition-[padding] duration-[480ms] ease-[var(--ease-spring)]",
              expanded ? "pr-2 pl-3" : "pr-[30px] pl-[11px]"
            )}
          >
            <Logo
              tone={onDark ? "dark" : "light"}
              size={38}
              withText={expanded && !isMobile}
              priority
            />
          </Link>

          {/* Desktop links */}
          <ul
            ref={listRef}
            onMouseLeave={() => setHoverHref(null)}
            className={cn(
              "relative hidden flex-1 items-center justify-center gap-0.5 md:flex",
              "transition-opacity duration-200",
              expanded
                ? "opacity-100 delay-150"
                : "pointer-events-none opacity-0 delay-0"
            )}
          >
            <div
              ref={pillRef}
              aria-hidden
              className={cn("nav-pill", onDark ? "bg-white/12" : "bg-ink/6")}
              style={{ opacity: 0, left: 0, width: 0 }}
            />
            {nav.links.map((link) => {
              const isActive = isLinkActive(link.href)
              const lit = hoverHref ? hoverHref === link.href : isActive
              return (
                <li key={link.href} className="relative z-[1]">
                  <Link
                    href={link.href}
                    data-href={link.href}
                    onMouseEnter={() => setHoverHref(link.href)}
                    className={cn(
                      "block rounded-full px-3.5 py-2 text-[14px] font-medium whitespace-nowrap transition-colors duration-300",
                      onDark
                        ? lit
                          ? "text-white"
                          : "text-white/70"
                        : lit
                          ? "text-ink"
                          : "text-ink-soft"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* CTA — desktop */}
          <div
            className={cn(
              "hidden shrink-0 pr-1.5 md:flex",
              "transition-opacity duration-200",
              expanded
                ? "opacity-100 delay-150"
                : "pointer-events-none opacity-0 delay-0"
            )}
          >
            <Link
              href="/#contacto"
              className="inline-flex h-10 items-center gap-2 rounded-full bg-brand-600 px-5 text-[14px] font-semibold whitespace-nowrap text-white transition-colors duration-300 hover:bg-brand-900"
            >
              {nav.cta}
              <span className="size-1.5 rounded-full bg-cyan" />
            </Link>
          </div>

          {/* Hamburger — mobile */}
          <div
            className={cn(
              "ml-auto flex shrink-0 pr-1.5 md:hidden",
              "transition-opacity duration-200",
              expanded
                ? "opacity-100 delay-150"
                : "pointer-events-none opacity-0 delay-0"
            )}
          >
            <button
              onClick={() => setOpen(!open)}
              aria-label="Abrir menú"
              aria-expanded={open}
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-full transition-colors",
                onDark
                  ? "text-white/80 hover:bg-white/10"
                  : "text-ink hover:bg-ink/5"
              )}
            >
              <HugeiconsIcon
                icon={open ? Cancel01Icon : Menu01Icon}
                size={18}
              />
            </button>
          </div>
        </nav>

        {/* Mobile dropdown */}
        <div
          className={cn(
            "absolute top-full mt-2 w-56 overflow-hidden rounded-3xl md:hidden",
            "border border-ink/8 bg-white/95 backdrop-blur-2xl",
            "shadow-[0_16px_48px_rgba(3,25,91,0.18)]",
            "flex flex-col gap-0.5 p-1.5",
            "origin-top transition-all duration-300 ease-[var(--ease-out-expo)]",
            open
              ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
              : "pointer-events-none -translate-y-1 scale-95 opacity-0"
          )}
        >
          {nav.links.map((link) => {
            const isActive = isLinkActive(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-2xl px-3.5 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-ink/6 text-ink"
                    : "text-ink-soft hover:bg-ink/5 hover:text-ink"
                )}
              >
                {link.label}
              </Link>
            )
          })}
          <Link
            href="/#contacto"
            onClick={() => setOpen(false)}
            className="mt-0.5 rounded-2xl bg-brand-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-brand-900"
          >
            {nav.cta}
          </Link>
        </div>
      </div>
    </div>
  )
}
