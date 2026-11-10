import {getAgencyAccess} from '../../../lib/agency-auth';
import {json,checkOrigin,recordError,toRow} from '../../../lib/api';
const MAX=20*1024*1024;
export const dynamic='force-dynamic';
export async function POST(req:Request){if(!checkOrigin(req))return json({error:'Origen no permitido'},403);const a=await getAgencyAccess();if(!a)return json({error:'Iniciá sesión'},401);try{
 const b=await req.json() as any;const projectId=String(b.projectId||'');const {data:project}=await a.supabase.from('traka_records').select('id').eq('id',projectId).eq('kind','project').maybeSingle();if(!project)return json({error:'Seleccioná un proyecto existente'},400);
 const name=String(b.name||'Documento').trim().slice(0,180),notes=String(b.notes||'').slice(0,4000);
 if(b.operation==='prepare'){if(!Number.isInteger(b.size)||b.size<1||b.size>MAX)return json({error:'El archivo debe tener entre 1 byte y 20 MB'},400);const id=crypto.randomUUID(),path='documents/'+id;const {data,error}=await a.supabase.storage.from('traka-documents').createSignedUploadUrl(path);if(error)return json({error:'No se pudo preparar la carga del archivo'},503);return json({id,path,token:data.token});}
 const id=b.operation==='commit'?String(b.id||''):crypto.randomUUID();let data:any;
 if(b.operation==='link'){let url:URL;try{url=new URL(b.url)}catch{return json({error:'Enlace inválido'},400)}if(!['http:','https:'].includes(url.protocol)||url.href.length>2000)return json({error:'Enlace inválido'},400);data={name,projectId,url:url.href,fileKey:'',mime:'link',size:0,status:'Borrador',notes};}
 else if(b.operation==='commit'){if(!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id))return json({error:'Carga inválida'},400);const path='documents/'+id;const {data:info,error}=await a.supabase.storage.from('traka-documents').info(path);if(error||!info)return json({error:'No se encontró el archivo subido'},400);const size=Number(info.size);if(!size||size>MAX)return json({error:'Tamaño de archivo inválido'},400);data={name,projectId,url:'',fileKey:path,mime:info.contentType||'application/octet-stream',size,status:'Borrador',notes};}
 else return json({error:'Operación inválida'},400);
 const {data:inserted,error}=await a.supabase.from('traka_records').insert({id,kind:'document',data}).select().single();if(error){if(data.fileKey&&error.code!=='23505')await a.supabase.storage.from('traka-documents').remove([data.fileKey]);return recordError(error)}return json({row:toRow(inserted)});
 }catch{return json({error:'No se pudo guardar el documento'},400)}}
