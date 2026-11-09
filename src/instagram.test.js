import assert from 'node:assert/strict'
import test from 'node:test'
import { buildInstagramEmbedUrl, readEmbedHeight } from './instagram.js'

test('genera el reproductor de un reel enlazado desde el perfil', () => {
  assert.equal(
    buildInstagramEmbedUrl('https://www.instagram.com/mayani_uio/reel/DblQLalRN8r/'),
    'https://www.instagram.com/reel/DblQLalRN8r/embed/',
  )
  assert.equal(
    buildInstagramEmbedUrl('https://instagram.com/reel/DYhubzeRjsB?igsh=abc'),
    'https://www.instagram.com/reel/DYhubzeRjsB/embed/',
  )
})

test('admite publicaciones y rechaza enlaces ajenos o incompletos', () => {
  assert.equal(buildInstagramEmbedUrl('https://www.instagram.com/p/ABC_123-x/'), 'https://www.instagram.com/p/ABC_123-x/embed/')
  for (const value of ['', 'no es url', 'https://www.instagram.com/mayani_uio/', 'https://example.com/reel/DblQLalRN8r/', 'https://www.instagram.com.evil.test/reel/X/']) {
    assert.equal(buildInstagramEmbedUrl(value), null)
  }
})

test('lee la altura del reproductor solo en mensajes de medida', () => {
  assert.equal(readEmbedHeight('{"type":"MEASURE","details":{"height":518.4}}'), 519)
  assert.equal(readEmbedHeight({ type: 'MEASURE', details: { height: 600 } }), 600)
  for (const value of ['{"type":"LOADING","details":{}}', 'texto', null, { type: 'MEASURE', details: { height: -5 } }]) {
    assert.equal(readEmbedHeight(value), null)
  }
})
