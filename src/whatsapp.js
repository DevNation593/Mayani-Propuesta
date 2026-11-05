export function buildWhatsAppUrl(number, service, countryCode = '593') {
  const value = String(number ?? '').trim()

  if (!value || !/^[+\d\s().-]+$/.test(value)) return null

  const digits = value.replace(/\D/g, '')
  const phone = digits.startsWith(countryCode)
    ? digits
    : `${countryCode}${digits.replace(/^0/, '')}`
  const nationalNumber = phone.slice(countryCode.length)

  if (!/^\d{8,9}$/.test(nationalNumber)) return null

  const message = [
    'Hola, Mayani Studio.',
    service
      ? `Me gustaría agendar una cita para ${service}.`
      : 'Me gustaría agendar una cita.',
    '¿Qué horarios tienen disponibles?',
  ].join(' ')

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
}
