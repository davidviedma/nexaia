/**
 * Copy del sitio. Extraído de los documentos "Nexa — Vista completa" y "Nexa AI V2".
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
  title: "La tecnología también es para tu pyme.",
  text: "Acercamos herramientas digitales e IA a tu negocio con una forma de trabajar sencilla, cercana y práctica. La tecnología se adapta a tu operativa, no al revés.",
  pillars: [
    { title: "Sencilla", text: "Te explicamos cada paso." },
    { title: "Cercana", text: "Entendemos tu día a día." },
    { title: "Útil", text: "Priorizamos lo que aporta valor." },
  ],
  stat: {
    value: 21.1,
    suffix: "%",
    label: "de las empresas españolas de 10 o más empleados ya usaban IA",
    detail: "en el primer trimestre de 2025.",
    note: "Tu punto de partida es una necesidad concreta.",
    source: "Fuente: INE, ETICCE 2024–1T 2025 (publicado el 22/10/2025).",
  },
}

export type Servicio = {
  id: "web" | "crm" | "automatizacion" | "ia"
  title: string
  text: string
  detail: string
}

export const servicios = {
  kicker: "Cada pieza, con una función",
  title: "Herramientas para tu día a día.",
  note: "La tecnología se adapta a tu operativa. La solución se elige después de entender el problema.",
  items: [
    {
      id: "web",
      title: "Web y redes",
      text: "Captar clientes y comunicar mejor.",
      detail: "Que te encuentren y entiendan por qué elegirte.",
    },
    {
      id: "crm",
      title: "CRM",
      text: "Hacer seguimiento.",
      detail: "Que cada cliente y cada presupuesto tengan un próximo paso.",
    },
    {
      id: "automatizacion",
      title: "Automatización",
      text: "Agilizar tareas.",
      detail: "Que las tareas repetitivas requieran menos trabajo manual.",
    },
    {
      id: "ia",
      title: "IA aplicada",
      text: "Atender con más agilidad.",
      detail:
        "Que las consultas y la información se gestionen con más agilidad.",
    },
  ] satisfies Servicio[],
  compare: {
    kicker: "Elegir bien la solución",
    title: "Cada tarea pide una solución distinta.",
    text: "La IA aporta valor cuando la tarea lo necesita.",
    items: [
      {
        title: "Automatización",
        from: "Una cita",
        to: "Un recordatorio",
        text: "Para acciones con reglas definidas.",
      },
      {
        title: "IA aplicada",
        from: "Un mensaje libre",
        to: "Entender la consulta",
        text: "Para interpretar o preparar contenido.",
      },
    ],
    footer: "Las situaciones que necesitan criterio pasan al equipo.",
  },
}

export const tareas = {
  kicker: "Tu día a día",
  number: "5",
  title: "tareas que se comen tu día.",
  subtitle: "Y cómo podrías simplificarlas.",
  hook: {
    lead: "Solo son 20 minutos al día.",
    punch: "Hasta que miras el mes.",
    value: "7 h 20 min",
    detail: "en una misma tarea, cada mes · 20 min × 22 días laborables",
  },
  traits: [
    "Se repiten mucho",
    "Tienen pasos claros",
    "Consumen tiempo medible",
  ],
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
  text: "Revisamos cómo trabajas y elegimos contigo qué conviene mejorar primero. Sin tecnicismos y sin parar tu actividad.",
  steps: [
    {
      title: "Diagnóstico",
      text: "Dónde se pierde tiempo.",
      points: [
        "Cómo llegan tus clientes y cómo los atiendes",
        "Qué ocurre entre una tarea y la siguiente",
      ],
    },
    {
      title: "Propuesta",
      text: "Qué impacto puede tener la mejora.",
      points: [
        "Cruzamos impacto, esfuerzo y facilidad de adopción",
        "Horas y euros estimados, con supuestos",
      ],
    },
    {
      title: "Implementación",
      text: "Configuramos y conectamos la solución.",
      points: ["Probamos el proceso contigo", "Sin parar tu actividad"],
    },
    {
      title: "Acompañamiento",
      text: "Mantenemos y mejoramos su funcionamiento.",
      points: ["Mantenimiento y mejora continua", "Revisamos lo que medimos"],
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
  title: "Antes de invertir, ten un plan.",
  text: "Detectamos oportunidades y priorizamos qué merece la pena mejorar primero.",
  phases: [
    {
      n: "01",
      title: "Entender",
      lead: "Miramos el negocio desde dentro.",
      text: "Cómo llegan tus clientes, cómo los atiendes y qué ocurre entre una tarea y la siguiente.",
      items: [
        "Captación y atención",
        "Citas y reservas",
        "Administración y datos",
        "Repeticiones",
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
      lead: "No todas las mejoras van primero.",
      text: "Cruzamos impacto, esfuerzo y facilidad de adopción.",
      items: [
        "Primero: alto impacto, esfuerzo contenido",
        "Planificar: alto impacto, más esfuerzo",
        "Después: impacto limitado, esfuerzo contenido",
        "Replantear: impacto limitado, más esfuerzo",
      ],
    },
    {
      n: "04",
      title: "Decidir",
      lead: "Saber qué hacer. Y saber por qué.",
      text: "Una estimación explicada para tomar una decisión informada.",
      items: [
        "Qué problema resolvemos y por qué empezar ahí",
        "Horas y euros estimados, con supuestos",
        "Qué implica ponerla en marcha",
        "Qué revisaremos después",
      ],
    },
  ],
  deliverables: {
    kicker: "Tu plan de mejora",
    title: "Saber qué hacer. Y saber por qué.",
    items: [
      { title: "Oportunidad", text: "Qué problema queremos resolver." },
      { title: "Prioridad", text: "Por qué empezar por esa mejora." },
      { title: "Impacto", text: "Horas y euros estimados, con supuestos." },
      { title: "Inversión", text: "Qué implica ponerla en marcha." },
      { title: "Medición", text: "Qué revisaremos después." },
    ],
    footer:
      "Y después lo ponemos en marcha: configuramos y conectamos la solución, probamos el proceso contigo y mantenemos su funcionamiento.",
  },
}

export const resultados = {
  kicker: "Lo que recuperas",
  title: ["Menos tareas a mano.", "Más horas para tu negocio."],
  text: "Simulación con una sola tarea: confirmar citas en una peluquería, conectada a la agenda. Un cálculo explicado, no un resultado de cliente.",
  hero: {
    value: 70,
    suffix: "%",
    prefix: "−",
    label: "de tiempo manual en este escenario",
    detail:
      "De 10 h a 3 h al mes. Un flujo con reglas: las dudas y los cambios pasan al equipo.",
  },
  before: { label: "Antes · todo a mano", hours: 10 },
  after: { label: "Después · revisión y supervisión", hours: 3 },
  hourRate: 20,
  tasks: 5,
  uses: ["Volumen real.", "Trabajo restante.", "Coste completo."],
  usesLead:
    "Primero calculamos, después decidimos. El resultado de tu negocio depende de",
  flow: [
    "Cita registrada",
    "Recordatorio enviado",
    "Respuesta del cliente",
    "Agenda actualizada",
  ],
  footnote:
    "Simulación · Peluquería · No es un caso real. 200 confirmaciones al mes × 3 minutos; después, 200 revisiones de 30 segundos más 80 minutos de excepciones y supervisión. Valor teórico de capacidad a 20 €/h: no es ahorro neto ni beneficio garantizado. Para decidir hay que considerar inversión, herramientas, mantenimiento y uso del tiempo.",
}

export const nosotros = {
  kicker: "Dos fundadores. Un mismo propósito.",
  title: "Tecnología avanzada. Trato cercano.",
  quote: "Tú conoces tu negocio. Nosotros lo conectamos con lo que necesita.",
  text: "Creamos Nexa IA para acercar a tu pyme herramientas que le hagan el día más fácil. Una relación cercana, de principio a fin.",
  values: ["Escucharte.", "Implementar.", "Acompañarte."],
  question: "¿Qué parte de tu día te gustaría simplificar?",
  split: {
    title: "Tú marcas el objetivo. Nosotros lo llevamos a la práctica.",
    yours: {
      title: "Tu parte",
      items: [
        "Contarnos cómo trabajas.",
        "Elegir qué quieres mejorar.",
        "Decidir con información.",
      ],
    },
    ours: {
      title: "Nuestra parte",
      items: [
        "Analizar las oportunidades.",
        "Implementar la solución.",
        "Acompañar su evolución.",
      ],
    },
    footer: "Trabajamos contigo en cada decisión importante.",
  },
  expect: [
    {
      title: "Claridad",
      text: "Qué cambia, para qué y cómo medirlo.",
    },
    {
      title: "Compromiso",
      text: "Nos ocupamos de ponerlo en marcha.",
    },
    {
      title: "Continuidad",
      text: "Mantenimiento y mejora continua.",
    },
  ],
}

export const faqs = [
  {
    q: "¿Necesito inteligencia artificial para todo?",
    a: "No. Cada tarea pide una solución distinta. Una cita se resuelve con un recordatorio y reglas definidas, sin IA. La IA aplicada entra cuando hay que interpretar un mensaje libre o preparar contenido. Y lo que necesita criterio pasa siempre al equipo.",
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
  kicker: "El primer paso es una conversación",
  title: ["Tu próxima mejora", "empieza aquí."],
  text: "Cuéntanos qué te está quitando tiempo. Lo revisamos contigo.",
  questions: [
    "¿A qué se dedica tu negocio?",
    "¿Qué te está quitando más tiempo?",
    "¿Cómo lo estás gestionando ahora?",
  ],
  example: "Tengo una clínica y confirmamos las citas a mano.",
  button: "Solicitar Diagnóstico Nexa",
  footer:
    "Te explicamos el siguiente paso, el alcance y las condiciones antes de concertarlo.",
}
