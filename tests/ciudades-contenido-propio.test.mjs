/**
 * El brief pide que cada página de ciudad tenga al menos un 40% de contenido
 * propio. Se mide sobre el texto visible de <main> en /dist: header y footer
 * quedan afuera porque son iguales en todo el sitio.
 *
 * También falla si dos ciudades comparten el contexto local de un mismo
 * servicio, que es la forma típica de "copiar una ciudad y cambiar el nombre".
 *   npm run build && node --test tests/
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const DIST = new URL('../dist/', import.meta.url).pathname;
const DATOS = new URL('../src/content/ciudades/', import.meta.url).pathname;
const SERVICIOS = ['desarrollo-web', 'posicionamiento-seo', 'plataformas-a-medida'];
const MINIMO = 40;

const desescapar = (s) => s
  .replaceAll('&quot;', '"').replaceAll('&#39;', "'").replaceAll('&amp;', '&')
  .replaceAll('&lt;', '<').replaceAll('&gt;', '>').replaceAll('&nbsp;', ' ');

/** Texto visible de <main>, sin etiquetas ni scripts. */
function textoMain(html) {
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1] ?? '';
  return desescapar(main.replace(/<(script|style)\b[\s\S]*?<\/\1>/g, ' ').replace(/<[^>]+>/g, ' '))
    .replace(/\s+/g, ' ')
    .trim();
}

const ciudades = readdirSync(DATOS)
  .filter((f) => f.endsWith('.json'))
  .map((f) => ({ slug: f.replace(/\.json$/, ''), datos: JSON.parse(readFileSync(join(DATOS, f), 'utf8')) }));

test('hay ciudades cargadas', () => {
  assert.ok(ciudades.length > 0, 'no hay archivos en src/content/ciudades/');
});

for (const { slug: ciudad, datos } of ciudades) {
  for (const servicio of SERVICIOS) {
    const loc = datos.servicios[servicio];
    if (!loc) continue;
    const file = join(DIST, 'servicios', servicio, ciudad, 'index.html');

    test(`/servicios/${servicio}/${ciudad}/ tiene al menos ${MINIMO}% de contenido propio`, () => {
      assert.ok(existsSync(file), `falta ${file}`);
      const texto = textoMain(readFileSync(file, 'utf8'));
      const propios = [
        ...loc.contextoLocal,
        datos.atencion,
        loc.h1,
        loc.bajada,
        ...loc.problemasLocales.flatMap((p) => [p.t, p.d]),
        ...loc.faqsCiudad.flatMap((f) => [f.q, f.a]),
      ];
      const ausentes = propios.filter((p) => !texto.includes(p));
      assert.deepEqual(ausentes, [], `campos propios que no llegan al HTML: ${ausentes.map((a) => a.slice(0, 40))}`);
      const pct = (propios.reduce((n, p) => n + p.length, 0) / texto.length) * 100;
      assert.ok(pct >= MINIMO, `${pct.toFixed(1)}% de contenido propio (mínimo ${MINIMO}%)`);
    });
  }
}

test('ninguna ciudad repite el contexto local de otra', () => {
  for (const servicio of SERVICIOS) {
    const vistos = new Map();
    for (const { slug, datos } of ciudades) {
      for (const parrafo of datos.servicios[servicio]?.contextoLocal ?? []) {
        const antes = vistos.get(parrafo);
        assert.equal(antes, undefined, `${servicio}: ${slug} repite un párrafo de ${antes}`);
        vistos.set(parrafo, slug);
      }
    }
  }
});
