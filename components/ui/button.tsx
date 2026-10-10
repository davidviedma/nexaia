import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-full border border-transparent bg-clip-padding text-sm font-semibold whitespace-nowrap transition-all duration-300 ease-[var(--ease-out-expo)] outline-none select-none focus-visible:ring-3 focus-visible:ring-ring/40 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-brand-600 text-white shadow-[0_8px_24px_-8px_rgba(25,81,252,0.6)] hover:bg-brand-900 hover:shadow-[0_12px_32px_-8px_rgba(11,44,177,0.6)]",
        ink: "bg-ink text-white hover:bg-navy-800",
        light:
          "bg-white text-ink shadow-[0_8px_24px_-10px_rgba(3,25,91,0.5)] hover:bg-brand-50",
        outline:
          "border-line bg-transparent text-ink hover:border-ink hover:bg-ink hover:text-white",
        "outline-light":
          "border-white/25 bg-transparent text-white hover:border-white hover:bg-white hover:text-ink",
        ghost: "text-ink hover:bg-surface",
        link: "text-brand-600 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 gap-2 px-5",
        sm: "h-8 gap-1.5 px-3.5 text-xs",
        lg: "h-12 gap-2 px-6 text-[15px]",
        xl: "h-14 gap-2.5 px-8 text-base",
        icon: "size-10",
        "icon-sm": "size-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
