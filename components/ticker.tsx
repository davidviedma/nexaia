import { ticker } from "@/lib/content"
import { cn } from "@/lib/utils"

/**
 * Infinite marquee with the brand tagline words separated by cyan dots.
 */
export function Ticker({
  tone = "light",
  className,
}: {
  tone?: "light" | "dark"
  className?: string
}) {
  const items = [...ticker, ...ticker]
  return (
    <div
      className={cn(
        "marquee-row relative w-full overflow-hidden py-5",
        tone === "light"
          ? "border-y border-line bg-white"
          : "border-y border-white/10 bg-navy",
        className
      )}
      aria-hidden
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r to-transparent",
          tone === "light" ? "from-white" : "from-navy"
        )}
      />
      <div
        className={cn(
          "pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l to-transparent",
          tone === "light" ? "from-white" : "from-navy"
        )}
      />
      <div
        className="animate-marquee flex w-max items-center"
        style={{ willChange: "transform" }}
      >
        {items.map((word, i) => (
          <span key={`${word}-${i}`} className="flex items-center">
            <span
              className={cn(
                "px-7 text-sm font-bold tracking-[0.22em] uppercase",
                tone === "light" ? "text-ink" : "text-white"
              )}
            >
              {word}
            </span>
            <span className="size-2 rounded-full bg-cyan" />
          </span>
        ))}
      </div>
    </div>
  )
}
