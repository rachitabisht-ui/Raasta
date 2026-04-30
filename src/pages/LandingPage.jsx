import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SVG_TEXTURE = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23noise)' opacity='0.08'/%3E%3Cline x1='23' y1='45' x2='187' y2='52' stroke='%238B7355' stroke-width='0.4' opacity='0.15'/%3E%3Cline x1='56' y1='120' x2='134' y2='118' stroke='%238B7355' stroke-width='0.3' opacity='0.12'/%3E%3Cline x1='200' y1='67' x2='380' y2='71' stroke='%238B7355' stroke-width='0.4' opacity='0.14'/%3E%3Cline x1='12' y1='200' x2='95' y2='196' stroke='%238B7355' stroke-width='0.3' opacity='0.1'/%3E%3Cline x1='145' y1='234' x2='298' y2='229' stroke='%238B7355' stroke-width='0.35' opacity='0.13'/%3E%3Cline x1='310' y1='189' x2='395' y2='193' stroke='%238B7355' stroke-width='0.3' opacity='0.11'/%3E%3Cline x1='67' y1='312' x2='223' y2='307' stroke='%238B7355' stroke-width='0.4' opacity='0.12'/%3E%3Cline x1='245' y1='345' x2='389' y2='351' stroke='%238B7355' stroke-width='0.3' opacity='0.1'/%3E%3Cline x1='34' y1='378' x2='156' y2='374' stroke='%238B7355' stroke-width='0.35' opacity='0.13'/%3E%3Cline x1='178' y1='156' x2='356' y2='162' stroke='%238B7355' stroke-width='0.3' opacity='0.09'/%3E%3Cline x1='88' y1='267' x2='134' y2='271' stroke='%238B7355' stroke-width='0.4' opacity='0.14'/%3E%3Cline x1='267' y1='98' x2='334' y2='94' stroke='%238B7355' stroke-width='0.3' opacity='0.11'/%3E%3C/svg%3E")`

export default function LandingPage() {
  const navigate = useNavigate()
  const [hovered, setHovered] = useState(null)

  const cardShadow = (isHovered) => isHovered
    ? '8px 8px 18px rgba(155, 145, 130, 0.4), -8px -8px 18px rgba(248, 246, 240, 0.85)'
    : '6px 6px 14px rgba(155, 145, 130, 0.35), -6px -6px 14px rgba(248, 246, 240, 0.75)'

  const cardBase = (key) => ({
    flex: 1,
    background: '#DEDAD2',
    borderRadius: '16px',
    border: '1px solid rgba(180, 165, 140, 0.45)',
    padding: '20px',
    cursor: 'pointer',
    boxShadow: cardShadow(hovered === key),
    transform: hovered === key ? 'translateY(-2px)' : 'translateY(0)',
    transition: 'box-shadow 0.2s ease, transform 0.2s ease',
  })

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'var(--bp-font)',
      backgroundColor: '#DEDAD2',
      backgroundImage: `radial-gradient(ellipse at center, transparent 60%, rgba(139, 115, 85, 0.08) 100%), ${SVG_TEXTURE}`,
      backgroundRepeat: 'no-repeat, repeat',
      backgroundSize: '100% 100%, 400px 400px',
    }}>
      {/* Centered content */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 var(--bp-page-padding)',
      }}>

        <span style={{
          fontSize: '32px',
          fontWeight: 600,
          color: 'var(--bp-accent)',
          textAlign: 'center',
          marginBottom: '16px',
          letterSpacing: '-0.5px',
        }}>
          Raasta
        </span>

        <h1 style={{
          fontSize: '28px',
          fontWeight: 500,
          color: '#2C2416',
          maxWidth: '560px',
          textAlign: 'center',
          lineHeight: 1.4,
          margin: 0,
        }}>
          Raasta turns what you want to learn into something you actually build.
        </h1>

        <p style={{
          fontSize: 'var(--bp-text-md)',
          color: '#6B5B3E',
          textAlign: 'center',
          marginTop: '12px',
        }}>
          Pick a project. Learn what you need. Use it. That's it.
        </p>

        {/* Entry cards */}
        <div style={{
          display: 'flex',
          gap: '16px',
          width: '100%',
          maxWidth: '560px',
          marginTop: '32px',
        }}>
          {/* Card A */}
          <div
            style={cardBase('A')}
            onMouseEnter={() => setHovered('A')}
            onMouseLeave={() => setHovered(null)}
            onClick={() => navigate('/start', { state: { path: 'A' } })}
          >
            <p style={{
              fontSize: 'var(--bp-text-xs)',
              color: 'var(--bp-accent)',
              fontWeight: 500,
              marginBottom: '6px',
            }}>
              I know what I want to build
            </p>
            <p style={{
              fontSize: 'var(--bp-text-md)',
              fontWeight: 500,
              color: '#2C2416',
              margin: 0,
            }}>
              Have a project in mind?
            </p>
            <p style={{
              fontSize: 'var(--bp-text-sm)',
              color: '#6B5B3E',
              marginTop: '4px',
              marginBottom: 0,
            }}>
              Tell us what you're building and we'll figure out what to learn.
            </p>
          </div>

          {/* Card B */}
          <div
            style={cardBase('B')}
            onMouseEnter={() => setHovered('B')}
            onMouseLeave={() => setHovered(null)}
            onClick={() => navigate('/start', { state: { path: 'B' } })}
          >
            <p style={{
              fontSize: 'var(--bp-text-xs)',
              color: 'var(--bp-muted)',
              fontWeight: 500,
              marginBottom: '6px',
            }}>
              Help me find a project
            </p>
            <p style={{
              fontSize: 'var(--bp-text-md)',
              fontWeight: 500,
              color: '#2C2416',
              margin: 0,
            }}>
              Not sure what to build?
            </p>
            <p style={{
              fontSize: 'var(--bp-text-sm)',
              color: '#6B5B3E',
              marginTop: '4px',
              marginBottom: 0,
            }}>
              Answer two questions and we'll suggest something worth making.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
