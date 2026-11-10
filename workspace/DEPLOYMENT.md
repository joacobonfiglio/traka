# Despliegue de Traka Workspace

## Destino

- Repositorio: https://github.com/joacobonfiglio/traka
- Vercel: proyecto `traka`, equipo `joakobon-5283s-projects`.
- Producción: https://traka-wheat.vercel.app
- Acceso: https://traka-wheat.vercel.app/login
- Supabase: proyecto existente `Dashboardfinanciero` (`svcapoxxegsubakgnvyq`), elegido por el usuario para reutilizarlo con Traka.

## Configuración realizada

- Next.js y entorno Node.js 24 en Vercel, con compilación `npm run build` e instalación `npm ci`.
- Variables de Supabase y email propietario configuradas en Production. Las previews no reciben la base de producción por defecto.
- Tablas `traka_members` y `traka_records`, índices, relaciones y control de versiones.
- RLS en ambas tablas; solo miembros autorizados pueden leer o modificar información.
- Bucket privado `traka-documents`, hasta 20 MB por archivo. Lecturas mediante URLs firmadas temporales.
- Migración `20261021121157_traka_workspace` aplicada y registrada en el historial de Supabase.
- Email propietario habilitado como miembro; ya tenía una cuenta confirmada en Supabase.
- Los objetos y datos del antiguo dashboard se conservan.

## Recuperación de conexión

La API SQL administrativa devolvió timeouts al comenzar. Una función temporal protegida aplicó la migración mediante la conexión interna de Supabase. La conexión administrativa luego respondió correctamente. La función temporal quedó desactivada: devuelve HTTP 410 y ya no contiene código de acceso a la base.

## Verificación completada

- Compilación de producción y comprobación de tipos.
- Validación de importes, cobros, fechas y tiempo imputado.
- Escritura y edición de registros bajo el rol autenticado con políticas RLS.
- Incremento de versión y rechazo de escrituras con una versión desactualizada.
- Protección de relaciones para evitar eliminar clientes con proyectos asociados.
- Usuarios ajenos sin acceso a los registros.
- Solicitudes anónimas a las APIs de datos y archivos devuelven 401.
- Bucket privado con límite de 20 MB.
- Pruebas transaccionales revertidas: no quedan datos de prueba.
- Interfaz pública y pantalla de acceso inspeccionadas en navegador.

El inicio de sesión con la contraseña personal y una carga de archivo desde esa sesión quedan para el primer uso por parte de la persona propietaria. No se han pedido, cambiado ni guardado sus contraseñas.

## Avisos heredados de Supabase

Los asesores detectan avisos previos del dashboard anterior: funciones SECURITY DEFINER utilizadas por el sistema antiguo de enlaces compartidos, índices de ese sistema sin uso y protección contra contraseñas filtradas desactivada. No se cambiaron esas funciones ni la configuración de Auth al migrar Traka. Las tablas de Traka tienen RLS y no presentan esos avisos.

Referencias de Supabase:

- [Funciones públicas SECURITY DEFINER](https://supabase.com/docs/guides/database/database-linter?lint=0028_anon_security_definer_function_executable)
- [Protección de contraseñas](https://supabase.com/docs/guides/auth/password-security#password-strength-and-leaked-password-protection)
- [Índices sin uso](https://supabase.com/docs/guides/database/database-linter?lint=0005_unused_index)

## Ajuste de latencia (21/10/2026)

Se identificaron consultas consecutivas antes de cada escritura: verificación de sesión en proxy y API, membresía, lectura del registro, validación remota de referencias y escritura. Las funciones usaban `iad1`, mientras que Supabase está en `eu-west-1`.

- `vercel.json` fija las funciones en Dublín (`dub1`), junto a la región de Supabase.
- Las APIs verifican y refrescan su sesión en su propio cliente; no repiten la verificación en el proxy. Las páginas conservan el refresco de cookies.
- `getClaims()` verifica el JWT con JWKS cuando está disponible; Supabase conserva la verificación remota para claves simétricas heredadas. La membresía sigue consultándose en cada solicitud y RLS sigue aplicándose en la base.
- Las ediciones habituales pasan directamente a una escritura condicional por ID, tipo y versión. Las claves foráneas y el trigger existente validan las relaciones dentro de la transacción. Los documentos mantienen una lectura para impedir cambios de ruta o enlace desde la API general.
- Los checks y estados de tareas se actualizan de inmediato, con indicador de guardado y bloqueo por tarea. Ante error se restaura solo esa tarea, sin deshacer cambios confirmados de otras tareas.
- Los formularios muestran un indicador de guardado y mantienen sus valores ante errores. Se confirman únicamente cuando responde la base.
- La respuesta POST incluye `Server-Timing` para distinguir autorización, base y duración total, sin registrar datos personales ni tokens.

Validación: `npm test`, tipos y compilación de producción; pruebas de latencia simulada, doble clic, escrituras paralelas, restauración, reintento, conflictos, validación, autorización, rutas de documentos y matcher del proxy. Se ejecutaron también escrituras autenticadas en Supabase dentro de una transacción revertida, comprobando versiones y referencias.

La mejora elimina viajes de red y espera visual; no hay una comparación de milisegundos de guardado de extremo a extremo con la sesión personal del propietario. Para medirla, iniciar sesión, guardar una tarea y consultar `Server-Timing` en la respuesta de `/api/data` (autorización/base/total).
