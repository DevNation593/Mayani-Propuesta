import { useEffect, useRef, useState } from 'react'
import { buildInstagramEmbedUrl, INSTAGRAM_ORIGIN, readEmbedHeight } from './instagram.js'
import { services, studio } from './studio.js'
import { successStories } from './success-stories.js'
import { buildWhatsAppUrl } from './whatsapp.js'
import './App.css'

function Brand({ className = '' }) {
  return (
    <a className={`brand ${className}`} href="#inicio" aria-label="Mayani Studio, inicio">
      <img className="brand-logo" src="/mayani-logo.png" alt="Mayani Studio" width="1024" height="1024" />
    </a>
  )
}

function WhatsAppIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20.5 11.8a8.5 8.5 0 0 1-12.6 7.5L3 20.8l1.5-4.7a8.5 8.5 0 1 1 16-4.3Z" />
      <path d="m8.4 7.5 1.4 2.8-1.1 1a10.3 10.3 0 0 0 4.1 4.1l1-1.1 2.8 1.4c-.5 1.7-1.5 2.1-3.1 1.5-3.7-1.4-6.3-4-7.3-7-.5-1.4.3-2.4 2.2-2.7Z" transform="translate(1 -1) scale(.94)" />
    </svg>
  )
}

function formatDate(value) {
  return new Date(`${value}T12:00:00Z`).toLocaleDateString('es-EC', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })
}

