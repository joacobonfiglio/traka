import {createServerClient} from '@supabase/ssr';
import {cookies} from 'next/headers';
export function configured(){return !!(process.env.NEXT_PUBLIC_SUPABASE_URL&&process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY)}
export async function createClient(){
 if(!configured())throw new Error('Falta configurar la conexión con Supabase');
 const store=await cookies();
 return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,{
  cookieOptions:{httpOnly:true,sameSite:'lax',secure:process.env.NODE_ENV==='production'},
  cookies:{getAll(){return store.getAll()},setAll(values){try{values.forEach(({name,value,options})=>store.set(name,value,options))}catch{/* Proxy refreshes cookies for Server Components. */}}}
 });
}
