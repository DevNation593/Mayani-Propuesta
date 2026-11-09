export const studio = {
  name: 'Mayani Studio',
  instagramHandle: 'mayani_uio',
  instagramUrl: 'https://www.instagram.com/mayani_uio/',
  tiktokHandle: 'mayani.uio',
  tiktokUrl: 'https://www.tiktok.com/@mayani.uio',
  location: {
    address: 'Av. Real Audiencia',
    city: 'Quito',
    postalCode: '170144',
    country: 'Ecuador',
    mapsUrl: 'https://maps.app.goo.gl/PADyHig1T8smqg3Q9',
    embedUrl: 'https://www.google.com/maps/embed?origin=mfe&pb=!1m3!3m2!1m1!4s7362187913944469911!3m1!1ses!5m1!1ses',
  },
  whatsappCountryCode: '593',
  // Número de WhatsApp para agendar citas; VITE_WHATSAPP_NUMBER permite reemplazarlo.
  whatsappNumber: import.meta.env.VITE_WHATSAPP_NUMBER || '+593 98 853 6889',
}

// Servicios propuestos para la presentación; confirmar el catálogo con el estudio.
export const services = [
  { number: '01', name: 'Corte + styling', detail: 'Un estilo que se sienta tuyo' },
  { number: '02', name: 'Color', detail: 'Matices para expresar tu esencia' },
  { number: '03', name: 'Alisado y cuidado', detail: 'Suavidad, brillo y movimiento' },
  { number: '04', name: 'Maquillaje social', detail: 'Tu belleza en cada ocasión' },
]
