import { Nav } from "@/components/nav"
import { Ticker } from "@/components/ticker"
import { Hero } from "@/components/Sections/hero"
import { Mision } from "@/components/Sections/mision"
import { Servicios } from "@/components/Sections/servicios"
import { Tareas } from "@/components/Sections/tareas"
import { Proceso } from "@/components/Sections/proceso"
import { Diagnostico } from "@/components/Sections/diagnostico"
import { Simulador } from "@/components/Sections/simulador"
import { Nosotros } from "@/components/Sections/nosotros"
import { Faqs } from "@/components/Sections/faqs"
import { Cta } from "@/components/Sections/cta"
import { Footer } from "@/components/Sections/footer"
import { faqs } from "@/lib/content"

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c"),
        }}
      />
      <Nav />
      <main>
        <Hero />
        <Ticker />
        <Mision />
        <Servicios />
        <Tareas />
        <Proceso />
        <Diagnostico />
        <Simulador />
        <Nosotros />
        <Faqs />
        <Cta />
      </main>
      <Footer />
    </>
  )
}
