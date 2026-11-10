import {getAgencyAccess} from '../../../lib/agency-auth';
import {schemas,type Kind} from '../../../lib/models';
import {json,checkOrigin,recordError,toRow} from '../../../lib/api';
export const dynamic='force-dynamic';
export async function GET(){const a=await getAgencyAccess();if(!a)return json({error:'Ingresá a tu cuenta de Traka para continuar'},401);const {data,error}=await a.supabase.from('traka_records').select('*').order('updated_at',{ascending:false}).limit(10000);if(error)return json({error:'No se pudieron cargar los datos de Supabase'},503);return json({rows:(data||[]).map(toRow)});}
// Expose server-side timings without recording payloads, emails or tokens.
export async function POST(req:Request){
 const started=performance.now(),timings:string[]=[];
 let response:Response;
 try{response=await saveRecord(req,(name,start)=>timings.push(`${name};dur=${(performance.now()-start).toFixed(1)}`))}
 catch{response=json({error:'No se pudo conectar con Traka. Volvé a intentarlo.'},503)}
 timings.push(`total;dur=${(performance.now()-started).toFixed(1)}`);
 response.headers.set('Server-Timing',timings.join(', '));
 return response;
}
async function saveRecord(req:Request,measure:(name:string,start:number)=>void){
 if(!checkOrigin(req))return json({error:'Origen no permitido'},403);
 const started=performance.now(),a=await getAgencyAccess();measure('auth',started);
 if(!a)return json({error:'Iniciá sesión'},401);
 try{
  const body=await req.json() as any,kind=body.kind as Kind;
  if(!Object.hasOwn(schemas,kind))return json({error:'Tipo de registro inválido'},400);
  const parsed=schemas[kind].safeParse(body.data);
  if(!parsed.success)return json({error:parsed.error.issues.map(x=>x.message).join(' · ')},400);
  const data=parsed.data as any,id=body.id||crypto.randomUUID(),version=body.version;
  if(typeof id!=='string'||!id.trim()||id.length>100)return json({error:'Identificador inválido'},400);
  if(!Number.isInteger(version)||version<0)return json({error:'Versión requerida'},400);
  const databaseStarted=performance.now();
  // Document paths must remain immutable. Other records need no preliminary read:
  // the version filter, FK constraints and reference trigger validate atomically.
  if(kind==='document'){
   if(version===0)return json({error:'Usá la carga de documentos para añadir archivos'},400);
   const {data:old,error}=await a.supabase.from('traka_records').select('data').eq('id',id).eq('kind',kind).maybeSingle();
   if(error)return json({error:'No se pudo leer el documento'},503);
   if(!old)return json({error:'El documento cambió o ya no existe. Actualizá y volvé a intentarlo'},409);
   if(data.fileKey!==old.data.fileKey||data.url!==old.data.url)return json({error:'Usá la carga de documentos para añadir archivos'},400);
  }
  if(version>0){
   const {data:updated,error}=await a.supabase.from('traka_records').update({data}).eq('id',id).eq('kind',kind).eq('version',version).select().maybeSingle();
   measure('database',databaseStarted);
   if(error)return recordError(error);
   if(!updated)return json({error:'El registro cambió en otra ventana o ya no existe. Actualizá y volvé a intentarlo'},409);
   return json({row:toRow(updated)});
  }
  const {data:inserted,error}=await a.supabase.from('traka_records').insert({id,kind,data}).select().single();
  measure('database',databaseStarted);
  if(error)return recordError(error);
  return json({row:toRow(inserted)});
 }catch{return json({error:'No se pudo guardar el registro'},400)}
}
export async function DELETE(req:Request){if(!checkOrigin(req))return json({error:'Origen no permitido'},403);const a=await getAgencyAccess();if(!a)return json({error:'Iniciá sesión'},401);try{const {id,version}=await req.json() as any;if(typeof id!=='string'||!Number.isInteger(version))return json({error:'Registro inválido'},400);const {data:deleted,error}=await a.supabase.from('traka_records').delete().eq('id',id).eq('version',version).select().maybeSingle();if(error)return recordError(error);if(!deleted)return json({error:'El registro cambió o ya no existe. Actualizá y volvé a intentarlo'},409);
 if(deleted.kind==='document'&&deleted.data.fileKey){const {error:storageError}=await a.supabase.storage.from('traka-documents').remove([deleted.data.fileKey]);if(storageError)return json({ok:true,warning:'Registro eliminado. La limpieza del archivo quedó pendiente.'})}return json({ok:true});}catch{return json({error:'No se pudo eliminar'},400)}}
