import type { Metadata, Viewport } from "next"
import { Inter, Geist_Mono } from "next/font/google"

import "./globals.css"
import { cn } from "@/lib/utils"
import { SITE_URL, site } from "@/lib/site"
import { SmoothScroll } from "@/components/motion/smooth-scroll"
import { Cursor } from "@/components/motion/cursor"
import { Preloader } from "@/components/motion/preloader"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const fontMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" })

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `${site.name} – Digitalización e IA para pymes`,
  description: site.description,
  keywords: [
    "digitalización pymes",
    "inteligencia artificial pymes",
    "automatización negocio",
    "CRM pymes",
    "diseño web pymes",
    "automatizar citas",
    "Diagnóstico Nexa",
    "Nexa IA",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: `${site.name} – Digitalización e IA para pymes`,
    description: site.description,
    url: SITE_URL,
    siteName: site.name,
    locale: "es_ES",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${site.name} – ${site.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} – Digitalización e IA para pymes`,
    description: site.description,
    images: ["/og-image.jpg"],
  },
}

export const viewport: Viewport = {
  themeColor: "#061b3c",
  width: "device-width",
  initialScale: 1,
}

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/#organization`,
  name: site.name,
  slogan: site.tagline,
  description: site.description,
  url: SITE_URL,
  email: site.email,
  logo: `${SITE_URL}/logo-icon.png`,
  image: `${SITE_URL}/og-image.jpg`,
  areaServed: { "@type": "Country", name: "España" },
  knowsAbout: [
    "Digitalización",
    "Inteligencia artificial",
    "Automatización",
    "CRM",
    "Diseño web",
    "Redes sociales",
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="es"
      className={cn("antialiased", inter.variable, fontMono.variable)}
    >
      <head>
        <script
          // Marks the document as loading before hydration so the hero intro
          // waits for the brand curtain (shown once per session).
          dangerouslySetInnerHTML={{
            __html:
              "try{if(!sessionStorage.getItem('nexa-intro')&&!matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('is-loading')}}catch(e){}",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body className="overflow-x-clip">
        <Preloader />
        <SmoothScroll />
        <Cursor />
        {children}
      </body>
    </html>
  )
}
