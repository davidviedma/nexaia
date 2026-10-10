"use client"

import { useEffect, useRef, useState, type CSSProperties } from "react"
import { cn } from "@/lib/utils"
import { useInView } from "@/hooks/use-in-view"
import { addScrollTask } from "@/lib/scroll-scheduler"

/* ── Blur Text ──────────────────────────────────────────────── */

/**
 * Words blur and slide into place, one after another.
 * CSS driven so the brand curtain can hold it (see html.is-loading).
 */
export function BlurText({
  text,
  className,
  delay = 0,
  step = 70,
  as: Tag = "span",
}: {
  text: string
  className?: string
  delay?: number
  step?: number
  as?: "span" | "p" | "h1" | "h2"
}) {
  const words = text.split(" ")
  return (
    <Tag className={cn("inline", className)}>
      {words.map((w, i) => (
        <span
          key={`${w}-${i}`}
          className="animate-blur-in inline-block will-change-[transform,filter,opacity]"
          style={{ animationDelay: `${delay + i * step}ms` }}
        >
          {w}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  )
}

/* ── Shiny Text ─────────────────────────────────────────────── */

export function ShinyText({
  children,
  className,
  speed = 4,
  color = "rgba(255,255,255,0.55)",
  shine = "#ffffff",
}: {
  children: React.ReactNode
  className?: string
  speed?: number
  color?: string
  shine?: string
}) {
  return (
    <span
      className={cn("shiny-text", className)}
      style={
        {
          "--shine-base": color,
          "--shine-color": shine,
          animationDuration: `${speed}s`,
        } as CSSProperties
      }
    >
      {children}
    </span>
  )
}

/* ── Gradient Text ──────────────────────────────────────────── */

export function GradientText({
  children,
  className,
  colors = ["#3781fc", "#06c3d6", "#cbe9fd", "#3781fc"],
  speed = 6,
}: {
  children: React.ReactNode
  className?: string
  colors?: string[]
  speed?: number
}) {
  return (
    <span
      className={cn("gradient-text", className)}
      style={
        {
          backgroundImage: `linear-gradient(90deg, ${colors.join(", ")})`,
          animationDuration: `${speed}s`,
        } as CSSProperties
      }
    >
      {children}
    </span>
  )
}

/* ── Decrypted Text ─────────────────────────────────────────── */

const CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#%&*+<>"

/**
 * Scrambles then reveals characters left to right whenever `text` changes.
 */
export function DecryptedText({
  text,
  className,
  speed = 28,
}: {
  text: string
  className?: string
  speed?: number
}) {
  const [display, setDisplay] = useState(text)
  const [revealed, setRevealed] = useState(text.length)
  const prevRef = useRef(text)

  useEffect(() => {
    if (prevRef.current === text) return
    prevRef.current = text
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const t = setTimeout(() => {
        setDisplay(text)
        setRevealed(text.length)
      }, 0)
      return () => clearTimeout(t)
    }
    let count = 0
    const total = text.length
    const id = setInterval(() => {
      count = Math.min(total, count + 1 + Math.floor(total / 24))
      const out = text
        .split("")
        .map((ch, i) =>
          ch === " " || i < count
            ? ch
            : CHARS[Math.floor(Math.random() * CHARS.length)]
        )
        .join("")
      setDisplay(out)
      setRevealed(count)
      if (count >= total) clearInterval(id)
    }, speed)
    return () => clearInterval(id)
  }, [text, speed])

  return (
    <span className={cn("inline-block", className)} aria-label={text}>
      <span aria-hidden>
        {display.split("").map((ch, i) => (
          <span key={i} className={i < revealed ? undefined : "text-cyan/80"}>
            {ch}
          </span>
        ))}
      </span>
    </span>
  )
}

/* ── Scroll Reveal (scrubbed) ───────────────────────────────── */

/**
 * Words brighten and un-blur as the paragraph scrolls through the
 * viewport, tied to scroll position rather than time.
 */
export function ScrollRevealText({
  text,
  className,
  wordClassName,
  as: Tag = "p",
}: {
  text: string
  className?: string
  wordClassName?: string
  as?: "p" | "h2" | "h3" | "span"
}) {
  const ref = useRef<HTMLElement>(null)
  const words = text.split(" ")

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const spans = Array.from(el.querySelectorAll<HTMLElement>("[data-word]"))
    if (reduce) {
      spans.forEach((s) => {
        s.style.opacity = "1"
        s.style.filter = "none"
      })
      return
    }
    const n = spans.length
    return addScrollTask({
      read: () => {
        const rect = el.getBoundingClientRect()
        const vh = window.innerHeight
        if (rect.bottom < 0 || rect.top > vh) return null
        return Math.max(0, Math.min(1, (vh * 0.9 - rect.top) / (vh * 0.55)))
      },
      write: (p) => {
        if (p === null) return
        spans.forEach((s, i) => {
          const local = Math.max(0, Math.min(1, p * (n + 4) - i))
          s.style.opacity = String(0.18 + local * 0.82)
          s.style.filter = `blur(${((1 - local) * 4).toFixed(2)}px)`
        })
      },
    })
  }, [text])

  return (
    // @ts-expect-error dynamic tag with a shared HTMLElement ref
    <Tag ref={ref} className={className}>
      {words.map((w, i) => (
        <span
          key={`${w}-${i}`}
          data-word
          className={cn(
            "inline-block will-change-[opacity,filter]",
            wordClassName
          )}
        >
          {w}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  )
}

/* ── Scroll Float (letters rise on view) ────────────────────── */

export function FloatText({
  text,
  className,
  letterClassName,
  step = 35,
}: {
  text: string
  className?: string
  letterClassName?: string
  step?: number
}) {
  const { ref, inView } = useInView<HTMLSpanElement>({ threshold: 0.3 })
  return (
    <span
      ref={ref}
      className={cn(
        "inline-flex overflow-hidden",
        inView && "is-visible",
        className
      )}
      aria-label={text}
    >
      {text.split("").map((ch, i) => (
        <span
          key={i}
          aria-hidden
          className={cn("float-letter inline-block", letterClassName)}
          style={{ transitionDelay: `${i * step}ms` }}
        >
          {ch === " " ? " " : ch}
        </span>
      ))}
    </span>
  )
}

/* ── Rolling number (odometer) ──────────────────────────────── */

export function RollingNumber({
  value,
  className,
  locale = "es-ES",
}: {
  value: number
  className?: string
  locale?: string
}) {
  const str = Math.round(value).toLocaleString(locale)
  return (
    <span
      className={cn("inline-flex overflow-hidden tabular-nums", className)}
      aria-label={str}
    >
      {str.split("").map((ch, i) =>
        /\d/.test(ch) ? (
          <span
            key={`${i}-${str.length}`}
            className="relative inline-block h-[1em] w-[0.6em]"
            aria-hidden
          >
            <span
              className="absolute inset-x-0 top-0 flex flex-col leading-none transition-transform duration-700 ease-[var(--ease-out-expo)]"
              style={{ transform: `translateY(-${Number(ch) * 10}%)` }}
            >
              {Array.from({ length: 10 }).map((_, d) => (
                <span
                  key={d}
                  className="flex h-[1em] items-center justify-center"
                >
                  {d}
                </span>
              ))}
            </span>
          </span>
        ) : (
          <span
            key={`${i}-sep`}
            aria-hidden
            className="inline-block leading-none"
          >
            {ch}
          </span>
        )
      )}
    </span>
  )
}
