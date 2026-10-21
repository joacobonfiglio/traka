import {getAgencyAccess} from '../../../lib/agency-auth';
import {schemas,type Kind} from '../../../lib/models';
import {json,checkOrigin,recordError,toRow} from '../../../lib/api';
export const dynamic='force-dynamic';
export async function GET(){const a=await getAgencyAccess();if(!a)return json({error:'Ingresá a tu cuenta de Traka para continuar'},401);const {data,error}=await a.supabase.from('traka_records').select('*').order('updated_at',{ascending:false}).limit(10000);if(error)return json({error:'No se pudieron cargar los datos de Supabase'},503);return json({rows:(data||[]).map(toRow)});}
export async function POST(req:Request){
 if(!checkOrigin(req))return json({error:'Origen no permitido'},403);const a=await getAgencyAccess();if(!a)return json({error:'Iniciá sesión'},401);
 try{const body=await req.json() as any,kind=body.kind as Kind;if(!Object.hasOwn(schemas,kind))return json({error:'Tipo de registro inválido'},400);const parsed=schemas[kind].safeParse(body.data);if(!parsed.success)return json({error:parsed.error.issues.map(x=>x.message).join(' · ')},400);
 const data=parsed.data as any,id=body.id||crypto.randomUUID();if(typeof id!=='string'||id.length>100)return json({error:'Identificador inválido'},400);
 const {data:old,error:readError}=await a.supabase.from('traka_records').select('*').eq('id',id).maybeSingle();if(readError)return json({error:'No se pudo leer el registro'},503);if(old&&old.kind!==kind)return json({error:'Registro incompatible'},400);
 if(kind==='document'&&(!old||data.fileKey!==old.data.fileKey||data.url!==old.data.url))return json({error:'Usá la carga de documentos para añadir archivos'},400);
 if(data.clientId){const {data:ref}=await a.supabase.from('traka_records').select('id').eq('id',data.clientId).eq('kind','client').maybeSingle();if(!ref)return json({error:'Seleccioná un cliente existente'},400)}
 if(data.projectId){const {data:ref}=await a.supabase.from('traka_records').select('id').eq('id',data.projectId).eq('kind','project').maybeSingle();if(!ref)return json({error:'Seleccioná un proyecto existente'},400)}
 if(old){if(!Number.isInteger(body.version))return json({error:'Versión requerida'},400);const {data:updated,error}=await a.supabase.from('traka_records').update({data}).eq('id',id).eq('version',body.version).select().maybeSingle();if(error)return recordError(error);if(!updated)return json({error:'El registro cambió en otra ventana. Actualizá y volvé a intentarlo'},409);return json({row:toRow(updated)})}
 if(body.version>0)return json({error:'El registro ya no existe'},409);const {data:inserted,error}=await a.supabase.from('traka_records').insert({id,kind,data}).select().single();if(error)return recordError(error);return json({row:toRow(inserted)});
 }catch{return json({error:'No se pudo guardar el registro'},400)}
}
export async function DELETE(req:Request){if(!checkOrigin(req))return json({error:'Origen no permitido'},403);const a=await getAgencyAccess();if(!a)return json({error:'Iniciá sesión'},401);try{const {id,version}=await req.json() as any;if(typeof id!=='string'||!Number.isInteger(version))return json({error:'Registro inválido'},400);const {data:deleted,error}=await a.supabase.from('traka_records').delete().eq('id',id).eq('version',version).select().maybeSingle();if(error)return recordError(error);if(!deleted)return json({error:'El registro cambió o ya no existe. Actualizá y volvé a intentarlo'},409);
 if(deleted.kind==='document'&&deleted.data.fileKey){const {error:storageError}=await a.supabase.storage.from('traka-documents').remove([deleted.data.fileKey]);if(storageError)return json({ok:true,warning:'Registro eliminado. La limpieza del archivo quedó pendiente.'})}return json({ok:true});}catch{return json({error:'No se pudo eliminar'},400)}}
