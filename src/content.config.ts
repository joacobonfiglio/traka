import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/** Guías en Markdown. Para sumar una, agregá un .md en src/content/guias/. */
const guias = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/guias' }),
  schema: z.object({
    title: z.string().max(60, 'El title no puede pasar de 60 caracteres'),
    description: z.string().max(158, 'La description no puede pasar de 158 caracteres'),
    h1: z.string(),
    kicker: z.string(),
    resumen: z.string(),
    fecha: z.coerce.date(),
    actualizada: z.coerce.date().optional(),
    lectura: z.number(),
    /** Tres o cuatro ideas en una línea: salen arriba, en el bloque "En resumen". */
    clave: z.array(z.string()).min(2).max(5),
    /** Preguntas al final de la guía. Van también como FAQPage en el JSON-LD. */
    faqs: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
    /** Temas de la guía, para articleSection y keywords. */
    temas: z.array(z.string()).default([]),
    servicio: z.enum(['web', 'seo', 'medida', 'redes']).optional(),
    destacada: z.boolean().default(false),
  }),
});

/**
 * Ciudades. Un archivo por ciudad, con el bloque local de cada servicio dentro.
 * Agregar una ciudad = agregar un .json acá: salen sus tres páginas, sus enlaces
 * entre ciudades y sus entradas del sitemap, sin tocar ningún componente.
 */
const ciudades = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/ciudades' }),
  schema: z.object({
    ciudadNombre: z.string(),
    /** areaServed del JSON-LD ProfessionalService. */
    areaServed: z.string(),
    /** Orden en /donde-trabajamos/ y en los enlaces entre ciudades. */
    orden: z.number(),
    /** Bloque 7, "Cómo te atendemos". Propio de la ciudad. */
    atencion: z.string(),
    /** Bloque local de cada servicio, por slug de servicio. */
    servicios: z.record(
      z.enum(['desarrollo-web', 'posicionamiento-seo', 'plataformas-a-medida']),
      z.object({
        title: z.string().max(60, 'El title no puede pasar de 60 caracteres'),
        metaDescription: z.string().max(158, 'La description no puede pasar de 158 caracteres'),
        h1: z.string(),
        bajada: z.string(),
        /** Bloque 3: dos párrafos propios de la ciudad. */
        contextoLocal: z.array(z.string()).length(2),
        /** Bloque 4: dos de las cuatro situaciones son propias de la ciudad. */
        problemasLocales: z.array(z.object({ t: z.string(), d: z.string() })).length(2),
        /** Bloque 9: tres preguntas propias de la ciudad. */
        faqsCiudad: z.array(z.object({ q: z.string(), a: z.string() })).length(3),
        whatsappMensaje: z.string(),
      }),
    ),
  }),
});

export const collections = { guias, ciudades };
