/**
 * Fuente única de datos del negocio.
 * De acá salen: el texto visible, el JSON-LD, /llms.txt y los links de WhatsApp.
 * Regla: lo que no está confirmado queda vacío y NO se muestra en la web.
 */

export const site = {
  name: 'Traka',
  tagline: 'Que te encuentren.',
  url: 'https://trakadigital.com',
  description: 'Webs simples y Perfil de Empresa en Google para comercios y pymes. Precio cerrado, plazos por escrito y una persona que responde por WhatsApp.',

  // Formato internacional sin "+": 54 9 223 6769943 (Mar del Plata).
  whatsapp: '5492236769943',
  // TODO(cliente): email de contacto.
  email: '',
  // TODO(cliente): URL del perfil de Instagram.
  instagram: '',
  // TODO(cliente): URL del Perfil de Empresa en Google.
  googleBusiness: '',

  city: 'Mar del Plata',
  region: 'Buenos Aires',
  country: 'AR',
  // TODO(cliente): calle y número. Vacío = no se publica dirección (negocio sin local a la calle).
  street: '',
  areaServed: ['Argentina', 'España'],
  // TODO(cliente): horarios de atención confirmados, ej. [{ d: 'Lunes a viernes', h: '9:00 a 18:00' }].
  hours: [] as { d: string; h: string }[],

  // Datos fiscales para las páginas legales. Se muestran solo cuando están completos.
  legal: {
    // TODO(cliente): razón social / titular.
    holder: '',
    // TODO(cliente): CUIT.
    taxId: '',
  },

  // Medición: el ID va en .env (PUBLIC_GA_ID). Vacío = no se carga nada.
  gaId: import.meta.env?.PUBLIC_GA_ID ?? '',
} as const;

export const SITE_URL = site.url;

/**
 * Link de WhatsApp con mensaje precargado. Sin número devuelve "#" (botón visible, sin conectar).
 *
 * `campaign` agrega los UTM que pide el brief. Aviso honesto: wa.me ignora todo
 * parámetro que no sea `phone` o `text`, así que estos UTM no los lee nadie —
 * la medición real es el evento `whatsapp_click` de GA4, que lleva el mismo slug.
 */
export function waHref(message: string, campaign?: string): string {
  if (!site.whatsapp) return '#';
  const q = new URLSearchParams({ text: message });
  if (campaign) {
    q.set('utm_source', 'web');
    q.set('utm_medium', 'cta');
    q.set('utm_campaign', campaign);
  }
  return `https://wa.me/${site.whatsapp}?${q}`;
}

/* ---------------------------------------------------------------- servicios */

export type Servicio = {
  id: string;
  name: string;
  price: string;
  /** Aclaración debajo del precio, cuando hace falta explicarlo. */
  priceNote?: string;
  summary: string;
  items: readonly string[];
  cta: string;
  message: string;
  icon: string;
  featured?: boolean;
  /** Página propia del servicio, cuando existe. */
  page?: string;
  /** Todo lo que necesita la página del servicio. */
  detalle?: {
    title: string;
    description: string;
    kicker: string;
    h1: string;
    intro: string;
    plazo: string;
    alcance: string;
    precioNota: string;
    incluye: readonly { t: string; d: string; icon: string }[];
    casos: readonly { t: string; d: string }[];
    faqs: readonly { q: string; a: string }[];
  };
};

