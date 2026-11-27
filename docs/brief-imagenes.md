# Brief de imágenes para el repositorio de la web

Fecha: 26 de noviembre de 2026. Base: `main` después del PR #2 (32 landings + 14 guías).

Este documento es para el agente o la persona que vaya a cargar las imágenes. Dice exactamente
**qué imagen va en qué lugar, con qué contexto y con qué formato**, y también qué no hay que hacer.

---

## Lo primero: no hay tantos lugares como parece

El sitio tiene 51 URLs, pero **solo cinco lugares esperan una imagen.** El resto del diseño es
CSS: maquetas dibujadas con divs, degradados y tipografía, sin fotos. Eso es a propósito y es
parte de la identidad, no un hueco a llenar.

Los cinco lugares están marcados con `TODO` en el código:

| # | Archivo | Qué espera |
|---|---|---|
| 1 | `src/components/CaseCard.astro:14` | Capturas reales de cada sitio, en lugar de las maquetas |
| 2 | `src/pages/proyectos/[slug].astro:100` | Capturas antes/después en WebP, y la cita del cliente |
| 3 | `src/pages/proyectos/index.astro:58` | Las mismas capturas, en las tarjetas del listado |
| 4 | `src/pages/servicios/[servicio]/[ciudad].astro:134` | Logos de clientes y reseñas de Google |
| 5 | `src/pages/sobre-nosotros/index.astro:23` | Foto real del equipo o de la ciudad |

**Las 16 guías no tienen slot de imagen.** La plantilla `src/pages/guias/[...slug].astro` no
renderiza ninguna imagen en el cuerpo. Si se quieren imágenes ahí, primero hay que cambiar la
plantilla: no es un trabajo de carga de archivos.

**Las imágenes de Open Graph ya están resueltas y automatizadas.** Las genera `npm run og` con
satori, usando la tipografía y los colores de la marca, y hay una por página en `public/og/`. No
hay que crearlas a mano ni reemplazarlas: si cambia un título, se corre el comando y se
regeneran.

---

## Regla que no se negocia

**Ninguna de estas imágenes se puede generar.**

Las tres primeras son capturas de sitios de clientes reales. Una imagen generada de la web de un
cliente sería **inventar trabajo que no existe**: un portfolio con capturas fabricadas es
exactamente lo que no se puede publicar, y además el cliente lo vería.

Lo mismo con los logos (son marcas de terceros) y con la foto del equipo (son personas reales).

La segunda regla, que viene del brief original del sitio: **nada de fotos de stock genéricas.**
Oficinas luminosas con gente señalando pantallas restan credibilidad en vez de sumarla. Si no hay
material real, la maqueta CSS que está hoy es mejor que una foto de banco de imágenes.

---

## 1, 2 y 3 · Capturas de los tres proyectos

Es el trabajo principal y el único que desbloquea páginas que hoy están incompletas.

### Qué se necesita por proyecto

Dos capturas: una de **celular** y una de **computadora**, porque el componente muestra las dos.

- **Celular:** 390 × 844, el alto se puede recortar. La captura tiene que mostrar la parte de
  arriba de la página, donde se ve qué es el negocio.
- **Computadora:** 1440 × 990 (relación 16:11, que es la que usa la maqueta actual).
- **Formato:** WebP, con calidad alta pero por debajo de los 200 KB cada una. El sitio tiene
  LCP de 1,1 a 1,5 segundos y no conviene arruinarlo.
- **Dónde van:** `public/proyectos/<slug>/` con nombres `celular.webp` y `escritorio.webp`.

### El contexto de cada uno

**`/proyectos/tintoreria-constitucion/`** — Tintorería Constitución, página web.

Una tintorería de barrio que trabajaba casi todo de boca en boca y por WhatsApp. El problema no
era la falta de clientes: era que quien no la conocía no tenía dónde ver qué servicios daba,
cuánto tardaba cada uno ni si pasaban a buscar la ropa. Se hizo una web de una sola página,
primero para celular, con los servicios y los tiempos de entrega a la vista, botón de WhatsApp en
cada sección y las dudas frecuentes escritas.

**Qué tiene que mostrar la captura:** los servicios con sus tiempos, que es lo que define la
página. Si se ve el botón de WhatsApp, mejor.

**`/proyectos/aquabon/`** — Aquabon, página web.

Un lavadero que necesitaba un lugar propio para presentarse. Tenía movimiento por redes y por
recomendación, pero nada que mostrara el detalle de los servicios ni que sirviera de referencia
para quien lo buscaba por primera vez. Se hizo una web propia pensada para celular, con los
servicios y lo que incluye cada uno, botón de WhatsApp por sección y medición de las consultas.

**Qué tiene que mostrar la captura:** el detalle de los servicios.

**`/proyectos/lavi/`** — Lavi, plataforma a medida.

**TODO: validar con Joaco.** Es el único proyecto sin descripción en el repositorio: solo figura
como "Plataforma a medida". Antes de la captura hace falta saber qué es Lavi y qué hace la
plataforma, porque de eso depende qué pantalla conviene mostrar.

