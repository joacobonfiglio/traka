import {createClient,configured} from './supabase/server';
export async function getAgencyAccess(){
 if(!configured())return null;
 const supabase=await createClient();
 const {data:{user},error}=await supabase.auth.getUser();
 if(error||!user?.email)return null;
 const {data:member,error:memberError}=await supabase.from('traka_members').select('email,role').eq('email',user.email.toLowerCase()).maybeSingle();
 if(memberError||!member)return null;
 return {supabase,user,role:member.role};
}
