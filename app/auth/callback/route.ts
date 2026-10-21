import {createClient} from '../../../lib/supabase/server';
import {NextResponse} from 'next/server';
export async function GET(req:Request){const url=new URL(req.url),code=url.searchParams.get('code');if(code){const s=await createClient();const {error}=await s.auth.exchangeCodeForSession(code);if(!error)return NextResponse.redirect(new URL('/',req.url))}return NextResponse.redirect(new URL('/login?confirmed=1',req.url))}
