import type {Row} from './models';

type UpdateRows=(update:(rows:Row[])=>Row[])=>void;

// Lock synchronously, so two clicks in the same render cannot send stale versions.
// Roll back only this record, preserving concurrent saves of other records.
export async function optimisticUpdate({previous,next,pending,updateRows,onPending,persist}:{
 previous:Row;next:Row;pending:Set<string>;updateRows:UpdateRows;
 onPending:(ids:Set<string>)=>void;persist:()=>Promise<Row>;
}){
 if(pending.has(previous.id))return false;
 pending.add(previous.id);onPending(new Set(pending));
 const replace=(row:Row)=>updateRows(rows=>rows.map(r=>r.id===row.id?row:r));
 replace(next);
 try{replace(await persist());return true}
 catch(error){replace(previous);throw error}
 finally{pending.delete(previous.id);onPending(new Set(pending))}
}
