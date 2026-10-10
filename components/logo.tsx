import Image from "next/image"
import { cn } from "@/lib/utils"

/**
 * Brand lockup: app-style icon + wordmark text.
 * Works on light and dark backgrounds.
 */
export function Logo({
  tone = "light",
  size = 36,
  withText = true,
  className,
  priority = false,
}: {
  tone?: "light" | "dark"
  size?: number
  withText?: boolean
  className?: string
  priority?: boolean
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <Image
        src="/logo-icon.png"
        alt="Nexa IA"
        width={size}
        height={size}
        priority={priority}
        className="shrink-0 rounded-[22%] shadow-[0_4px_14px_-4px_rgba(3,25,91,0.5)]"
        style={{ width: size, height: size }}
      />
      {withText && (
        <span
          className={cn(
            "text-[1.05rem] font-bold tracking-[-0.02em]",
            tone === "light" ? "text-ink" : "text-white"
          )}
        >
          Nexa <span className="text-brand-600">IA</span>
        </span>
      )}
    </span>
  )
}
