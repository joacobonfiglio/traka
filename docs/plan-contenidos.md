# Plan de contenidos para potenciar las páginas de servicio

Fecha: 25 de noviembre de 2026. Base: las 32 landings del PR #2.

## Para qué es esto

Las páginas de servicio ya existen y están bien armadas, pero una página sola rankea poco:
Google necesita ver que el sitio sabe del tema. Este plan define **qué guías escribir y cómo
enlazarlas** para que el peso caiga sobre las páginas de servicio, que son las que convierten.

No es un calendario de redes ni un plan de blog por volumen. Son 15 piezas con un trabajo
asignado cada una, revisadas y aprobadas una por una.

## Advertencia sobre los datos

**Este plan no está hecho con datos de búsqueda.** No hay volúmenes ni dificultad: el conector
de Ahrefs no se pudo conectar y Search Console todavía no acumuló datos del sitio. Está armado
sobre dos cosas:

1. **Intención de búsqueda**, que se razona sin herramientas.
2. **Lo que el negocio ya sabe que le preguntan**, que está escrito en las FAQs de cada servicio.

Eso alcanza para arrancar, pero **hay que repriorizarlo a los 30-60 días** de que Search Console
tenga datos: ahí se ve por qué búsquedas aparecés de verdad y cuáles traen clics. Varias de las
piezas de abajo van a cambiar de lugar cuando eso pase.

---

## El modelo: un clúster por servicio

```
                 /servicios/posicionamiento-seo/        <- la que convierte
                    ^         ^         ^
                    |         |         |
                 guía 1    guía 2    guía 3             <- las que traen la visita
                    |
                    v
           /servicios/posicionamiento-seo/tandil/       <- la variante local
```

- La **página de servicio** se queda con la búsqueda transaccional. Es la que tiene el precio y
  el botón.
- Las **guías** se quedan con la búsqueda informativa, la que pasa antes de contratar. Cada una
  enlaza hacia arriba a su servicio.
- Las **páginas de ciudad** reciben enlaces desde las guías **sólo donde el ángulo local sea
  real**, no por cumplir.

### Tres reglas que no se negocian

**1. Una guía nunca pelea la búsqueda de su página de servicio.** Si la guía y la página
compiten por lo mismo, Google elige una y la otra se desperdicia. El reparto:

| Tipo de búsqueda | Página |
|---|---|
| "diseño web precio", "hacer página web" | Servicio nacional |
| "diseño web en Tandil" | Servicio + ciudad |
| "páginas web para cafeterías" | Rubro |
| "cuánto tarda una web", "cómo elegir quién la hace" | Guía |

**2. Toda guía enlaza a su servicio con texto descriptivo.** No "hacé clic acá": el enlace dice
`desarrollo de páginas web` o `posicionamiento SEO`. Es la señal que le dice a Google de qué es
esa página.

**3. Ninguna guía promete posiciones.** Ya está en el tono del sitio y conviene mantenerlo: es
diferencial frente a la competencia y evita prometer lo que no se controla.

---

## Las 15 piezas aprobadas: palabra clave e interlinkeado

Prioridad: **A** = arrancar ya, **B** = segunda ola, **C** = cuando haya tiempo.

**Sobre las palabras clave:** son la consulta que la pieza tiene que ganar, derivada de intención,
no de volumen medido. Se escriben como las tipea la gente. Validar y reordenar con Search Console
a los 30-60 días.

Dos columnas de enlaces, porque el interlinkeado va en los dos sentidos y es lo que hace que el
peso caiga en las páginas de servicio:

- **Enlaza hacia**: lo que la guía enlaza. Define a quién le pasa autoridad.
- **Recibe desde**: qué página existente tiene que enlazarla. Sin esto la guía queda huérfana y
  Google tarda en encontrarla.

### Clúster 1 · Desarrollo web → `/servicios/desarrollo-web/`

Ya existe: *Qué mirar antes de contratar una web*.

