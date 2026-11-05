import assert from 'node:assert/strict'
import test from 'node:test'
import { buildWhatsAppUrl } from './whatsapp.js'

test('no ofrece una reserva a un número pendiente o incompleto', () => {
  for (const number of ['', undefined, '593', '+593', '593XXXXXXXXX', '123']) {
    assert.equal(buildWhatsAppUrl(number, 'Corte + styling'), null)
  }
})

test('abre el chat del estudio con un número internacional formateado', () => {
  const result = buildWhatsAppUrl('+593 (99) 123-4567', 'Corte + styling')
  assert.equal(typeof result, 'string')
  const url = new URL(result)
  assert.equal(url.origin, 'https://wa.me')
  assert.equal(url.pathname, '/593991234567')
})

test('admite el número local con y sin el cero inicial usando el prefijo 593', () => {
  for (const number of ['0991234567', '991234567']) {
    const result = buildWhatsAppUrl(number, 'Color')
    assert.equal(typeof result, 'string')
    assert.equal(new URL(result).pathname, '/593991234567')
  }
})

test('mantiene el servicio y los caracteres especiales dentro del mensaje', () => {
  const service = 'Color + styling & cuidado'
  const result = buildWhatsAppUrl('+593991234567', service)
  assert.equal(typeof result, 'string')
  const url = new URL(result)
  const message = url.searchParams.get('text')
  assert.ok(message.includes('Mayani Studio'))
  assert.ok(message.includes(service))
  assert.ok(message.includes('¿Qué horarios'))
  assert.deepEqual([...url.searchParams.keys()], ['text'])
})
