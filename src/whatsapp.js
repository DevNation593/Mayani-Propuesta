function normalizeWhatsAppNumber(number, countryCode) {
  const value = String(number ?? '').trim()

  if (!value || !/^[+\d\s().-]+$/.test(value)) return null

  const digits = value.replace(/\D/g, '')
  const phone = digits.startsWith(countryCode)
    ? digits
    : `${countryCode}${digits.replace(/^0/, '')}`
  const nationalNumber = phone.slice(countryCode.length)

  return /^\d{8,9}$/.test(nationalNumber) ? phone : null
}

// Presenta el número en formato internacional legible, por ejemplo +593 98 853 6889.
export function formatWhatsAppNumber(number, countryCode = '593') {
  const phone = normalizeWhatsAppNumber(number, countryCode)
  if (!phone) return null

  const national = phone.slice(countryCode.length)
  const groups = national.length === 9
    ? [national.slice(0, 2), national.slice(2, 5), national.slice(5)]
    : [national.slice(0, 1), national.slice(1, 4), national.slice(4)]
  return `+${countryCode} ${groups.join(' ')}`
}

export function buildWhatsAppUrl(number, service, countryCode = '593') {
  const phone = normalizeWhatsAppNumber(number, countryCode)
  if (!phone) return null

  const message = [
    'Hola, Mayani Studio.',
    service
      ? `Me gustaría agendar una cita para ${service}.`
      : 'Me gustaría agendar una cita.',
    '¿Qué horarios tienen disponibles?',
  ].join(' ')

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
}