| # | Guía | Palabra clave objetivo | Enlaza hacia | Recibe desde | Pri |
|---|---|---|---|---|---|
| 1 | Cuánto cuesta una página web en Argentina | cuánto cuesta una página web | desarrollo-web (bloque precio), las 6 de ciudad, analisis-web-gratis | desarrollo-web, las 6 de ciudad (FAQ de precio), home | **A** |
| 2 | Cuánto tarda en hacerse una página web | cuánto tarda en hacerse una página web | desarrollo-web, proyectos | desarrollo-web, guía #1 | **A** |
| 3 | ¿Me conviene una web o una cuenta de Instagram? | me conviene una web o Instagram | desarrollo-web, redes-sociales, los rubros que existan | desarrollo-web, redes-sociales, guía #17 | **B** |
| 4 | Qué tiene que tener la web de un comercio | qué tiene que tener la web de un negocio | desarrollo-web, los 4 rubros | desarrollo-web, los 4 rubros | **B** |

### Clúster 2 · Posicionamiento SEO → `/servicios/posicionamiento-seo/`

Ya existe: *Cómo optimizar tu Perfil de Empresa en Google*.

| # | Guía | Palabra clave objetivo | Enlaza hacia | Recibe desde | Pri |
|---|---|---|---|---|---|
| 6 | Por qué no aparezco en Google cuando busco mi negocio | por qué no aparece mi negocio en Google | posicionamiento-seo, las 6 de ciudad, guía del Perfil de Empresa | posicionamiento-seo, las 6 de ciudad, home | **A** |
| 7 | Cómo conseguir reseñas en Google y cómo responderlas | cómo conseguir reseñas en Google | posicionamiento-seo, guía del Perfil de Empresa | posicionamiento-seo, guía #6 | **A** |
| 8 | Cuánto tarda el SEO en dar resultados | cuánto tarda el SEO en dar resultados | posicionamiento-seo | posicionamiento-seo, guía #6 | **B** |
| 9 | Qué es el SEO local y a quién le sirve | qué es el SEO local | posicionamiento-seo, donde-trabajamos, las 6 de ciudad | posicionamiento-seo, donde-trabajamos | **B** |
| 10 | Cómo saber por qué palabras te busca la gente | cómo saber por qué palabras me buscan en Google | posicionamiento-seo | posicionamiento-seo, guía #8 | **C** |

### Clúster 3 · Plataformas a medida → `/servicios/plataformas-a-medida/`

**Sin guías hoy.** El clúster más vacío y el de ticket más alto.

| # | Guía | Palabra clave objetivo | Enlaza hacia | Recibe desde | Pri |
|---|---|---|---|---|---|
| 11 | Cuándo alcanza una planilla y cuándo necesitás un sistema | cuándo dejar de usar Excel en mi negocio | plataformas-a-medida, proyectos/lavi | plataformas-a-medida, las 6 de ciudad de plataformas | **A** |
| 12 | Cuánto cuesta un software a medida y de qué depende | software a medida precio | plataformas-a-medida, proyectos/lavi | plataformas-a-medida, guía #11 | **A** |

### Clúster 4 · Redes sociales → `/servicios/redes-sociales/`

**Sin guías hoy.** Ticket más bajo, pero las piezas más rápidas de escribir.

| # | Guía | Palabra clave objetivo | Enlaza hacia | Recibe desde | Pri |
|---|---|---|---|---|---|
| 15 | Qué tiene que decir la bio de tu Instagram | qué poner en la bio de Instagram de un negocio | redes-sociales | redes-sociales | **B** |
| 16 | Cómo ordenar los destacados de un negocio | cómo organizar los destacados de Instagram | redes-sociales | redes-sociales, guía #15 | **C** |
| 17 | Qué poner en el link de la bio | qué poner en el link de la bio | redes-sociales, desarrollo-web | redes-sociales, guía #15, guía #3 | **C** |

### Transversales · alimentan las páginas de ciudad

| # | Guía | Palabra clave objetivo | Enlaza hacia | Recibe desde | Pri |
|---|---|---|---|---|---|
| 18 | Cómo aparecer en Google Maps en tu ciudad | cómo aparecer en Google Maps | posicionamiento-seo, **las 6 de ciudad de SEO**, guía del Perfil de Empresa | posicionamiento-seo, donde-trabajamos, las 6 de ciudad | **A** |

La #18 queda como la única pieza que empuja las 18 páginas de ciudad, que hoy sólo reciben
enlaces del footer y de su servicio nacional. Era una de dos; la otra no se aprobó.

