/**
 * Shared, smoothed scroll velocity (px per 16ms frame). Prefers the value
 * Lenis publishes on `--scroll-velocity`, falls back to measuring scrollY.
 * Lazily starts one rAF loop for the whole page.
 */
let velocity = 0
let externalVelocity: number | null = null
let started = false

/** Smooth-scroll libraries can feed their own velocity here. */
export function setExternalVelocity(v: number | null) {
  externalVelocity = v
}
let subscribers = 0
let raf = 0
let lastY = 0
let lastT = 0

function tick(now: number) {
  const y = window.scrollY
  const dt = Math.max(1, now - lastT)
  const raw =
    externalVelocity !== null ? externalVelocity : ((y - lastY) / dt) * 16
  velocity += (raw - velocity) * 0.12
  lastY = y
  lastT = now
  raf = requestAnimationFrame(tick)
}

export function subscribeScrollVelocity() {
  subscribers++
  if (!started && typeof window !== "undefined") {
    started = true
    lastY = window.scrollY
    lastT = performance.now()
    raf = requestAnimationFrame(tick)
  }
  return () => {
    subscribers--
    if (subscribers <= 0 && started) {
      cancelAnimationFrame(raf)
      started = false
      subscribers = 0
    }
  }
}

export function getScrollVelocity() {
  return velocity
}
