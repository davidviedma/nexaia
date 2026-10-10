import type { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { Reveal, RevealLines } from "@/components/reveal"

export function Kicker({
  children,
  tone = "light",
  className,
}: {
  children: ReactNode
  tone?: "light" | "dark" | "blue"
  className?: string
}) {
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] font-bold tracking-[0.18em] uppercase",
        tone === "light" && "bg-brand-50 text-brand-600",
        tone === "dark" && "bg-white/8 text-cyan ring-1 ring-white/10",
        tone === "blue" && "bg-cyan text-ink",
        className
      )}
    >
      <span
        className={cn(
          "size-1.5 rounded-full",
          tone === "light" && "bg-cyan",
          tone === "dark" && "animate-pulse-dot bg-cyan",
          tone === "blue" && "bg-ink"
        )}
      />
      {children}
    </span>
  )
}

export function SectionHeading({
  kicker,
  lines,
  text,
  tone = "light",
  className,
  align = "left",
}: {
  kicker: string
  lines: ReactNode[]
  text?: ReactNode
  tone?: "light" | "dark" | "blue"
  className?: string
  align?: "left" | "center"
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className
      )}
    >
      <Reveal>
        <Kicker tone={tone}>{kicker}</Kicker>
      </Reveal>
      <RevealLines
        lines={lines}
        delay={80}
        className={cn(
          "text-4xl leading-[1.02] font-bold tracking-[-0.03em] text-balance sm:text-5xl lg:text-6xl",
          tone === "light" ? "text-ink" : "text-white"
        )}
      />
      {text && (
        <Reveal delay={260}>
          <p
            className={cn(
              "max-w-xl text-lg leading-relaxed",
              tone === "light" ? "text-ink-soft" : "text-white/70",
              align === "center" && "mx-auto"
            )}
          >
            {text}
          </p>
        </Reveal>
      )}
    </div>
  )
}