---

## Mecánica del interlinkeado

Parte está automatizada en el repo y parte hay que escribirla a mano. Conviene tenerlo claro para
no duplicar ni olvidarse.

### Ya es automático

| Enlace | Cómo sale |
|---|---|
| Guía → su servicio | Bloque lateral con precio y CTA, por el campo `servicio:` del frontmatter |
| Servicio → sus guías | Bloque de guías del clúster, **pero capado en 2** |
| Guía → otras guías | Bloque al final, **pero sin filtrar por clúster**: salen cualesquiera |
| `/guias/` → todas | Listado, ordenado por fecha |

### Hay que escribirlo en el cuerpo del `.md`

Todo lo demás: los enlaces a páginas de ciudad, a rubros, a `/proyectos/`, a
`/analisis-web-gratis/` y los cruces entre guías del mismo clúster.

Dos reglas para esos enlaces:

1. **Texto descriptivo, nunca "hacé clic acá".** El enlace dice `posicionamiento SEO en Tandil`,
   que es la señal que le dice a Google de qué es la página que recibe.
2. **Dentro del texto, no sólo al final.** Un enlace en medio de un párrafo que viene al caso vale
   más que una lista de enlaces relacionados al pie.

### Y hay que cambiar esto en el código

| # | Qué | Por qué |
|---|---|---|
| 1 | La página de servicio muestra sólo 2 guías (`slice(0, 2)` en `src/pages/servicios/[slug].astro`) | Con 5 guías por clúster, 3 quedan invisibles desde la página que se quiere potenciar |
| 2 | Las páginas de ciudad no muestran ninguna guía | El enlace interno va en un solo sentido |
| 3 | `/guias/` no está agrupada por servicio | Con 21 guías una lista plana deja de servir |
| 4 | El bloque "otras guías" no filtra por clúster (`todas.filter(...).slice(0, 2)`) | Dispersa el peso en vez de concentrarlo en el clúster |

Son cuatro cambios acotados. Conviene hacerlos antes de publicar la cuarta guía.

---

## Orden de ejecución

A dos guías por mes, que es un ritmo sostenible para un equipo chico:

| Mes | Guías | Por qué estas |
|---|---|---|
| 1 | #1 (precio web), #6 (no aparezco en Google) | Las dos de mayor intención comercial, una por clúster principal |
| 2 | #11 (planilla o sistema), #18 (Maps en tu ciudad) | Abre el clúster vacío de mayor ticket y empuja las 18 de ciudad |
| 3 | #12 (precio software a medida), #2 (cuánto tarda una web) | Completa las dos de precio, que son las que más convierten |
| 4 | #7 (reseñas), #8 (cuánto tarda el SEO) | Táctica buscada + manejo de expectativas |
| 5 | #3 (web o Instagram), #9 (qué es el SEO local) | Comparativa y definición, cabeza de embudo |
| 6 | #4 (web de un comercio), #10 (por qué palabras te buscan) | Conecta con rubros y cierra el clúster de SEO |
| 7 | #15 (bio de Instagram), #16 (destacados) | Abre el clúster de redes |
| 8 | #17 (link de la bio) | Cierra redes y cruza a desarrollo web |

**Las cuatro de prioridad A son la mitad del valor del plan.** Si el ritmo se cae, que no se
caigan esas: #1, #6, #11 y #18, más #12 que es A pero cae en el mes 3.

---

## Descartadas

No se aprobaron. Quedan anotadas para que no se vuelvan a proponer:

| Pieza | Clúster |
|---|---|
| Qué tener listo antes de que te hagan la web | Desarrollo web |
| Qué es un relevamiento y por qué va antes del presupuesto | Plataformas a medida |
| Sistema del mercado o a medida: cómo decidir | Plataformas a medida |
| Cómo vender todo el año con un negocio de temporada | Transversal |

---

## Decisiones abiertas sobre dos piezas

**#3, la comparativa web o Instagram.** Aprobada con el pedido de hacerla más específica por
rubro (tienda de ropa, peluquería, estética). Dos caminos:

- **Una pieza pilar** con una sección propia por rubro. Menos trabajo, menos riesgo de contenido
  fino, pero pelea una sola búsqueda.
