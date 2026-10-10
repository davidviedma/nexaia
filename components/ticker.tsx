"use client"

import { ticker } from "@/lib/content"
import { cn } from "@/lib/utils"
import { VelocityRow } from "@/components/bits/scroll-velocity"

/**
 * Two marquee rows driven by scroll velocity (React Bits "Scroll Velocity"):
 * a small uppercase row and a large outlined row moving the other way.
 * Scroll faster and they speed up; scroll back and they reverse.
 */
export function Ticker({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden border-y border-line bg-white py-6",
        className
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent"
      />

      <VelocityRow baseVelocity={55} copies={4}>
        {ticker.map((word) => (
          <span key={word} className="flex items-center">
            <span className="px-7 text-sm font-bold tracking-[0.22em] text-ink uppercase">
              {word}
            </span>
            <span className="size-2 rounded-full bg-cyan" />
          </span>
        ))}
      </VelocityRow>

      <VelocityRow baseVelocity={-80} copies={4} className="mt-3">
        {["Digitalización", "IA", "Crecimiento"].map((word) => (
          <span key={word} className="flex items-center">
            <span
              className="px-8 text-5xl font-bold tracking-[-0.03em] text-transparent sm:text-6xl"
              style={{ WebkitTextStroke: "1px rgba(11,27,51,0.35)" }}
            >
              {word}
            </span>
            <span className="size-2.5 rounded-full bg-brand-600" />
          </span>
        ))}
      </VelocityRow>
    </div>
  )
}
