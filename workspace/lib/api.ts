export const json=(body:unknown,status=200)=>Response.json(body,{status,headers:{'Cache-Control':'private, no-store'}});
export function checkOrigin(req:Request){return req.headers.get('origin')===new URL(req.url).origin}
export function recordError(error:{code?:string;message?:string}){if(error.code==='23503')return json({error:'El registro tiene datos asociados o una relación no válida. Reasigná o eliminá primero esos registros.'},409);if(error.code==='23505')return json({error:'Este registro ya existe. Actualizá los datos.'},409);return json({error:'No se pudo guardar. Revisá la conexión y los datos del formulario.'},400)}
export function toRow(row:Record<string,any>){return {id:row.id,kind:row.kind,data:row.data,version:row.version,updatedAt:row.updated_at}}
