/**
 * Copy del sitio. Extraído de los documentos "Nexa — Vista completa" y
 * "Nexa AI V2". Poco texto: cada bloque se apoya en lo visual.
 */

export const nav = {
  links: [
    { label: "Servicios", href: "/#servicios" },
    { label: "Método", href: "/#metodo" },
    { label: "Diagnóstico", href: "/#diagnostico" },
    { label: "Resultados", href: "/#resultados" },
    { label: "Opiniones", href: "/#testimonios" },
    { label: "Nosotros", href: "/#nosotros" },
  ],
  cta: "Pedir diagnóstico",
}

export const hero = {
  kicker: "Digitalización con propósito",
  title: ["Tu negocio,", "un paso", "por delante."],
  subtitle:
    "Digitalización e IA para ganar tiempo, ordenar tu negocio y atender mejor.",
  words: ["Tiempo.", "Clientes.", "Tranquilidad."],
  primary: "Solicitar Diagnóstico Nexa",
  secondary: "Conoce Nexa IA",
  tag: "Consultoría · IA · Pymes",
}

export const ticker = [
  "Digitalización",
  "IA",
  "Crecimiento",
  "Web",
  "CRM",
  "Automatización",
  "Redes sociales",
  "Pymes",
]

export const mision = {
  kicker: "Nuestra misión",
  title: ["La tecnología también", "es para tu pyme."],
  pillars: [
    { id: "sencilla", title: "Sencilla", text: "Te explicamos cada paso." },
    { id: "cercana", title: "Cercana", text: "Entendemos tu día a día." },
    { id: "util", title: "Útil", text: "Solo lo que aporta valor." },
  ],
  stat: {
    value: 21.1,
    suffix: "%",
    label: "de las empresas españolas ya usan IA.",
    hint: "Tu punto de partida es una necesidad concreta.",
    source: "Fuente: INE · 1T 2025",
  },
}

export type Servicio = {
  id: "web" | "crm" | "automatizacion" | "ia"
  title: string
  text: string
  detail: string
}

export const servicios = {
  kicker: "Servicios",
  title: ["Herramientas para", "tu día a día."],
  items: [
    {
      id: "web",
      title: "Web y redes",
      text: "Que te encuentren.",
      detail: "Captar clientes y comunicar mejor.",
    },
    {
      id: "crm",
      title: "CRM",
      text: "Ningún cliente perdido.",
      detail: "Cada presupuesto con un próximo paso.",
    },
    {
      id: "automatizacion",
      title: "Automatización",
      text: "Menos tareas a mano.",
      detail: "Lo repetitivo, resuelto con reglas.",
    },
    {
      id: "ia",
      title: "IA aplicada",
      text: "Atender más rápido.",
      detail: "Consultas e información, con agilidad.",
    },
  ] satisfies Servicio[],
  toolsLabel: "Conectamos lo que ya usas",
  tools: [
    "WhatsApp",
    "Google Calendar",
    "Gmail",
    "Google Sheets",
    "Notion",
    "Make",
    "Zapier",
    "HubSpot",
    "Instagram",
    "Stripe",
    "Calendly",
    "Shopify",
  ],
}

export const proceso = {
  kicker: "Así trabajamos",
  title: ["Primero entendemos", "tu negocio."],
  steps: [
    { title: "Diagnóstico", text: "Dónde se pierde tiempo." },
    { title: "Propuesta", text: "Qué mejorar primero y qué impacto tiene." },
    { title: "Implementación", text: "Sin parar tu actividad." },
    { title: "Acompañamiento", text: "Mantenemos y mejoramos." },
  ],
}

export const diagnostico = {
  kicker: "Diagnóstico Nexa",
  title: ["Antes de invertir,", "ten un plan."],
  phases: [
    { title: "Entender", text: "Cómo trabajas hoy." },
    { title: "Detectar", text: "Dónde se pierde tiempo." },
    { title: "Priorizar", text: "Impacto frente a esfuerzo." },
    { title: "Decidir", text: "Con horas y euros estimados." },
  ],
  matrix: {
    axisY: "Impacto",
    axisX: "Esfuerzo",
    // Orden: arriba-izquierda, arriba-derecha, abajo-izquierda, abajo-derecha.
    quadrants: [
      { label: "Primero", hint: "Alto impacto · poco esfuerzo" },
      { label: "Planificar", hint: "Alto impacto · más esfuerzo" },
      { label: "Después", hint: "Poco impacto · poco esfuerzo" },
      { label: "Replantear", hint: "Poco impacto · más esfuerzo" },
    ],
  },
  deliverables: {
    label: "Te llevas un plan con",
    items: ["Oportunidad", "Prioridad", "Impacto", "Inversión", "Medición"],
  },
  button: "Solicitar Diagnóstico Nexa",
}