export const servicios: readonly Servicio[] = [
  {
    id: 'web',
    name: 'Desarrollo de páginas web',
    price: 'Desde $200.000',
    summary: 'Tu web propia, pensada primero para el celular y para que te escriban.',
    items: [
      'Diseño y desarrollo a medida',
      'Textos y estructura incluidos',
      'Botón de WhatsApp en cada sección',
      'Medición de las consultas que entran',
    ],
    cta: 'Quiero mi web',
    message: 'Hola, quiero una web para mi negocio. Vi que arrancan en $200.000.',
    icon: 'ph:browsers-bold',
    featured: true,
    page: '/servicios/desarrollo-web/',
    detalle: {
      title: 'Diseño y desarrollo web desde $200.000 | Traka',
      description: 'Diseñamos y programamos tu web desde cero, pensada para el celular y con botón de WhatsApp. Desde $200.000 y lista en 3 a 4 semanas.',
      kicker: 'Desarrollo web',
      h1: 'Desarrollo de páginas web que traen consultas.',
      intro: 'Diseñamos y programamos tu web desde cero, pensada primero para el celular: quién sos, qué hacés, dónde estás y un botón para escribirte.',
      plazo: '3 a 4 semanas',
      alcance: 'Hasta 5 secciones',
      precioNota: 'El precio final depende del alcance: cuántas secciones necesitás y cuánto material (textos, fotos, logo) tengas listo. Lo cerramos antes de empezar y no se mueve.',
      incluye: [
        { t: 'Diseño propio, sin plantillas', d: 'El diseño sale de tu marca y de lo que vende tu negocio, no de un tema comprado.', icon: 'ph:paint-brush-broad-bold' },
        { t: 'Pensada para el celular', d: 'Se arma primero en pantalla chica, que es por donde te va a entrar casi todo el mundo.', icon: 'ph:device-mobile-bold' },
        { t: 'Textos incluidos', d: 'Escribimos las secciones con vos. No te dejamos un documento vacío para completar.', icon: 'ph:text-aa-bold' },
        { t: 'WhatsApp en cada sección', d: 'Cada botón abre el chat con el mensaje ya escrito según la página donde está.', icon: 'ph:whatsapp-logo-bold' },
        { t: 'Carga rápida', d: 'Sin plugins de más ni librerías pesadas: la web abre rápido también con datos del celular.', icon: 'ph:lightning-bold' },
        { t: 'Medición desde el día uno', d: 'Analytics configurado, para ver qué secciones traen consultas y cuáles no.', icon: 'ph:chart-line-up-bold' },
      ],
      casos: [
        { t: 'No tenés web', d: 'Hoy te encuentran por Instagram o de boca en boca, y se te caen consultas en el camino.' },
        { t: 'Tenés una, pero vieja', d: 'En el celular se ve mal, tarda en cargar o muestra datos que ya no son.' },
        { t: 'Tenés web y nadie escribe', d: 'Entra gente pero no pasa nada: no se entiende qué hacés o no hay por dónde contactarte.' },
        { t: 'Vendés por WhatsApp', d: 'Querés un lugar propio que te presente bien antes de que te escriban.' },
      ],
      faqs: [
        { q: '¿Cuánto tarda una web?', a: 'Entre 3 y 4 semanas desde que tenemos el material y el alcance acordado. El plazo queda por escrito antes de empezar.' },
        { q: '¿Qué necesitás de mí?', a: 'Tu logo si lo tenés, fotos de tu negocio y un rato para contarnos cómo trabajás. Si no tenés fotos, lo charlamos antes de arrancar.' },
        { q: '¿Qué incluye el precio?', a: 'Diseño, desarrollo, textos, el botón de WhatsApp y la medición. Desde $200.000; el precio final depende del alcance y te llega por escrito.' },
        { q: '¿El posicionamiento en Google va aparte?', a: 'Sí. La web sale bien armada y rápida, que es la base, pero trabajar el posicionamiento es otro servicio: lo ves en posicionamiento SEO.' },
        { q: '¿Hacen tiendas online?', a: 'No. Hacemos webs simples que traen consultas: quién sos, qué hacés, dónde estás y cómo escribirte.' },
        { q: '¿La web es mía?', a: 'Sí. El material que creamos para vos queda a tu nombre una vez cancelado el trabajo.' },
      ],
    },
  },
  {
    id: 'seo',
    name: 'Posicionamiento SEO',
    price: 'Desde $150.000',
    priceNote: 'Se presupuesta con cada cliente según el rubro y la competencia que haya.',
    summary: 'Que aparezcas cuando alguien busca lo que hacés, en Google y en Maps.',
    items: [
      'Búsquedas por las que te conviene aparecer',
      'Perfil de Empresa en Google optimizado',
      'SEO técnico y contenido de la web',
      'Informe de lo que entra, con números',
    ],
    cta: 'Quiero aparecer en Google',
    message: 'Hola, quiero trabajar el posicionamiento en Google de mi negocio. Vi que arranca en $150.000.',
    icon: 'ph:magnifying-glass-bold',
    page: '/servicios/posicionamiento-seo/',
    detalle: {
      title: 'Posicionamiento SEO desde $150.000 | Traka',
      description: 'Trabajamos tu posicionamiento en Google y en Maps: búsquedas, SEO técnico, contenido y Perfil de Empresa. Desde $150.000, con informe de lo que entra.',
      kicker: 'Posicionamiento SEO',
      h1: 'Posicionamiento SEO: que te encuentren cuando te buscan.',
      intro: 'Primero vemos por qué búsquedas te conviene aparecer y cómo estás hoy. Después trabajamos la web, tu Perfil de Empresa en Google y el contenido, y te mostramos qué cambia con números.',
      plazo: 'Primeros cambios en 30 días',
      alcance: 'Web + Perfil de Empresa',
      precioNota: 'El SEO se presupuesta con cada cliente: depende del rubro, de la competencia que tengas en tu zona y de cómo esté la web hoy. Arranca en $150.000 y lo cerramos antes de empezar.',
      incluye: [
        { t: 'Las búsquedas que importan', d: 'Qué escribe la gente para encontrar lo que hacés, y cuáles de esas búsquedas te pueden traer consultas de verdad.', icon: 'ph:magnifying-glass-bold' },
        { t: 'SEO técnico', d: 'Títulos, descripciones, encabezados, datos estructurados, sitemap y velocidad de carga.', icon: 'ph:wrench-bold' },
        { t: 'Perfil de Empresa en Google', d: 'Categorías, servicios, zona de cobertura, horarios y fotos, cargados como Google los pide, para aparecer en Maps.', icon: 'ph:map-pin-bold' },
        { t: 'Plan de reseñas', d: 'Un sistema simple para pedirlas después de cada trabajo y un criterio para responderlas todas.', icon: 'ph:star-bold' },
        { t: 'Contenido que responde dudas', d: 'Las preguntas que ya te hacen, escritas en la web, que es lo que Google busca para mostrarte.', icon: 'ph:text-aa-bold' },
        { t: 'Informe con números', d: 'Search Console y Analytics configurados: qué buscó la gente, qué páginas aparecen y cuántos escribieron.', icon: 'ph:chart-bar-bold' },
      ],
      casos: [
        { t: 'No aparecés cuando te buscan', d: 'Buscan tu rubro en tu zona y aparecen todos menos vos.' },
        { t: 'Tenés web pero no entra nadie', d: 'La web está linda y publicada, pero no llega gente desde Google.' },
        { t: 'No estás en Maps', d: 'Tu negocio no figura en el mapa, o figura con datos que ya no son.' },
        { t: 'Te hicieron SEO y no viste nada', d: 'Pagaste y nunca te mostraron un número. Acá el informe es parte del trabajo.' },
      ],
      faqs: [
        { q: '¿Me garantizan el primer puesto?', a: 'No, y desconfiá de quien te lo prometa: el orden lo decide Google. Lo que hacemos es trabajar todo lo que sí está en nuestras manos y mostrarte con datos qué se movió.' },
        { q: '¿Cuánto tarda en verse?', a: 'Los primeros cambios técnicos se ven en unos 30 días. Posicionar una búsqueda con competencia lleva más: lo charlamos al presupuestar, con lo que vemos de tu rubro.' },
        { q: '¿Cuánto sale?', a: 'Arranca en $150.000 y se presupuesta con cada cliente, porque depende del rubro, de la competencia de tu zona y de cómo esté la web hoy.' },
        { q: '¿Sirve si no tengo web?', a: 'Se puede trabajar el Perfil de Empresa en Google sin web, y ya es un salto. Pero para posicionar en serio conviene tener una: lo vemos juntos antes de arrancar.' },
        { q: '¿Qué es el Perfil de Empresa en Google?', a: 'Es la ficha que aparece en Google y en Maps cuando alguien busca tu negocio o tu rubro: dirección, horarios, fotos, reseñas y botón para escribirte. Antes se llamaba Google Mi Negocio.' },
        { q: '¿Es un pago único o mensual?', a: 'Hay un trabajo inicial, que es el que arranca en $150.000, y después podés seguir con un acompañamiento mensual. Lo segundo es opcional y se charla aparte.' },
      ],
    },
  },
  {
    id: 'medida',
    name: 'Plataformas a medida',
    price: 'A presupuesto',
    priceNote: 'Depende del tamaño y del tiempo que lleve hacerlo, por eso lo charlamos antes.',
    summary: 'Sistemas internos, paneles y plataformas propias para lo que tu negocio necesita.',
    items: [
      'Relevamiento de lo que hacés hoy',
      'Presupuesto cerrado antes de empezar',
      'Desarrollo a medida',
      'Soporte después de entregar',
    ],
    cta: 'Pedir presupuesto',
    message: 'Hola, necesito una plataforma a medida y quiero pedir un presupuesto.',
    icon: 'ph:squares-four-bold',
    page: '/servicios/plataformas-a-medida/',
    detalle: {
      title: 'Plataformas a medida para tu negocio | Traka',
      description: 'Sistemas internos, paneles y plataformas propias para lo que tu negocio necesita. Relevamiento, presupuesto cerrado y soporte después de entregar.',
      kicker: 'A medida',
      h1: 'Plataformas a medida para lo que tu negocio necesita.',
      intro: 'Cuando la planilla ya no alcanza y ningún sistema del mercado hace exactamente lo que hacés, lo construimos. Primero entendemos tu trabajo, después lo programamos.',
      plazo: 'Según el alcance',
      alcance: 'A definir juntos',
      precioNota: 'No hay precio de lista porque no hay dos plataformas iguales. Relevamos cómo trabajás, te damos un presupuesto cerrado y recién entonces se arranca.',
      incluye: [
        { t: 'Relevamiento primero', d: 'Nos sentamos a ver cómo trabajás hoy, paso por paso, antes de proponer nada.', icon: 'ph:clipboard-text-bold' },
        { t: 'Presupuesto cerrado', d: 'Alcance, plazo y precio por escrito antes de escribir la primera línea de código.', icon: 'ph:file-text-bold' },
        { t: 'Desarrollo a medida', d: 'Se construye para tu forma de trabajar, no al revés.', icon: 'ph:code-bold' },
        { t: 'Entrada por usuario', d: 'Cada persona entra con su cuenta y ve lo que le toca ver.', icon: 'ph:users-bold' },
        { t: 'Entrega en etapas', d: 'Lo vas viendo funcionar mientras se hace, no al final de todo.', icon: 'ph:steps-bold' },
        { t: 'Soporte después', d: 'Queda andando y acompañado. Si algo falla, hay alguien que responde.', icon: 'ph:lifebuoy-bold' },
      ],
      casos: [
        { t: 'Vivís en planillas', d: 'Tenés diez archivos que nadie más entiende y se rompen cuando los toca otra persona.' },
        { t: 'Ningún sistema te sirve', d: 'Probaste herramientas del mercado y ninguna hace exactamente lo que hacés.' },
        { t: 'Cargás lo mismo dos veces', d: 'El mismo dato va a mano a dos lugares distintos, y alguna vez no coincide.' },
        { t: 'No sabés en qué estás', d: 'Para saber cómo viene el mes hay que sentarse a sumar a mano.' },
      ],
      faqs: [
        { q: '¿Cuánto sale una plataforma?', a: 'No hay precio de lista: depende del tamaño y del tiempo que lleve. Relevamos cómo trabajás y te damos un presupuesto cerrado antes de arrancar.' },
        { q: '¿Cuánto tarda?', a: 'Según el alcance. Lo partimos en etapas y vas viendo funcionar cada una, con los plazos por escrito.' },
        { q: '¿Y si necesito cambios después?', a: 'Se pueden hacer. Los cambios chicos entran en el soporte; si es algo grande, se presupuesta aparte.' },
        { q: '¿La plataforma es mía?', a: 'Sí. Lo que construimos para vos queda a tu nombre una vez cancelado el trabajo.' },
        { q: '¿Se puede conectar con lo que ya uso?', a: 'En general sí, si la otra herramienta lo permite. Es una de las primeras cosas que miramos en el relevamiento.' },
        { q: '¿Sirve para un negocio chico?', a: 'Sí. No se trata del tamaño, sino de si tenés un proceso propio que ninguna herramienta cubre.' },
      ],
    },
  },
  {
    id: 'redes',
    name: 'Redes sociales',
    price: 'Desde $100.000',
    summary: 'Tus redes diciendo qué hacés, cómo contactarte y por qué elegirte.',
    items: [
      'Bio, enlaces y destacados al día',
      'Identidad visual aplicada',
      'Plantillas para que sigas vos',
      'Alineado con lo que dice tu web',
    ],
    cta: 'Quiero ordenar mis redes',
    message: 'Hola, quiero poner a punto las redes de mi negocio. Vi que arranca en $100.000.',
    icon: 'ph:instagram-logo-bold',
    page: '/servicios/redes-sociales/',
    detalle: {
      title: 'Redes sociales para tu negocio desde $100.000 | Traka',
      description: 'Ponemos a punto tus redes: bio, enlaces, destacados, identidad visual y plantillas para que sigas vos. Desde $100.000, en unos 10 días.',
      kicker: 'Redes sociales',
      h1: 'Redes que dicen qué hacés y cómo escribirte.',
      intro: 'Mucha gente te va a buscar primero en Instagram. Dejamos tu perfil diciendo a qué te dedicás, dónde estás y cómo contactarte, con la misma identidad que tu web.',
      plazo: 'Unos 10 días',
      alcance: 'Puesta a punto',
      precioNota: 'El precio depende de cuántas redes haya que poner a punto y de cuánto material tengas listo. Esto es la puesta a punto, no la gestión mensual.',
      incluye: [
        { t: 'Bio y enlaces', d: 'Qué hacés, dónde estás y un enlace que lleve a donde querés que vayan.', icon: 'ph:link-bold' },
        { t: 'Destacados ordenados', d: 'Las dudas de siempre y lo que más vendés, a un toque y con portada propia.', icon: 'ph:bookmark-bold' },
        { t: 'Identidad aplicada', d: 'Los colores y la tipografía de tu marca, los mismos de la web, puestos en el perfil.', icon: 'ph:palette-bold' },
        { t: 'Plantillas para seguir vos', d: 'Te dejamos piezas armadas y editables, para que publicar no dependa de nosotros.', icon: 'ph:layout-bold' },
        { t: 'Datos de contacto', d: 'Botones de WhatsApp y de ubicación configurados, para que te escriban desde ahí.', icon: 'ph:whatsapp-logo-bold' },
        { t: 'Alineado con la web', d: 'Lo que dice el perfil y lo que dice la web cuentan la misma historia.', icon: 'ph:arrows-left-right-bold' },
      ],
      casos: [
        { t: 'Tu perfil no dice qué hacés', d: 'Entran, leen la bio y se van sin entender a qué te dedicás.' },
        { t: 'No hay por dónde escribirte', d: 'Tienen que preguntar por mensaje privado porque no hay botón ni enlace.' },
        { t: 'Cada posteo parece de otra marca', d: 'Colores y tipografías distintas en cada pieza, sin un criterio que se repita.' },
        { t: 'No sabés qué publicar', d: 'Querés mantenerlo vivo pero cada vez arrancás de cero.' },
      ],
      faqs: [
        { q: '¿Me manejan las redes todos los meses?', a: 'Esto es la puesta a punto, no la gestión mensual. Si querés que publiquemos todos los meses, lo charlamos aparte.' },
        { q: '¿Qué redes incluye?', a: 'Normalmente Instagram y Facebook, que son las que más usan los negocios con los que trabajamos. Si usás otra, decinos y lo vemos.' },
        { q: '¿Necesito tener fotos?', a: 'Ayuda mucho. Si no tenés, lo charlamos antes de arrancar y vemos cómo resolverlo.' },
        { q: '¿Y el Perfil de Empresa en Google?', a: 'Ese va en posicionamiento SEO, porque es lo que te hace aparecer en Google y en Maps. Son dos cosas distintas y se pueden hacer juntas.' },
        { q: '¿Cuánto tarda?', a: 'Unos 10 días desde que tenemos el material. Si hay que crear perfiles desde cero, puede llevar un poco más.' },
        { q: '¿Qué me queda al terminar?', a: 'El perfil puesto a punto y las plantillas editables, para que puedas seguir publicando vos.' },
      ],
    },
  },
];

