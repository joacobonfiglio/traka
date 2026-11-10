# Despliegue

Un repositorio, dos proyectos de Vercel. Los dos se publican desde `main`; lo único que
cambia es el **Root Directory**.

| Proyecto | Root Directory | Framework | Dominio |
|---|---|---|---|
| La web | *(vacío: la raíz)* | Astro | `trakadigital.com` y `www.trakadigital.com` |
| Traka Workspace | `workspace` | Next.js | el subdominio que elijas, por ejemplo `app.trakadigital.com` |

## Cómo quedó armado

Hasta ahora el repositorio tenía solo el workspace y el proyecto de Vercel `traka` lo
publicaba desde la raíz. Al pasar la web a la raíz, ese proyecto pasa a publicar **la
web**, que es la que tiene que quedarse con `trakadigital.com`. El workspace necesita su
propio proyecto.

### 1. Proyecto de la web (el que ya existe)

En el proyecto `traka` de Vercel:

- **Settings → General → Root Directory**: dejarlo vacío.
- **Framework Preset**: Astro. Build `npm run build`, salida `dist`.
- **Domains**: `trakadigital.com` (y `www`, redirigiendo al principal).
- No necesita ninguna variable de entorno, salvo `PUBLIC_GA_ID` cuando se active la
  medición. La web no usa base de datos.

### 2. Proyecto del workspace (nuevo)

Crear un proyecto nuevo en Vercel, apuntando **al mismo repositorio**:

- **Root Directory**: `workspace`.
- **Framework Preset**: Next.js.
- **Production Branch**: `main`.
- **Domains**: el subdominio elegido, por ejemplo `app.trakadigital.com`.
- **Environment Variables** (Production), las mismas que tenía el proyecto anterior:
  `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` y
  `AGENCY_OWNER_EMAIL`.
- En **Supabase → Auth → URL Configuration**: cambiar la URL del sitio por la del
  subdominio nuevo y autorizar su `/auth/callback`.

La base de datos no se toca: las tablas, el bucket y los datos siguen donde estaban.

## Orden recomendado

1. Juntar esta rama con `main`.
2. Crear el proyecto del workspace con Root Directory `workspace` y sus variables.
3. Mover el dominio de la herramienta al subdominio nuevo y confirmar que entra por
   `/login`.
4. Confirmar que `trakadigital.com` sirve la web.

Entre el paso 1 y el 2 el workspace queda unos minutos sin publicar. Los datos no se ven
afectados en ningún momento.
