/** Portadas editoriales: capturas reales o esquemas identificados como tales. */
export const guideTopics = [
  { id: 'seo', name: 'Google y SEO', description: 'Que te encuentren cuando buscan lo que hacés.' },
  { id: 'web', name: 'Páginas web', description: 'Qué necesita tu web, cuánto cuesta y cómo empezar.' },
  { id: 'redes', name: 'Redes sociales', description: 'Un perfil claro que ayude a elegirte y contactarte.' },
  { id: 'medida', name: 'Gestión y herramientas', description: 'Ordenar procesos y saber cuándo dar el siguiente paso.' },
];
const covers = {
 seo: { src:'/guias/portadas/google.svg', alt:'Esquema de una búsqueda local que conecta un servicio con la ubicación de un negocio', caption:'Esquema ilustrativo: conectar una búsqueda con tu negocio.', width:960, height:600 },
 web: { src:'/proyectos/tintoreria-constitucion/escritorio.webp', alt:'La web real de Tintorería Constitución, con sus servicios y contacto visibles', caption:'Un ejemplo real: la web de Tintorería Constitución, desarrollada por Traka.', width:1333, height:926 },
 redes: { src:'/guias/portadas/redes.svg', alt:'Esquema de un perfil: presentación, destacados y botón de contacto', caption:'Esquema ilustrativo: cada parte del perfil tiene una función.', width:960, height:600 },
 medida: { src:'/proyectos/lavi/escritorio.webp', alt:'Interfaz real de Lavi con pedidos, lavaderos y cobros de demostración', caption:'Lavi: interfaz real con datos ficticios de demostración.', width:1333, height:926 },
};
export function guideVisual(topic?: string, slug?: string) {
 if (slug === 'como-conseguir-resenas-en-google') return {src:'/guias/portadas/resenas.svg',alt:'Esquema de una opinión y una respuesta: pedir, escuchar y responder reseñas',caption:'Esquema ilustrativo: pedir una opinión honesta y responderla.',width:960,height:600};
 if (slug === 'perfil-de-empresa-en-google') return {src:'/guias/portadas/perfil.svg',alt:'Ficha ilustrada con servicios, ubicación, horarios, fotos y contacto',caption:'Esquema ilustrativo de los datos esenciales de un perfil de negocio.',width:960,height:600};
 return covers[topic as keyof typeof covers] ?? covers.seo;
}
export function guideTopic(topic?: string) { return guideTopics.find(t => t.id === topic)?.name ?? 'Guías prácticas'; }
