# Traka Workspace

Gestión de agencia: clientes, proyectos, tareas, calendario, finanzas, documentos privados, herramientas y prospección. Next.js 16, React 19, Supabase Auth/Postgres/Storage y Vercel.

## Desarrollo

```sh
npm ci
cp .env.example .env.local
npm run dev
```

Variables necesarias:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`: clave pública; la autorización la aplica RLS.
- `AGENCY_OWNER_EMAIL`: email que puede activar el primer acceso desde la interfaz.

No se usa ninguna clave `service_role` en el código o el navegador.

## Base de datos

El proyecto utiliza `traka_members`, `traka_records` y el bucket privado `traka-documents`. Los objetos anteriores del proyecto Supabase no se modifican ni eliminan.

1. Aplicar `supabase/migrations/20261021121157_traka_workspace.sql`.
2. Insertar el email de la persona autorizada en `traka_members` desde SQL Editor o una conexión administrativa, en minúsculas. La aplicación no permite añadir miembros por sí sola.
3. En Supabase Auth → URL Configuration, configurar la URL de producción y autorizar `/auth/callback` como redirect. No autorizar comodines generales de Vercel.
4. Si el email ya tiene cuenta en ese proyecto, ingresar con su contraseña. Para una cuenta nueva, usar Primer acceso y confirmar el email si el proyecto lo requiere.

La migración conserva las relaciones entre registros con claves foráneas, controla versiones para evitar sobrescribir cambios y aplica RLS a todas las tablas nuevas. Solo miembros de Traka pueden acceder a datos y documentos.

Los archivos se suben directamente a Supabase con URLs de carga firmadas; el límite es 20 MB por archivo. Las lecturas usan URLs privadas temporales de 60 segundos. Los ejemplos son temporales y no se guardan como datos reales.

## Vercel

Repositorio: `joacobonfiglio/traka`. Proyecto: `traka`, equipo `joakobon-5283s-projects`.

La rama `main` despliega producción mediante la integración Git de Vercel. Configurar las variables en Production. Las previews no reciben por defecto acceso a la base de producción.

## Verificación

```sh
npm run typecheck
npm test
npm run build
```

Además de esos controles, validar al publicar: acceso autorizado, alta de cliente, proyecto y tarea, edición y registro de tiempo, subida y lectura de documento, recarga de página, y denegación a visitantes sin sesión.
