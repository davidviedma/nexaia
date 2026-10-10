"use client"

import { useEffect, useRef, useState } from "react"

/**
 * Reports once (by default) when the element enters the viewport.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(options?: {
  threshold?: number
  rootMargin?: string
  once?: boolean
}) {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)
  const {
    threshold = 0.2,
    rootMargin = "0px 0px -8% 0px",
    once = true,
  } = options ?? {}

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setInView(false)
        }
      },
      { threshold, rootMargin }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, rootMargin, once])

  return { ref, inView }
}