/** Servicio a partir del slug de su página: 'desarrollo-web' -> el servicio web. */
export function servicioPorSlug(slug: string): Servicio | undefined {
  return servicios.find((s) => s.page === `/servicios/${slug}/`);
}

/** Los tres servicios que tienen páginas por ciudad, en orden. */
export const serviciosConCiudad = ['desarrollo-web', 'posicionamiento-seo', 'plataformas-a-medida'] as const;

export const notaPrecios = 'Precios en pesos argentinos. El precio final te llega por escrito antes de empezar.';

/* ------------------------------------------------- selector ¿Qué necesitás? */

export const needs = [
  {
    id: 'google',
    label: 'Que me encuentren en Google',
    hint: 'No aparecés en Maps o tu ficha está desactualizada.',
    icon: 'ph:map-pin-bold',
    svc: 'Google y redes sociales',
    message: 'Hola, quiero que mi negocio aparezca en Google y en Maps. Te cuento: ',
  },
  {
    id: 'web',
    label: 'Una web nueva',
    hint: 'No tenés web, o la que tenés ya no te representa.',
    icon: 'ph:browsers-bold',
    svc: 'Desarrollo de páginas web',
    message: 'Hola, quiero una web nueva para mi negocio. Te cuento: ',
  },
  {
    id: 'consultas',
    label: 'Que mi web traiga consultas',
    hint: 'Tenés web, pero no te escribe nadie.',
    icon: 'ph:chat-circle-dots-bold',
    svc: 'Desarrollo de páginas web',
    message: 'Hola, tengo web pero casi no recibo consultas. Te cuento: ',
  },
  {
    id: 'mantener',
    label: 'Mantener y medir lo que ya tengo',
    hint: 'Querés que alguien se ocupe todos los meses.',
    icon: 'ph:chart-line-up-bold',
    svc: 'Google y redes sociales',
    message: 'Hola, quiero mantener y medir la web y el Perfil de Empresa que ya tengo. Te cuento: ',
  },
] as const;