**Qué tiene que mostrar la captura, cuando se sepa:** la pantalla que mejor explique para qué
sirve, normalmente un panel con datos. Importante: **si la plataforma tiene datos de clientes
reales, hay que anonimizarlos antes de la captura.** Nombres, teléfonos y montos reales no se
publican.

### Bloqueo actual

Los tres proyectos tienen el campo `url` vacío en `src/content/proyectos/*.json`, así que **no
hay de dónde sacar la captura.** Hace falta una de dos cosas:

- La URL pública de cada sitio, y ahí se capturan.
- O las capturas ya hechas, si los sitios no son públicos.

Mientras eso no esté, lo correcto es dejar las maquetas CSS: no son un error, son un placeholder
honesto.

---

## 4 · Logos de clientes y reseñas

Va en el bloque 2 ("Prueba") de las 18 páginas de ciudad, que **hoy no se renderiza a propósito.**
No está vacío ni roto: está comentado para no mostrar un marco sin contenido ni inventar prueba
social.

Para activarlo hacen falta dos cosas, las dos reales:

- **Logos de clientes**, en SVG si se puede o en WebP con fondo transparente, y **con permiso del
  cliente para usarlos.**
- **Reseñas de Google**, con el texto y el nombre tal como los publicó la persona. No se
  reescriben ni se resumen: se citan.

Según lo que dijo Joaco, las reseñas se van a ir subiendo más adelante. Hasta entonces el bloque
queda como está.

---

## 5 · Foto del equipo

En `/sobre-nosotros/`. Una foto real del equipo o de la ciudad, y el nombre de quien atiende.

No es urgente y no bloquea nada, pero es de las cosas que más confianza suman en una página de
"sobre nosotros", y una foto de stock ahí se nota más que en cualquier otro lado.

---

## Cómo se cargan, técnicamente

1. Los archivos van en `public/`, que se copia tal cual al build.
2. **Cada imagen necesita un `alt` descriptivo**, no decorativo: qué se ve y de qué negocio es.
   Por ejemplo `alt="La web de Tintorería Constitución en un celular, con la lista de servicios y
   los tiempos de entrega"`. El sitio tiene 190 tests y accesibilidad 100 en Lighthouse: un `alt`
   vacío o genérico lo baja.
3. Hay que **sacar la maqueta CSS** del componente cuando entre la captura, no superponerlas.
   `src/components/CaseCard.astro` acepta props; conviene agregarle uno para la imagen y usar la
   maqueta solo como respaldo cuando no haya captura.
4. Después de cargar: `npm run build && npm test`. Los 190 tests tienen que seguir en verde.
5. Correr `npm run og` solo si además cambió algún título.

## Cómo medir que no se rompió el rendimiento

Antes de las imágenes, el Lighthouse móvil de las páginas medidas daba:

| Página | Perf | LCP | CLS |
|---|---|---|---|
| Servicio | 100 | 1,1 s | 0 |
| Ciudad | 100 | 1,5 s | 0 |
| Caso | 100 | 1,4 s | 0 |

El objetivo del brief original es LCP por debajo de 2,5 s y cero saltos de layout. Las imágenes
son lo que más fácil rompe las dos cosas, así que después de cargarlas conviene medir de nuevo la
página de caso, que es la que más imágenes va a tener.

Dos cuidados concretos: **declarar `width` y `height`** en cada imagen, que es lo que evita el
salto de layout, y **`loading="lazy"`** en todo lo que no esté en la primera pantalla.

## Actualización · 27 de noviembre de 2026

Se incorporaron capturas reales de las páginas de inicio de Aquabon y Tintorería
Constitución y del módulo Lavaderos B2B de Lavi. Las URLs públicas de las dos webs
están cargadas en las fichas de proyecto. Lavi se capturó ejecutando su interfaz
existente en el modo de prueba B2B (`NEXT_PUBLIC_B2B_TEST=true`), sin conexión a
producción ni datos de clientes. El aviso de demostración queda visible.

- Capturas de escritorio de 1333 × 926, WebP, con variantes de 640 px para tarjetas.
- Se muestran completas y adaptables al ancho disponible, también en móvil: no se
  recorta una captura de escritorio para hacerla pasar por una versión de celular.
- Las tarjetas de home, proyectos, rubros y ciudades comparten estas imágenes.
- Los servicios usan capturas reales (web / plataformas) o esquemas explicativos
  (SEO / redes), mediante `ServiceVisual.astro`.
- Las 16 guías incluyen una figura contextual dentro del cuerpo: ocho esquemas
  editoriales SVG, reutilizados donde el concepto coincide, y capturas de Aquabon
  y Lavi como ejemplos. Se pueden ampliar. Los SVG son diagramas explicativos,
  no interfaces, resultados, reseñas ni fotografías inventadas.
- No se añadieron reseñas, fotos de equipo ni imágenes de un supuesto «antes».
- Validación: build, 200 pruebas, existencia de archivos, dimensiones y textos
  alternativos; revisión visual de portfolio, servicio y guía en navegador.

Fuentes de capturas (27/11/2026): https://www.aquabonlavanderia.com/,
https://www.tintoreriaconstitucion.com/ y código de la interfaz Lavi en modo de
prueba B2B. Las cifras y contactos de Lavi son los ejemplos del propio modo demo.
