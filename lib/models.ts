import { z } from 'zod';
const str=z.string().trim().max(4000), name=str.min(1).max(180), date=z.string().regex(/^\d{4}-\d{2}-\d{2}$/).or(z.literal('')), money=z.number().finite().min(0).max(1e12), link=z.string().url().max(2000).refine(v=>/^https?:\/\//i.test(v)).or(z.literal(''));
export const schemas={
 client:z.object({name,contact:str,phone:str,email:z.string().email().or(z.literal('')),website:link,notes:str,color:z.string().regex(/^#[0-9a-f]{6}$/i)}),
 project:z.object({name,clientId:name,service:name,status:z.enum(['Por iniciar','En curso','En revisión','Finalizado','Pausado']),amount:money,cost:money,paid:money,currency:z.enum(['ARS','USD','EUR']),due:date,notes:str}).refine(p=>p.paid<=p.amount,'Lo cobrado no puede superar el importe'),
 task:z.object({name,projectId:name,status:z.enum(['Pendiente','En curso','Hecha']),priority:z.enum(['Alta','Media','Baja']),due:date.refine(Boolean,'La tarea necesita una fecha de fin'),assignee:str,notes:str,timeEntries:z.array(z.object({id:z.string().uuid(),date:date.refine(Boolean),minutes:z.number().int().min(1).max(1440),note:z.string().trim().max(1000)})).max(500).default([])}),
 event:z.object({name,projectId:str,date:date.refine(Boolean),time:z.string().regex(/^\d{2}:\d{2}$/).or(z.literal('')),notes:str}),
 tool:z.object({name,category:name,url:link,description:str,status:z.enum(['Disponible','Por crear'])}),
 lead:z.object({name,contact:str,phone:str,email:z.string().email().or(z.literal('')),service:name,status:z.enum(['Nuevo','Contactado','Reunión','Propuesta','Ganado','Perdido']),nextDate:date,notes:str}),
 document:z.object({name,projectId:name,url:link,fileKey:str,mime:str,size:money,status:z.enum(['Borrador','Presentado','Aprobado']),notes:str}),
};
export type Kind=keyof typeof schemas;
export type Row={id:string;kind:Kind;data:Record<string,any>;version:number;updatedAt:string};
export const toolDefaults:Row[]=[
 ['seo','Informes SEO','SEO','https://claude.ai/artifact/WDHhMWqXBCFNutQRwUtySy','Análisis y seguimiento del posicionamiento web','Disponible'],
 ['gmb','Google Business Profile','SEO local','','Auditoría y oportunidades de la ficha de Google','Por crear'],
 ['branding','Estrategia de marca','Branding','','Identidad, posicionamiento y documentos de marca','Por crear'],
 ['social','Gestión de redes','Redes sociales','','Planificación de contenido y seguimiento de redes','Por crear'],
 ['sdr','Prospección y captación','SDR','','Investigación y captación de nuevos clientes','Por crear'],
].map(([id,name,category,url,description,status])=>({id:'tool-'+id,kind:'tool',version:0,updatedAt:'',data:{name,category,url,description,status}}));