/* ------------------------------------------------------- los tres pasos */

/** Cada paso del recorrido de un cliente, con el servicio que lo resuelve. */
export const pasos = [
  {
    n: '01',
    t: 'Te encuentran',
    servicio: 'seo',
    d: 'Alguien busca lo que hacés. Aparecés en Google, en Maps y en tu Perfil de Empresa, con horarios, fotos y reseñas al día.',
    tags: ['Google', 'Maps', 'Perfil de Empresa'],
    icon: 'ph:magnifying-glass-bold',
  },
  {
    n: '02',
    t: 'Te eligen y te escriben',
    servicio: 'web',
    d: 'Entran a tu web desde el celular, entienden en segundos qué hacés y te escriben por WhatsApp de un toque.',
    tags: ['Web clara', 'Para celular', 'WhatsApp'],
    icon: 'ph:device-mobile-bold',
  },
  {
    n: '03',
    t: 'Te ordenás por dentro',
    servicio: 'medida',
    d: 'Cuando entran más consultas de las que podés seguir en un cuaderno, armamos la herramienta que lo ordena.',
    tags: ['Panel propio', 'Sin planillas', 'A medida'],
    icon: 'ph:squares-four-bold',
  },
] as const;

/* ----------------------------------------------------------------- proceso */

export const steps = [
  { t: 'Escuchamos', d: 'Nos contás cómo funciona tu negocio y qué querés que pase.' },
  { t: 'Plan a medida', d: 'Te pasamos alcance, plazo y precio cerrado, por escrito.' },
  { t: 'Conectamos', d: 'Armamos tu Perfil de Empresa en Google, tu web y tu botón de WhatsApp.' },
  { t: 'Ponemos en marcha', d: 'Publicamos, medimos las consultas y te mostramos los números.' },
] as const;

