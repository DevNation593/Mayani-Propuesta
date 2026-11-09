# Mayani Studio — propuesta web

Landing en React y Vite para presentar el estudio, explorar servicios y preparar una reserva por WhatsApp.

## Desarrollo y comprobaciones

```sh
npm install
npm run dev
npm test
npm run lint
npm run build
```

`npm run preview` permite revisar la compilación de producción.

## WhatsApp para agendar

Las citas se agendan por WhatsApp con el número **+593 98 853 6889**, definido en `studio.whatsappNumber`, dentro de `src/studio.js`. El encabezado, la portada y el botón de reserva usan este número. Abren el chat del estudio con el servicio seleccionado y un mensaje preparado. La persona envía el mensaje y confirma su cita durante la conversación. Se usa el formato [click to chat de WhatsApp](https://faq.whatsapp.com/5913398998672934). La sección de contacto y el pie de página también muestran el número, con enlace al chat.

Para usar otro número sin tocar el código, define `VITE_WHATSAPP_NUMBER` en `.env.local` (ver `.env.example`). Escribe el número después de `593`, sin el cero inicial; también se aceptan espacios, guiones y el signo `+`. Reinicia Vite después de modificarlo y, para una versión publicada, vuelve a compilar. Si el número configurado no es válido, los enlaces llevan a la sección de contacto, donde se indica que el número está pendiente, y el botón de WhatsApp queda desactivado.

## Material de la propuesta

- TikTok del estudio: [@mayani.uio](https://www.tiktok.com/@mayani.uio), en la sección de contacto y en el pie de página; se edita en `src/studio.js`.
- Instagram del estudio: [@mayani_uio](https://www.instagram.com/mayani_uio/). La sección de casos de éxito muestra tres resultados de alisado y ecoplastia publicados por esta cuenta. Cada tarjeta muestra primero la portada; al pulsarla se carga el reproductor oficial de Instagram y el reel se reproduce dentro de la página. Cada tarjeta también enlaza al reel original.
- El catálogo de servicios es una propuesta pendiente de confirmar con el estudio. Las tarifas y el año de apertura también están pendientes de confirmar.
- La dirección y el mapa corresponden a la [ficha de MS Mayani Studio en Google Maps](https://maps.app.goo.gl/PADyHig1T8smqg3Q9): Av. Real Audiencia, Quito 170144, Ecuador. La sección de contacto incluye el mapa insertado y acceso a «Cómo llegar»; el pie de página también enlaza a la ubicación. Los datos se editan en `studio.location`, dentro de `src/studio.js`.
- Las fotografías de la portada y de la sección del estudio son de Unsplash y se presentan como inspiración. Los casos de éxito utilizan portadas reales de los reels de Mayani; sus imágenes se sirven desde `public/casos/`, con descripciones alternativas. Los datos se editan en `src/success-stories.js` y las fuentes están documentadas en [docs/instagram-cases.md](docs/instagram-cases.md).
- `public/mayani-logo.png` es una adaptación para web del logo adjunto, preparada con la herramienta integrada `imagegen`. El origen y el prompt figuran en [docs/branding.md](docs/branding.md). Se puede reemplazar por el archivo original del estudio manteniendo el nombre.

Las pruebas usan el ejecutor integrado de Node. Verifican el tratamiento de números pendientes, el formato del enlace y del número visible, los números locales y el mensaje con caracteres especiales. También verifican la URL del reproductor de Instagram y la lectura de su altura.
