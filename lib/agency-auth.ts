import {createClient,configured} from './supabase/server';
export async function getAgencyAccess(){
 if(!configured())return null;
 const supabase=await createClient();
 // Verify the JWT (cached JWKS for asymmetric keys, Auth fallback for legacy keys).
 // Keep membership fresh on every request; never authorize from getSession alone.
 const {data,error}=await supabase.auth.getClaims();
 const email=data?.claims.email,id=data?.claims.sub;
 if(error||typeof email!=='string'||typeof id!=='string')return null;
 const {data:member,error:memberError}=await supabase.from('traka_members').select('email,role').eq('email',email.toLowerCase()).maybeSingle();
 if(memberError||!member)return null;
 return {supabase,user:{id,email},role:member.role};
}
