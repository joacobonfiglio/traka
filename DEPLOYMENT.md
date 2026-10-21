# Estado de la migración a Vercel

- Código adaptado de Sites/Cloudflare a Next.js/Vercel.
- Variables públicas de Supabase y email propietario configurados en Vercel Production.
- Proyecto Supabase seleccionado por el usuario: Dashboardfinanciero (`svcapoxxegsubakgnvyq`), que deja de usarse para el dashboard anterior.
- La conexión SQL de ese proyecto falla por timeout. El intento de pausar reportó que el proyecto está hibernando, a pesar de figurar como ACTIVE_HEALTHY en sus metadatos.
- La migración de tablas no se ha confirmado aplicada. El intento falló al inicializar el historial antes de ejecutar el SQL.
- Hasta recuperar el proyecto Supabase y aplicar la migración, la aplicación puede mostrarse como ejemplo, pero no se debe considerar habilitado el guardado real.
