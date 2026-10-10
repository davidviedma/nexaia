/**
 * Copy del sitio. Extraído del documento "Nexa — Vista completa".
 */

export const nav = {
  links: [
    { label: "Servicios", href: "/#servicios" },
    { label: "Tu día a día", href: "/#tareas" },
    { label: "Método", href: "/#metodo" },
    { label: "Resultados", href: "/#resultados" },
    { label: "Opiniones", href: "/#testimonios" },
    { label: "Nosotros", href: "/#nosotros" },
  ],
  cta: "Pedir diagnóstico",
}

export const hero = {
  kicker: "Hola, somos Nexa IA",
  title: ["Tu negocio,", "con más tiempo", "para crecer."],
  subtitle: "Digitalización e IA para pymes.",
  words: ["Tiempo.", "Clientes.", "Tranquilidad."],
  primary: "Solicitar Diagnóstico Nexa",
  secondary: "Conoce Nexa IA",
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
  title: "La tecnología también es para tu pyme.",
  text: "Acercamos herramientas digitales e IA a tu negocio con una forma de trabajar sencilla, cercana y práctica.",
  pillars: [
    { title: "Sencilla", text: "Te explicamos cada paso." },
    { title: "Cercana", text: "Entendemos tu día a día." },
    { title: "Útil", text: "Priorizamos lo que aporta valor." },
  ],
}

export type Servicio = {
  id: "web" | "crm" | "automatizacion" | "redes"
  title: string
  text: string
  detail: string
}

export const servicios = {
  kicker: "Lo que podemos hacer",
  title: "Herramientas para tu día a día.",
  note: "La solución se elige después de entender el problema.",
  items: [
    {
      id: "web",
      title: "Web",
      text: "Facilita que te encuentren y te contacten.",
      detail:
        "Una web clara, rápida y pensada para que un cliente te escriba o te llame sin dar vueltas.",
    },
    {
      id: "crm",
      title: "CRM",
      text: "Ordena tus clientes y seguimientos.",
      detail:
        "Clientes, estado de cada propuesta y próxima acción en un mismo sitio. Nadie se queda sin respuesta.",
    },
    {
      id: "automatizacion",
      title: "Automatización",
      text: "Reduce tareas repetitivas.",
      detail:
        "Conectamos las herramientas que ya usas para que los pasos manuales desaparezcan y tú solo revises las excepciones.",
    },
    {
      id: "redes",
      title: "Redes sociales",
      text: "Comunica lo que haces y lo que ofreces.",
      detail:
        "Contenido con criterio y un sistema sencillo para publicar con constancia sin que te coma el día.",
    },
  ] satisfies Servicio[],
}

export const tareas = {
  kicker: "Tu día a día",
  number: "5",
  title: "tareas que se comen tu día.",
  subtitle: "Y cómo podrías simplificarlas.",
  footer:
    "Elige una tarea que repitas mucho y apunta dos datos: cuántas veces la haces y cuánto tardas cada vez.",
  items: [
    {
      label: "Consultas",
      title: "Responder siempre lo mismo.",
      problem: "Horarios, ubicación, servicios…",
      solution:
        "Respuestas preparadas y un asistente que derive las dudas al equipo.",
      note: "La atención personal sigue ahí.",
    },
    {
      label: "Citas",
      title: "Confirmar cada cita a mano.",
      problem: "Mensajes, llamadas y cambios de última hora.",
      solution:
        "Recordatorios conectados a la agenda y avisos cuando alguien necesite ayuda.",
      note: "Las excepciones pasan al equipo.",
    },
    {
      label: "Seguimientos",
      title: "Perder el hilo de los presupuestos.",
      problem: "¿A quién le falta respuesta?",
      solution:
        "Clientes, estado de cada propuesta y próxima acción en un mismo sitio.",
      note: "Un CRM ayuda a hacer seguimiento.",
    },
    {
      label: "Datos",
      title: "Copiar datos de un sitio a otro.",
      problem: "Formularios, correos y hojas de cálculo.",
      solution: "Conectar las herramientas y revisar las excepciones.",
      note: "Menos pasos manuales, más orden.",
    },
    {
      label: "Reseñas",
      title: "Dejar las reseñas para después.",
      problem: "Pedirlas y responderlas también lleva tiempo.",
      solution:
        "Solicitudes tras el servicio y borradores de respuesta que puedas revisar.",
      note: "Tu equipo mantiene el criterio.",
    },
  ],
}

