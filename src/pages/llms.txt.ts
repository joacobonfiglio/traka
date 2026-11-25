import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { site, servicios, faqs, steps } from '../site';

/** Resumen del negocio en texto plano, generado desde src/site.ts. */
export const GET: APIRoute = async () => {
  const guias = (await getCollection('guias')).sort((a, b) => b.data.fecha.getTime() - a.data.fecha.getTime());
  const ciudades = (await getCollection('ciudades')).sort((a, b) => a.data.orden - b.data.orden);
  const rubros = (await getCollection('rubros')).sort((a, b) => a.data.orden - b.data.orden);
  const proyectos = (await getCollection('proyectos')).sort((a, b) => a.data.orden - b.data.orden);
  const porCiudad = ['desarrollo-web', 'posicionamiento-seo', 'plataformas-a-medida'];
  const L: string[] = [];
  L.push(`# ${site.name}`, '');
  L.push(`> ${site.description}`, '');
  L.push('## Qué es Traka');
  L.push(`${site.name} es un estudio digital para comercios y pymes de ${site.areaServed.join(' y ')}. Hace cuatro cosas: construye webs simples pensadas para el celular, trabaja el posicionamiento en Google y en Maps, desarrolla plataformas a medida y pone a punto las redes. Trabaja a distancia en todo el país; su origen es ${site.city}, ${site.region}.`);
  L.push('');
  L.push('## Qué no hace');
  L.push('- No hace tiendas online ni desarrollos complejos.');
  L.push('- No promete el primer puesto en Google ni posiciones garantizadas.');
  L.push('- No mide resultados en likes: mide llamadas, mensajes de WhatsApp y consultas.');
  L.push('');
  L.push('## Servicios y precios');
  for (const sv of servicios) {
    L.push(`### ${sv.name} — ${sv.price}`);
    L.push(`- Qué es: ${sv.summary}`);
    L.push(`- Incluye: ${sv.items.join('; ')}.`);
    if (sv.priceNote) L.push(`- Sobre el precio: ${sv.priceNote}`);
    L.push(`- Detalle: ${site.url}${sv.page ?? `/#${sv.id}`}`);
    L.push('');
  }
  L.push('Precios en pesos argentinos. El precio final se pasa por escrito antes de empezar.');
  L.push('');
  L.push('## Cómo se trabaja');
  steps.forEach((s, i) => L.push(`${i + 1}. ${s.t}: ${s.d}`));
  L.push('');
  L.push('## Contacto');
  L.push(`- Zona de trabajo: ${site.areaServed.join(', ')}, a distancia. Origen: ${site.city}, ${site.region}.`);
  if (site.whatsapp) L.push(`- WhatsApp: +${site.whatsapp}`);
  if (site.email) L.push(`- Email: ${site.email}`);
  if (site.googleBusiness) L.push(`- Perfil de Empresa en Google: ${site.googleBusiness}`);
  if (site.instagram) L.push(`- Instagram: ${site.instagram}`);
  if (site.hours.length) {
    L.push('- Horarios:');
    site.hours.forEach((h) => L.push(`  - ${h.d}: ${h.h}`));
  }
  L.push('');
  L.push('## Preguntas frecuentes');
  for (const f of faqs) L.push(`- ${f.q} ${f.a}`);
  L.push('');
  L.push('## Guías');
  for (const g of guias) {
    L.push(`- ${g.data.h1}: ${g.data.resumen} (${site.url}/guias/${g.id}/)`);
  }
  L.push('');
  L.push('## Ciudades con página propia');
  L.push('El servicio y el precio son los mismos en todo el país. Estas páginas existen porque el contexto de cada ciudad es distinto, no porque se atienda solo ahí.');
  for (const c of ciudades) {
    L.push(`- ${c.data.ciudadNombre}: ${porCiudad.map((sl) => `${site.url}/servicios/${sl}/${c.id}/`).join(' , ')}`);
  }
  L.push('');
  L.push('## Páginas por rubro');
  for (const r of rubros) {
    L.push(`- ${r.data.nombre}: ${r.data.bajada} (${site.url}/paginas-web-para/${r.id}/)`);
  }
  L.push('');
  L.push('## Proyectos');
  L.push('Trabajos entregados. No se publican métricas de resultado.');
  for (const pr of proyectos) {
    L.push(`- ${pr.data.nombre} — ${pr.data.kind}: ${pr.data.negocio.startsWith('TODO') ? 'descripción pendiente de confirmar' : pr.data.negocio} (${site.url}/proyectos/${pr.id}/)`);
  }
  L.push('');
  L.push('## Páginas');
  L.push(`- ${site.url}/ — Inicio: servicios con precio y selector de necesidades.`);
  for (const sv of servicios) {
    if (sv.page) L.push(`- ${site.url}${sv.page} — ${sv.name}: qué incluye, precio y plazo.`);
  }
  L.push(`- ${site.url}/proyectos/ — Los trabajos entregados.`);
  L.push(`- ${site.url}/donde-trabajamos/ — Las ciudades con página propia y cómo se atiende.`);
  L.push(`- ${site.url}/analisis-web-gratis/ — Análisis gratuito del estado de un negocio en Google.`);
  L.push(`- ${site.url}/guias/ — Guías prácticas sobre Google, webs y medición.`);
  L.push(`- ${site.url}/sobre-nosotros/ — Origen, el nombre y cómo se trabaja.`);
  L.push('');

  return new Response(L.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=3600' },
  });
};
