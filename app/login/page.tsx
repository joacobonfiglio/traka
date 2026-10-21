import LoginForm from './form';
import {configured} from '../../lib/supabase/server';
export const dynamic='force-dynamic';
export default function Login(){return <LoginForm configured={configured()} ownerEmail={process.env.AGENCY_OWNER_EMAIL||''}/>}