export const proceso = {
  kicker: "Así trabajamos",
  title: "Primero entendemos tu negocio.",
  text: "Cuatro pasos, sin tecnicismos y sin parar tu actividad.",
  steps: [
    {
      title: "Diagnóstico",
      text: "Analizamos cómo trabajas.",
      points: [
        "Nos cuentas un día normal",
        "Detectamos dónde se pierde tiempo",
      ],
    },
    {
      title: "Propuesta",
      text: "Priorizamos las mejoras.",
      points: ["Qué hacer primero", "Impacto estimado en horas y euros"],
    },
    {
      title: "Implementación",
      text: "Las ponemos en marcha.",
      points: [
        "Conectamos las herramientas que ya usas",
        "Te explicamos cada paso",
      ],
    },
    {
      title: "Acompañamiento",
      text: "Seguimos a tu lado.",
      points: [
        "Revisamos las excepciones contigo",
        "Ajustamos lo que haga falta",
      ],
    },
  ],
}

/**
 * TESTIMONIOS DE EJEMPLO.
 * Son textos ficticios para ver el diseño. Sustitúyelos por reseñas reales
 * (con permiso de cada cliente) antes de publicar: la normativa europea de
 * consumo prohíbe las reseñas falsas. Pon `placeholder: false` cuando sean reales.
 */
export const testimonios = {
  kicker: "Lo que dicen",
  title: ["Negocios como el tuyo,", "con más tiempo."],
  placeholder: true,
  items: [
    {
      name: "Laura M.",
      role: "Peluquería · Valencia",
      quote:
        "Antes perdía las mañanas confirmando citas por WhatsApp. Ahora los recordatorios salen solos y yo solo contesto a quien cambia la hora.",
      service: "Automatización",
    },
    {
      name: "Javier R.",
      role: "Clínica dental · Zaragoza",
      quote:
        "El diagnóstico nos abrió los ojos: no necesitábamos IA para todo, solo ordenar la agenda y los seguimientos. Ahorro real desde el primer mes.",
      service: "Diagnóstico Nexa",
    },
    {
      name: "Marta G.",
      role: "Asesoría fiscal · Autónoma",
      quote:
        "Me montaron un CRM sencillo y ya no se me escapa ningún presupuesto. Sé a quién le falta respuesta sin revisar el correo entero.",
      service: "CRM",
    },
    {
      name: "Sergio P.",
      role: "Taller mecánico · Sevilla",
      quote:
        "La web nueva trae llamadas todas las semanas. Lo mejor es que me explicaron cada cosa como si fuera para mi abuelo.",
      service: "Web",
    },
    {
      name: "Nuria C.",
      role: "Tienda de decoración online",
      quote:
        "Dejamos de copiar pedidos a mano a la hoja de cálculo. Lo conectaron todo y ahora reviso excepciones, no filas.",
      service: "Automatización",
    },
    {
      name: "Álvaro D.",
      role: "Fisioterapeuta · Autónomo",
      quote:
        "Pedir reseñas después de cada sesión era lo que siempre dejaba para luego. Ahora sale solo y respondo con un borrador que ya viene hecho.",
      service: "Reseñas",
    },
  ],
}

