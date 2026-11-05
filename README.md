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

## Completar el WhatsApp

El archivo `.env.local` ya contiene el prefijo de Ecuador:

```dotenv
VITE_WHATSAPP_NUMBER=593
```

Completa el número después de `593`, sin el cero inicial. También se aceptan espacios, guiones y el signo `+`. Reinicia Vite después de modificarlo; para una versión publicada, vuelve a compilar.

El encabezado, la portada y el botón de reserva comparten esta configuración. Cuando el número está completo, abren el chat del estudio con el servicio seleccionado y un mensaje preparado. La persona envía el mensaje y confirma su cita durante la conversación. Se usa el formato [click to chat de WhatsApp](https://faq.whatsapp.com/5913398998672934).

Mientras solo figure `593`, los enlaces del encabezado y la portada llevan a la sección de contacto; allí se indica que el número está pendiente y el botón de WhatsApp permanece desactivado.

`.env.example` permite reproducir la configuración en otra instalación. Los datos públicos del estudio y los servicios propuestos se editan en `src/studio.js`.

## Material de la propuesta

- Instagram del estudio: [@mayani_uio](https://www.instagram.com/mayani_uio/). La sección de casos de éxito muestra tres resultados de alisado y ecoplastia publicados por esta cuenta, con enlace a cada reel original.
- El catálogo de servicios es una propuesta pendiente de confirmar con el estudio. Las tarifas y el año de apertura también están pendientes de confirmar.
- La dirección y el mapa corresponden a la [ficha de MS Mayani Studio en Google Maps](https://maps.app.goo.gl/PADyHig1T8smqg3Q9): Av. Real Audiencia, Quito 170144, Ecuador. La sección de contacto incluye el mapa insertado y acceso a «Cómo llegar»; el pie de página también enlaza a la ubicación. Los datos se editan en `studio.location`, dentro de `src/studio.js`.
- Las fotografías de la portada y de la sección del estudio son de Unsplash y se presentan como inspiración. Los casos de éxito utilizan portadas reales de los reels de Mayani; sus imágenes se sirven desde `public/casos/`, con descripciones alternativas. Los datos se editan en `src/success-stories.js` y las fuentes están documentadas en [docs/instagram-cases.md](docs/instagram-cases.md).
- `public/mayani-logo.png` es una adaptación para web del logo adjunto, preparada con la herramienta integrada `imagegen`. El origen y el prompt figuran en [docs/branding.md](docs/branding.md). Se puede reemplazar por el archivo original del estudio manteniendo el nombre.

Las pruebas usan el ejecutor integrado de Node y verifican el tratamiento de números pendientes, el formato del enlace, los números locales y el mensaje con caracteres especiales.