/* --------------------------------------------------------------------- faq */

export const faqs = [
  {
    q: '¿Cuánto cuesta?',
    a: 'Las webs arrancan en $200.000 y la mejora de tu Perfil de Empresa en Google y tus redes, en $100.000. Las herramientas a medida van a presupuesto, porque dependen del tamaño y del tiempo de desarrollo. En todos los casos el precio final te llega por escrito antes de empezar.',
  },
  {
    q: '¿Me prometen aparecer primeros en Google?',
    a: 'No. Nadie puede prometerlo. Lo que sí hacemos es que te encuentren más, y te lo mostramos con datos: llamadas, mensajes de WhatsApp y consultas.',
  },
  {
    q: '¿Cuánto tarda?',
    a: 'Una web, entre 3 y 4 semanas. El Perfil de Empresa en Google, unos 10 días. Las herramientas a medida dependen del alcance. Los plazos quedan por escrito antes de empezar.',
  },
  {
    q: '¿Qué es el Perfil de Empresa en Google?',
    a: 'Es la ficha que aparece en Google y en Maps cuando alguien busca tu negocio o tu rubro: dirección, horarios, fotos, reseñas y botón para llamarte. Antes se llamaba Google Mi Negocio.',
  },
  {
    q: '¿Hacen tiendas online?',
    a: 'No. Hacemos webs simples que traen consultas: quién sos, qué hacés, dónde estás y cómo escribirte.',
  },
  {
    q: '¿Con quién hablo?',
    a: 'Con una sola persona, por WhatsApp. No hay call centers ni tickets.',
  },
] as const;