export const diagnostico = {
  kicker: "Diagnóstico Nexa",
  title: "Antes de invertir, descubre por dónde empezar.",
  text: "Un plan claro para decidir qué merece la pena mejorar.",
  phases: [
    {
      n: "01",
      title: "Entender",
      lead: "Entendemos cómo trabajas.",
      text: "Nos cuentas qué pasa en un día normal.",
      items: [
        "Captación y atención",
        "Citas y reservas",
        "Administración y datos",
        "Tareas repetitivas",
      ],
    },
    {
      n: "02",
      title: "Detectar",
      lead: "Detectamos dónde se pierde tiempo.",
      text: "Buscamos el problema concreto.",
      items: [
        "Pasos manuales",
        "Información dispersa",
        "Seguimientos pendientes",
        "Tareas que se duplican",
      ],
    },
    {
      n: "03",
      title: "Priorizar",
      lead: "Priorizamos las mejoras.",
      text: "Ordenamos las oportunidades para ayudarte a decidir.",
      items: [
        "Qué hacer primero",
        "Qué esfuerzo requiere",
        "Impacto estimado en horas y euros",
        "Supuestos de cada estimación",
      ],
    },
  ],
  deliverables: {
    kicker: "Lo que te llevas",
    title: "Un plan claro. Una decisión con criterio.",
    items: [
      "Oportunidades detectadas",
      "Prioridades de actuación",
      "Impacto estimado",
      "Próximos pasos",
    ],
    footer: "Si avanzamos, implementamos las mejoras y te acompañamos después.",
  },
}

export const resultados = {
  kicker: "Lo que recuperas",
  title: ["Menos tareas a mano.", "Más horas para tu negocio."],
  text: "Tomamos una sola tarea, confirmar citas en una peluquería, y la conectamos a la agenda. Esto es lo que cambia.",
  hero: {
    value: 70,
    suffix: "%",
    prefix: "−",
    label: "menos tiempo confirmando citas",
    detail: "De 10 h a 3 h al mes. El equipo solo revisa excepciones.",
  },
  before: { label: "Antes · todo a mano", hours: 10 },
  after: { label: "Después · revisión y supervisión", hours: 3 },
  hourRate: 20,
  tasks: 5,
  uses: ["Atender mejor.", "Preparar el día.", "Hacer seguimiento."],
  flow: [
    "Cita registrada",
    "Recordatorio enviado",
    "Respuesta del cliente",
    "Agenda actualizada",
  ],
  footnote:
    "Escenario ilustrativo: 200 confirmaciones al mes × 3 minutos, valorando la hora a 20 €. No es un resultado real ni un ahorro garantizado: hay que considerar herramientas, implantación y mantenimiento. Un recordatorio puede funcionar con reglas, sin IA, y las dudas pasan siempre a una persona.",
}

export const nosotros = {
  kicker: "Por qué nacemos",
  title: "Dos emprendedores. Una idea muy clara.",
  quote: "Que la tecnología también trabaje para tu pyme.",
  text: "Creamos Nexa IA para acercarte herramientas que te ayuden en el día a día.",
  values: ["Escucharte.", "Entenderte.", "Acompañarte."],
  question: "¿Qué tarea te gustaría dejar de hacer a mano?",
}

export const faqs = [
  {
    q: "¿Necesito inteligencia artificial para todo?",
    a: "No. Muchas mejoras funcionan con reglas sencillas, sin IA. Por ejemplo, un recordatorio de cita conectado a la agenda. La IA entra solo cuando aporta valor real.",
  },
  {
    q: "¿Qué es exactamente el Diagnóstico Nexa?",
    a: "Una revisión de cómo trabajas para detectar dónde se pierde tiempo y priorizar las mejoras. Te llevas las oportunidades detectadas, las prioridades, el impacto estimado y los próximos pasos. Te explicamos alcance y condiciones antes de concertarlo.",
  },
  {
    q: "¿Pierdo el trato personal con mis clientes?",
    a: "No. La atención personal sigue ahí. Automatizamos lo repetitivo y las dudas, los cambios y las excepciones pasan siempre a una persona de tu equipo.",
  },
  {
    q: "¿El ahorro que calculáis está garantizado?",
    a: "No. Es un valor teórico del tiempo. El resultado depende de tu operativa, y hay que considerar herramientas, implantación y mantenimiento. Por eso primero analizamos tu caso.",
  },
]

export const cta = {
  kicker: "Tu siguiente paso",
  title: "Cuéntanos qué te está quitando tiempo.",
  text: "Solicita el Diagnóstico Nexa. Revisamos tu negocio y priorizamos las mejoras.",
  questions: ["¿A qué te dedicas?", "¿Qué tarea te quita más tiempo?"],
  button: "Solicitar Diagnóstico Nexa",
  footer: "Te explicamos alcance y condiciones antes de concertarlo.",
}