function CaseCard({ story }) {
  const embedUrl = buildInstagramEmbedUrl(story.sourceUrl)
  const [playing, setPlaying] = useState(false)
  const [embedHeight, setEmbedHeight] = useState(null)
  const frame = useRef(null)

  useEffect(() => {
    if (!playing) return undefined

    frame.current?.focus()
    const updateHeight = (event) => {
      if (event.origin !== INSTAGRAM_ORIGIN || event.source !== frame.current?.contentWindow) return
      const height = readEmbedHeight(event.data)
      if (height) setEmbedHeight(height)
    }

    window.addEventListener('message', updateHeight)
    return () => window.removeEventListener('message', updateHeight)
  }, [playing])

  const poster = (
    <>
      <img className="case-image" src={story.image} alt={story.imageAlt} width="360" height="640" loading="lazy" decoding="async" />
      <span className="case-play" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7Z" /></svg></span>
      <span className="case-format" aria-hidden="true">Reel / Mayani Studio</span>
    </>
  )

  return (
    <article className="case-card">
      <div className={playing ? 'case-media is-playing' : 'case-media'}>
        {playing ? (
          <iframe
            ref={frame}
            className="case-embed"
            src={embedUrl}
            title={`Reel de Instagram de ${studio.name}: ${story.title}`}
            style={embedHeight ? { height: `${embedHeight}px` } : undefined}
            scrolling="no"
            allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
            allowFullScreen
          />
        ) : embedUrl ? (
          <button className="case-poster" type="button" onClick={() => setPlaying(true)} aria-label={`Reproducir reel: ${story.title}`}>
            {poster}
          </button>
        ) : (
          <a className="case-poster" href={story.sourceUrl} target="_blank" rel="noopener noreferrer" aria-label={`Ver resultado en Instagram: ${story.title}`}>
            {poster}
          </a>
        )}
      </div>
      <div className="case-body">
        <p className="case-category">{story.category}</p>
        <h3>{story.title}</h3>
        <p className="case-description">{story.description}</p>
        <div className="case-footer">
          <time dateTime={story.publishedAt}>{formatDate(story.publishedAt)}</time>
          <a className="case-cta" href={story.sourceUrl} target="_blank" rel="noopener noreferrer" aria-label={`Abrir en Instagram: ${story.title}`}>Abrir en Instagram <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </article>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [selectedService, setSelectedService] = useState(services[0].name)
  const menuButton = useRef(null)
  const whatsappUrl = buildWhatsAppUrl(studio.whatsappNumber, selectedService, studio.whatsappCountryCode)
  const bookingLinkProps = {
    href: whatsappUrl || '#reserva',
    ...(whatsappUrl ? { target: '_blank', rel: 'noopener noreferrer' } : {}),
  }

  const closeMenuOnEscape = (event) => {
    if (event.key === 'Escape' && menuOpen) {
      setMenuOpen(false)
      menuButton.current?.focus()
    }
  }

  return (
    <>
      <header className="site-header" onKeyDown={closeMenuOnEscape}>
        <Brand />
        <button
          ref={menuButton}
          className="menu-toggle"
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
          aria-controls="site-navigation"
        >
          <span aria-hidden="true">{menuOpen ? '×' : '☰'}</span>
        </button>
        <nav id="site-navigation" className={menuOpen ? 'nav-links is-open' : 'nav-links'} aria-label="Navegación principal">
          <a href="#estudio" onClick={() => setMenuOpen(false)}>El estudio</a>
          <a href="#servicios" onClick={() => setMenuOpen(false)}>Servicios</a>
          <a href="#galeria" onClick={() => setMenuOpen(false)}>Resultados</a>
          <a href="#reserva" onClick={() => setMenuOpen(false)}>Contacto</a>
        </nav>
        <a className="header-cta" {...bookingLinkProps}>Reservar por WhatsApp <span aria-hidden="true">↗</span></a>
      </header>

      <main>
      <section className="hero" id="inicio">
        <div className="hero-copy">
          <p className="eyebrow">Cabello · Color · Estilo</p>
          <h1>Tu belleza,<br /><em>en su mejor forma.</em></h1>
          <p className="hero-intro">Un espacio para volver a ti. Una propuesta de belleza que celebra tu estilo y lo que te hace única.</p>
          <a className="gold-button" {...bookingLinkProps}>Agenda tu cita <span aria-hidden="true">↗</span></a>
        </div>
        <div className="hero-visual">
          <div className="hero-image" role="img" aria-label="Inspiración de belleza y cuidado del cabello" />
          <div className="hero-badge"><span>Tu esencia</span><strong>Tu estilo.</strong><span>Mayani Studio</span></div>
          <span className="hero-vertical" aria-hidden="true">MAYANI / BEAUTY / STUDIO</span>
        </div>
        <div className="hero-scroll"><span aria-hidden="true">↓</span> desliza para descubrir</div>
      </section>

      <section className="statement section-pad" id="estudio">
        <div className="section-label">01 / El estudio</div>
        <div className="statement-body">
          <p className="section-kicker">Belleza con esencia</p>
          <h2>El arte de<br /><em>sentirte tú.</em></h2>
          <p className="statement-text">Tu próximo cambio empieza por escucharte. En Mayani Studio, imaginamos contigo ese look que te acompaña y expresa quién eres.</p>
          <Brand className="signature" />
        </div>
        <div className="statement-image" role="img" aria-label="Inspiración de un ritual de cuidado del cabello" />
      </section>

      <section className="services section-pad" id="servicios">
        <div className="section-heading"><div className="section-label">02 / Servicios</div><p>Elige tu próximo cambio</p></div>
        <div className="service-list">
          {services.map((service) => (
            <button
              className={selectedService === service.name ? 'service-row active' : 'service-row'}
              key={service.number}
              type="button"
              onClick={() => setSelectedService(service.name)}
              aria-pressed={selectedService === service.name}
            >
              <span className="service-number">{service.number}</span>
              <span className="service-name">{service.name}</span>
              <span className="service-detail">{service.detail}</span>
              <span className="service-action">Consultar</span>
              <span className="service-arrow" aria-hidden="true">↗</span>
            </button>
          ))}
        </div>
        <p className="service-note" aria-live="polite">Tu elección: <strong>{selectedService}</strong>. Consulta los detalles y el valor por WhatsApp.</p>
      </section>

      <section className="gallery section-pad" id="galeria" aria-labelledby="results-title">
        <div className="section-heading"><div className="section-label">03 / Casos de éxito</div><p>Del estudio a nuestro Instagram</p></div>
        <div className="case-intro">
          <h2 id="results-title">El brillo de un<br /><em>cambio real.</em></h2>
          <p>Resultados de alisado y ecoplastia publicados por Mayani Studio. Reproduce cada reel aquí mismo y descubre el trabajo completo.</p>
        </div>
        <div className="case-grid">
          {successStories.map((story) => <CaseCard key={story.id} story={story} />)}
        </div>
        <a className="instagram-link" href={studio.instagramUrl} target="_blank" rel="noopener noreferrer">Más resultados en @{studio.instagramHandle} <span aria-hidden="true">↗</span></a>
      </section>

      <section className="booking section-pad" id="reserva">
        <div className="booking-copy">
          <div className="section-label">04 / Tu cita</div>
          <h2>Tu momento<br /><em>empieza aquí.</em></h2>
          <p>Elige tu servicio y conversemos por WhatsApp. Coordinamos contigo la disponibilidad, los detalles y todo lo que necesitas para tu visita.</p>
          <div className="booking-details">
            <div className="contact-location">
              <span className="contact-label">Visítanos</span>
              <address>{studio.location.address}<br />{studio.location.city} {studio.location.postalCode}, {studio.location.country}</address>
              <a className="directions-link" href={studio.location.mapsUrl} target="_blank" rel="noopener noreferrer">Cómo llegar <span aria-hidden="true">↗</span></a>
            </div>
            <div className="contact-phone">
              <span className="contact-label">Llámanos</span>
              <a href={studio.phone.href}>{studio.phone.display}</a>
            </div>
            <div className="contact-social">
              <span className="contact-label">Redes oficiales</span>
              <a href={studio.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label={`Instagram @${studio.instagramHandle}`}>Instagram @{studio.instagramHandle} <span aria-hidden="true">↗</span></a>
              <a href={studio.tiktokUrl} target="_blank" rel="noopener noreferrer" aria-label={`TikTok @${studio.tiktokHandle}`}>TikTok @{studio.tiktokHandle} <span aria-hidden="true">↗</span></a>
            </div>
          </div>
          <div className="location-map">
            <iframe
              title={`Ubicación de ${studio.name} en ${studio.location.address}, ${studio.location.city}`}
              src={studio.location.embedUrl}
              width="600"
              height="250"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
        <div className="booking-card">
          <div className="booking-channel"><WhatsAppIcon /><span>Conversemos</span></div>
          <h3>Un mensaje.<br />Un nuevo comienzo.</h3>
          <label htmlFor="booking-service">¿Qué tienes en mente?</label>
          <select id="booking-service" value={selectedService} onChange={(event) => setSelectedService(event.target.value)}>
            {services.map((service) => <option key={service.name} value={service.name}>{service.name}</option>)}
          </select>
          <div className="message-preview"><span aria-hidden="true">“</span><p>Hola, Mayani Studio. Me gustaría agendar una cita para {selectedService}.</p></div>
          {whatsappUrl ? (
            <a className="gold-button whatsapp-button" href={whatsappUrl} target="_blank" rel="noopener noreferrer"><WhatsAppIcon />Agendar por WhatsApp <span aria-hidden="true">↗</span></a>
          ) : (
            <button className="gold-button whatsapp-button" type="button" disabled><WhatsAppIcon />Agendar por WhatsApp <span aria-hidden="true">↗</span></button>
          )}
          {whatsappUrl ? (
            <p className="booking-note">Abriremos el chat del estudio con tu servicio elegido. Tu cita se confirma durante la conversación.</p>
          ) : (
            <p className="booking-note booking-pending" role="status">El número de WhatsApp del estudio está pendiente de confirmación.</p>
          )}
        </div>
      </section>

      </main>
      <footer>
        <Brand />
        <p>Hecho para resaltar lo que ya es tuyo.</p>
        <div className="footer-links">
          <a href={studio.location.mapsUrl} target="_blank" rel="noopener noreferrer">Cómo llegar <span aria-hidden="true">↗</span></a>
          <a href={studio.instagramUrl} target="_blank" rel="noopener noreferrer">Instagram <span aria-hidden="true">↗</span></a>
          <a href={studio.tiktokUrl} target="_blank" rel="noopener noreferrer">TikTok <span aria-hidden="true">↗</span></a>
          <a href={studio.phone.href}>{studio.phone.display}</a>
        </div>
      </footer>
    </>
  )
}

export default App
