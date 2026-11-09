# Casos de éxito de Mayani Studio

Se seleccionaron tres reels publicados por `@mayani_uio` que muestran resultados de alisado y ecoplastia. Las portadas se descargaron desde el perfil público de Instagram y se conservan sin modificaciones en `public/casos/`. Las tarjetas enlazan al reel original y describen el acabado visible.

Consulta de las fuentes: 18 de octubre de 2026.

| Caso | Fecha de publicación | Fuente | Imagen local |
| --- | --- | --- | --- |
| Brillo que se nota | 3 de agosto de 2026 | [Reel de ecoplastia](https://www.instagram.com/mayani_uio/reel/DblQLalRN8r/) | `public/casos/ecoplastia-brillo.jpg` |
| Un acabado pulido | 19 de mayo de 2026 | [Reel de alisado](https://www.instagram.com/mayani_uio/reel/DYhubzeRjsB/) | `public/casos/alisado-pulido.jpg` |
| Largos con presencia | 18 de mayo de 2026 | [Reel de ecoplastia](https://www.instagram.com/mayani_uio/reel/DYgSbZPspCN/) | `public/casos/ecoplastia-largos.jpg` |

Los títulos y las descripciones son textos editoriales breves basados en las imágenes y en la identificación del servicio en las publicaciones. Cada tarjeta identifica el tipo de trabajo y la fecha de publicación.

Los datos de presentación están en `src/success-stories.js`. Se usa una copia local de las portadas para que la carga de las imágenes no dependa de enlaces temporales del CDN de Instagram ni de una sesión del visitante en esa red.

## Reproducción en la página

Las tarjetas muestran la portada local y no cargan nada de Instagram hasta que la persona pulsa reproducir. Entonces se reemplaza la portada por el reproductor oficial (`https://www.instagram.com/reel/<código>/embed/`), generado desde `sourceUrl` en `src/instagram.js`. El reproductor informa su altura por `postMessage` (`MEASURE`) y la tarjeta se ajusta a ella, así que no aparece scroll interno.

Dentro del reproductor se ven el encabezado de la cuenta y los controles de Instagram. Al cargarse, Instagram puede usar sus cookies. Para agregar otro reel basta con sumar un caso en `src/success-stories.js` con el enlace del reel en `sourceUrl`.