- **Una pieza por rubro.** Cada una gana su búsqueda larga, pero son tres o cuatro piezas y el
  riesgo de que se parezcan entre sí es alto, que es justo lo que el plan evita en las ciudades.

Hay un problema de destino: los rubros nombrados no tienen página. "Peluquería" y "estética"
entran parcialmente en `salud-y-bienestar`; "tienda de ropa" no existe. Si las piezas por rubro
no tienen a dónde enlazar, se desperdicia la mitad del valor.

**TODO: decidir con Joaco** — si el interés es por rubro, conviene primero crear las páginas de
rubro (`/paginas-web-para/indumentaria/`, `/paginas-web-para/peluquerias-y-estetica/`), que son
comerciales y ganan búsquedas del tipo "páginas web para peluquerías", y después una sola
comparativa que las enlace a todas.

**#12, la palabra clave de plataformas.** Se cambió de "sistema a medida" a **"software a medida"**.
Razonamiento: "software a medida" es el término instalado en el rubro y el que más probablemente
escriba alguien que busca esto; "sistema de gestión" es el otro candidato fuerte. "Plataforma" y
"herramienta" son palabras de agencia, no de buscador: describen bien el servicio pero casi nadie
las tipea.

Esto abre algo más grande, y vale mirarlo: **la página de servicio se llama "Plataformas a
medida", así que hoy no es elegible para la búsqueda principal del rubro.** La guía puede capturar
"software a medida" y pasarle el peso, que es exactamente para lo que sirve el contenido satélite.
Pero conviene además que el cuerpo y las FAQs de la página de servicio usen "software a medida" y
"sistema de gestión" junto con el nombre de marca, sin renombrar el H1.

Sin datos de búsqueda esto es razonamiento, no medición. Es de lo primero que hay que confirmar
cuando Search Console tenga datos.

---

## Cómo se agrega una guía

Ya está resuelto en el repo: es un `.md` en `src/content/guias/`. El frontmatter está tipado en
`src/content.config.ts` y **el build falla** si el `title` pasa de 60 caracteres o la
`description` de 158. Campos: `title`, `description`, `h1`, `kicker`, `resumen`, `fecha`,
`lectura`, `clave` (2 a 5 ideas), `faqs`, `temas`, `servicio` (`web`, `seo`, `medida` o `redes`) y
`destacada`.

Con `servicio:` la guía se enlaza sola al servicio que corresponde. Después hay que correr
`npm run og` para generar su imagen de Open Graph.

Las `faqs` del frontmatter salen como `FAQPage` en el JSON-LD, así que conviene cargarlas siempre:
es la forma más barata de ganar espacio en los resultados de Google.

---

## Cómo medir si funciona

Por clúster, no por guía suelta. En Search Console, a los 60 y a los 90 días:

| Qué mirar | Dónde | Qué quiere decir |
|---|---|---|
| Impresiones de la página de servicio | GSC, por página | Si el clúster empuja, la página de servicio sube aunque la visita entre por la guía |
| Posición media de la búsqueda transaccional | GSC, por consulta | Es el número que mueve la aguja comercial |
| Clics de la guía a la página de servicio | GA4, navegación interna | Si es muy bajo, el enlace está mal puesto o la guía atrae al público equivocado |
| `whatsapp_click` con `page` de guía | GA4, evento | Una guía que genera consultas directas merece más piezas alrededor |

La trampa a evitar: celebrar visitas a las guías. Una guía con mucho tráfico que no mueve ni la
página de servicio ni las consultas es contenido que infla un número y no vende.

---

## Lo que falta decidir

- **Quién escribe.** El plan asume que las guías las escribe alguien que conoce el oficio: varias
  piden datos que sólo tiene Traka (de qué depende un precio, qué se pregunta en un relevamiento).
- **Si se publican precios en las guías.** Las #1 y #12 son mucho más fuertes con números
  concretos. El sitio ya publica el precio de tres servicios, así que la coherencia dice que sí,
  pero es una decisión comercial.
- **TODO: validar con Joaco** — la #19 asume que hay clientes de temporada entre los casos. Si no
  los hay, la guía se escribe igual pero sin ejemplos propios.
