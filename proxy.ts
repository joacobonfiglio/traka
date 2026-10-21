import {createServerClient} from '@supabase/ssr';
import {NextResponse,type NextRequest} from 'next/server';
export async function proxy(request:NextRequest){
 let response=NextResponse.next({request});
 const url=process.env.NEXT_PUBLIC_SUPABASE_URL,key=process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
 if(!url||!key)return response;
 const client=createServerClient(url,key,{cookieOptions:{httpOnly:true,sameSite:'lax',secure:process.env.NODE_ENV==='production'},cookies:{getAll(){return request.cookies.getAll()},setAll(values,headers){values.forEach(({name,value})=>request.cookies.set(name,value));response=NextResponse.next({request});values.forEach(({name,value,options})=>response.cookies.set(name,value,options));if(headers)Object.entries(headers).forEach(([name,value])=>response.headers.set(name,value));}}});
 await client.auth.getClaims();
 response.headers.set('Cache-Control','private, no-store');
 return response;
}
// Route handlers verify/refresh their own session and can write response cookies.
// Running a second Auth check in the proxy adds a round trip to every mutation.
export const config={matcher:['/((?!api(?:/|$)|_next/static|_next/image|favicon.svg|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)']};