export const resultados = {
  kicker: "Lo que recuperas",
  title: ["Menos tareas a mano.", "Más horas para ti."],
  scenario: "Simulación · Confirmar citas en una peluquería",
  hero: { value: 70, label: "menos tiempo manual" },
  before: { label: "Antes", hours: 10 },
  after: { label: "Después", hours: 3 },
  hourRate: 20,
  tasks: 5,
  button: "Hagamos las cuentas de tu negocio",
  footnote:
    "Simulación, no un caso real. Valor teórico del tiempo a 20 €/h: no es ahorro neto ni resultado garantizado.",
}

/**
 * TESTIMONIOS DE EJEMPLO.
 * Son textos ficticios para ver el diseño. Sustitúyelos por reseñas reales
 * (con permiso de cada cliente) antes de publicar: la normativa europea de
 * consumo prohíbe las reseñas falsas.
 */
export const testimonios = {
  kicker: "Lo que dicen",
  title: ["Negocios como el tuyo,", "con más tiempo."],
  tagline: "Peluquerías, clínicas, asesorías, talleres y autónomos.",
  items: [
    {
      name: "Laura M.",
      role: "Peluquería · Valencia",
      quote:
        "Antes perdía las mañanas confirmando citas. Ahora los recordatorios salen solos y yo solo contesto a quien cambia la hora.",
      service: "Automatización",
    },
    {
      name: "Javier R.",
      role: "Clínica dental · Zaragoza",
      quote:
        "El diagnóstico nos abrió los ojos: no necesitábamos IA para todo, solo ordenar la agenda y los seguimientos.",
      service: "Diagnóstico Nexa",
    },
    {
      name: "Marta G.",
      role: "Asesoría fiscal · Autónoma",
      quote:
        "Un CRM sencillo y ya no se me escapa ningún presupuesto. Sé a quién le falta respuesta sin revisar el correo entero.",
      service: "CRM",
    },
    {
      name: "Sergio P.",
      role: "Taller mecánico · Sevilla",
      quote:
        "La web nueva trae llamadas todas las semanas. Y me explicaron cada cosa sin tecnicismos.",
      service: "Web",
    },
    {
      name: "Nuria C.",
      role: "Tienda de decoración online",
      quote:
        "Dejamos de copiar pedidos a mano. Lo conectaron todo y ahora reviso excepciones, no filas.",
      service: "Automatización",
    },
    {
      name: "Álvaro D.",
      role: "Fisioterapeuta · Autónomo",
      quote:
        "Pedir reseñas después de cada sesión ahora sale solo. Respondo con un borrador que ya viene hecho.",
      service: "Reseñas",
    },
  ],
}

export const nosotros = {
  kicker: "Dos fundadores. Un mismo propósito.",
  title: ["Tecnología avanzada.", "Trato cercano."],
  quote: "Tú conoces tu negocio. Nosotros lo conectamos con lo que necesita.",
  values: [
    { title: "Escucharte", text: "Cómo trabajas hoy." },
    { title: "Implementar", text: "Sin parar tu actividad." },
    { title: "Acompañarte", text: "Mantenimiento y mejora." },
  ],
}

export const faqs = [
  {
    q: "¿Necesito IA para todo?",
    a: "No. Una cita se resuelve con un recordatorio y reglas. La IA entra cuando hay que interpretar un mensaje o preparar contenido.",
  },
  {
    q: "¿Qué es el Diagnóstico Nexa?",
    a: "Una revisión de cómo trabajas para ver dónde se pierde tiempo y decidir qué mejorar primero, con horas y euros estimados.",
  },
  {
    q: "¿Pierdo el trato personal con mis clientes?",
    a: "No. Automatizamos lo repetitivo. Las dudas, los cambios y las excepciones pasan siempre a tu equipo.",
  },
  {
    q: "¿El ahorro está garantizado?",
    a: "No. Es un valor teórico del tiempo. El resultado depende de tu operativa, por eso primero analizamos tu caso.",
  },
]

export const cta = {
  kicker: "El primer paso es una conversación",
  title: ["Tu próxima mejora", "empieza aquí."],
  text: "Cuéntanos qué te está quitando tiempo. Lo revisamos contigo.",
  example: "Tengo una clínica y confirmamos las citas a mano.",
  button: "Solicitar Diagnóstico Nexa",
  footer: "Te explicamos alcance y condiciones antes de concertarlo.",
}
