import Agency from './agency';
import {getAgencyAccess} from '../lib/agency-auth';
export const dynamic='force-dynamic';
export default async function Page(){const access=await getAgencyAccess();return <Agency publicDemo={!access}/>;}
