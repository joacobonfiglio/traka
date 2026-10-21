import type {Metadata} from 'next';
import './globals.css';
export const metadata:Metadata={title:'Traka · Gestión de agencia',description:'El espacio de trabajo de Traka',robots:{index:false,follow:false},icons:{icon:'/favicon.svg'}};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="es-AR"><body>{children}</body></html>}
