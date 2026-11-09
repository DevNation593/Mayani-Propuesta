export const INSTAGRAM_ORIGIN = 'https://www.instagram.com'

// Convierte el enlace público de un reel o publicación en la URL de su reproductor insertable.
export function buildInstagramEmbedUrl(sourceUrl) {
  let url
  try {
    url = new URL(sourceUrl)
  } catch {
    return null
  }

  if (!/^(www\.)?instagram\.com$/.test(url.hostname)) return null

  const match = url.pathname.match(/\/(reels?|p)\/([\w-]+)\/?$/)
  if (!match) return null

  const type = match[1] === 'p' ? 'p' : 'reel'
  return `${INSTAGRAM_ORIGIN}/${type}/${match[2]}/embed/`
}

// Lee la altura que el reproductor de Instagram informa con postMessage.
export function readEmbedHeight(data) {
  let message = data
  if (typeof data === 'string') {
    try {
      message = JSON.parse(data)
    } catch {
      return null
    }
  }

  const height = message?.type === 'MEASURE' ? Number(message.details?.height) : NaN
  return Number.isFinite(height) && height > 0 ? Math.ceil(height) : null
}
