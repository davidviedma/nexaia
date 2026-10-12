import { testimonios } from "@/lib/content"
import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"
import { LogoLoop } from "@/components/bits/logo-loop"

type Testimonio = (typeof testimonios.items)[number]

function Stars() {
  return (
    <span className="flex gap-0.5 text-cyan" aria-label="5 de 5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className="size-3.5"
          fill="currentColor"
          aria-hidden
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </span>
  )
}

function Card({ t }: { t: Testimonio }) {
  const initials = t.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
  return (
    <figure className="flex w-[21rem] shrink-0 flex-col gap-5 rounded-[1.75rem] border border-white/10 bg-white/[0.05] p-6 text-white transition-colors duration-300 hover:bg-white/[0.09] sm:w-[24rem]">
      <div className="flex items-center justify-between">
        <Stars />
        <span className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-bold tracking-[0.16em] text-white/70 uppercase">
          {t.service}
        </span>
      </div>
      <blockquote className="text-[1.05rem] leading-relaxed text-white/90">
        “{t.quote}”
      </blockquote>
      <figcaption className="mt-auto flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-brand-600 to-cyan text-sm font-bold text-white">
          {initials}
        </span>
        <span className="flex flex-col">
          <span className="text-sm font-bold">{t.name}</span>
          <span className="text-xs text-white/60">{t.role}</span>
        </span>
      </figcaption>
    </figure>
  )
}

export function Testimonios() {
  const items = testimonios.items
  const row1 = items
  const row2 = [...items].reverse()

  return (
    <section
      id="testimonios"
      data-theme="dark"
      className="grain relative overflow-hidden bg-navy py-24 text-white [--grain-opacity:0.1] lg:py-36"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(800px circle at 15% 0%, rgba(25,81,252,0.35), transparent 60%), radial-gradient(700px circle at 90% 100%, rgba(6,195,214,0.16), transparent 60%)",
        }}
      />
      <div className="relative z-[2] container mx-auto mb-14 px-6 sm:px-10 lg:px-16">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            kicker={testimonios.kicker}
            lines={testimonios.title}
            tone="dark"
          />
          <Reveal delay={200}>
            <div className="flex items-center gap-4 rounded-full border border-white/10 bg-white/[0.05] py-2 pr-5 pl-2">
              <span className="flex -space-x-2">
                {items.slice(0, 4).map((t) => (
                  <span
                    key={t.name}
                    className="flex size-8 items-center justify-center rounded-full border-2 border-navy bg-gradient-to-br from-brand-600 to-cyan text-[10px] font-bold"
                  >
                    {t.name[0]}
                  </span>
                ))}
              </span>
              <span className="text-sm text-white/75">
                {testimonios.tagline}
              </span>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="relative z-[2] flex flex-col gap-4">
        <LogoLoop
          speed={38}
          gap={16}
          fadeClassName="from-navy"
          items={row1.map((t) => ({
            key: t.name,
            node: <Card t={t} />,
          }))}
        />
        <LogoLoop
          speed={30}
          gap={16}
          direction="right"
          fadeClassName="from-navy"
          items={row2.map((t) => ({
            key: t.name,
            node: <Card t={t} />,
          }))}
        />
      </div>
    </section>
  )
}
