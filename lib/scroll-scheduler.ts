/**
 * One scroll listener + one rAF for every scroll-driven effect.
 * Each task reads layout first (all reads batched), then writes styles
 * (all writes batched), so effects never force layout one after another.
 */
type Task<T> = { read: () => T; write: (value: T) => void }

const tasks = new Set<Task<unknown>>()
let raf = 0
let listening = false

function flush() {
  raf = 0
  const list = Array.from(tasks)
  const values = list.map((t) => t.read())
  list.forEach((t, i) => t.write(values[i]))
}

function schedule() {
  if (!raf) raf = requestAnimationFrame(flush)
}

export function addScrollTask<T>(task: Task<T>) {
  tasks.add(task as Task<unknown>)
  if (!listening && typeof window !== "undefined") {
    listening = true
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule)
  }
  schedule()
  return () => {
    tasks.delete(task as Task<unknown>)
    if (tasks.size === 0 && listening) {
      window.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", schedule)
      listening = false
      if (raf) cancelAnimationFrame(raf)
      raf = 0
    }
  }
}

/** Ask for a flush outside of scroll (e.g. after a resize observer fires). */
export const requestScrollFlush = schedule
