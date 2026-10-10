"use client"

import type { CSSProperties, ElementType, ReactNode } from "react"
import { useInView } from "@/hooks/use-in-view"
import { cn } from "@/lib/utils"

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  as?: ElementType
  variant?: "up" | "scale"
  style?: CSSProperties
  id?: string
}

/**
 * Scroll reveal wrapper. Children fade & slide in once the element is visible.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
  variant = "up",
  style,
  id,
}: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>()
  return (
    <Tag
      ref={ref}
      id={id}
      className={cn(
        variant === "scale" ? "reveal-scale" : "reveal",
        inView && "is-visible",
        className
      )}
      style={{ ...style, ["--reveal-delay" as string]: `${delay}ms` }}
    >
      {children}
    </Tag>
  )
}

/**
 * Splits a heading into lines; each line slides up from behind a mask.
 */
export function RevealLines({
  lines,
  className,
  lineClassName,
  delay = 0,
  step = 90,
  as: Tag = "h2",
}: {
  lines: ReactNode[]
  className?: string
  lineClassName?: string
  delay?: number
  step?: number
  as?: ElementType
}) {
  const { ref, inView } = useInView<HTMLHeadingElement>()
  return (
    <Tag ref={ref} className={cn(inView && "is-visible", className)}>
      {lines.map((line, i) => (
        <span
          key={i}
          className={cn("mask-line block", lineClassName)}
          style={{ ["--reveal-delay" as string]: `${delay + i * step}ms` }}
        >
          <span>{line}</span>
        </span>
      ))}
    </Tag>
  )
}
