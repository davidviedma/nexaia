/**
 * Single source of truth for brand & contact data.
 *
 * TODO (Nexa IA): sustituye los valores marcados antes de publicar.
 */
export const SITE_URL = "https://nexaia.es" // TODO: dominio definitivo

export const site = {
  name: "Nexa IA",
  tagline: "Digitalización · IA · Crecimiento",
  claim: "Digitalización e IA para pymes.",
  description:
    "Nexa IA acerca herramientas digitales e inteligencia artificial a las pymes con una forma de trabajar sencilla, cercana y práctica. Web, CRM, automatización y redes sociales. Empieza con el Diagnóstico Nexa.",
  email: "hola@nexaia.es", // TODO: email de contacto real
  whatsapp: "", // TODO: número en formato internacional sin "+", p. ej. 34600000000. Vacío = se oculta.
  instagram: "", // TODO: URL del perfil, p. ej. https://www.instagram.com/nexa.ia. Vacío = se oculta.
  linkedin: "", // TODO: URL del perfil. Vacío = se oculta.
  location: "España",
} as const

export const whatsappHref = (text?: string) =>
  site.whatsapp
    ? `https://wa.me/${site.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`
    : undefined

export const diagnosticoMailto = (fields?: {
  nombre?: string
  negocio?: string
  tarea?: string
}) => {
  const subject = "Solicitud de Diagnóstico Nexa"
  const body = [
    "Hola Nexa IA,",
    "",
    `Me llamo ${fields?.nombre || "..."} y tengo un negocio de ${fields?.negocio || "..."}.`,
    "",
    "La tarea que más tiempo me quita es:",
    fields?.tarea || "...",
    "",
    "Me gustaría solicitar el Diagnóstico Nexa.",
  ].join("\n")
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}
