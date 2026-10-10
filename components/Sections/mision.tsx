import { mision } from "@/lib/content"
import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"
import { ScrollRevealText } from "@/components/bits/text-effects"

export function Mision() {
  return (
    <section id="mision" className="relative bg-white py-24 lg:py-36">
      <div className="container mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <SectionHeading
              kicker={mision.kicker}
              lines={["La tecnología", "también es", "para tu pyme."]}
            />
            <ScrollRevealText
              text={mision.text}
              className="mt-6 max-w-xl text-2xl leading-snug font-medium tracking-tight text-ink sm:text-3xl"
            />
          </div>

          <div className="flex flex-col gap-8 lg:col-span-5 lg:pt-6">
            <Reveal delay={100}>
              <div className="relative overflow-hidden rounded-[1.75rem] bg-navy p-6 text-white sm:p-7">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -top-20 -right-20 size-60 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle closest-side, rgba(25,81,252,0.5), transparent 100%)",
                  }}
                />
                <p className="relative text-[11px] font-bold tracking-[0.2em] text-cyan uppercase">
                  Contexto real · España
                </p>
                <p className="relative mt-3 text-5xl font-bold tracking-[-0.04em] sm:text-6xl">
                  {mision.stat.value.toLocaleString("es-ES")}
                  <span className="text-3xl">{mision.stat.suffix}</span>
                </p>
                <p className="relative mt-2 max-w-sm text-base text-white/80">
                  {mision.stat.label} {mision.stat.detail}
                </p>
                <p className="relative mt-4 text-sm font-semibold text-cyan">
                  {mision.stat.note}
                </p>
                <p className="relative mt-3 text-[11px] text-white/45">
                  {mision.stat.source}
                </p>
              </div>
            </Reveal>
            <ul className="flex flex-col">
              {mision.pillars.map((p, i) => (
                <Reveal key={p.title} as="li" delay={120 + i * 120}>
                  <div className="group relative flex items-start gap-6 border-t border-line py-7 last:border-b">
                    <span className="relative mt-2.5 flex size-3 shrink-0 items-center justify-center">
                      <span className="absolute inset-0 rounded-full bg-cyan/30 transition-transform duration-500 group-hover:scale-[2.4]" />
                      <span className="relative size-2 rounded-full bg-cyan" />
                    </span>
                    <div className="flex flex-col gap-1">
                      <h3 className="text-2xl font-bold tracking-tight text-ink transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1">
                        {p.title}
                      </h3>
                      <p className="text-base text-ink-soft">{p.text}</p>
                    </div>
                    <span className="ml-auto text-sm font-bold text-line tabular-nums transition-colors duration-300 group-hover:text-brand-600">
                      0{i + 1}
                    </span>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
