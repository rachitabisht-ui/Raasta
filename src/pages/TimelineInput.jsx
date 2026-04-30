import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const inputStyle = {
  width: '100%',
  fontSize: 'var(--bp-text-base)',
  color: 'var(--bp-text)',
  border: '0.5px solid var(--bp-border)',
  borderRadius: 'var(--bp-radius-card)',
  padding: '8px 12px',
  fontFamily: 'var(--bp-font)',
  background: 'var(--bp-surface)',
  boxSizing: 'border-box',
  display: 'block',
}

const labelStyle = {
  fontSize: 'var(--bp-text-sm)',
  color: 'var(--bp-muted)',
  marginBottom: '6px',
  display: 'block',
}

export default function TimelineInput() {
  const navigate  = useNavigate()
  const location  = useLocation()
  const project   = location.state?.project

  const [deadline,   setDeadline]   = useState('')
  const [nextHover,  setNextHover]  = useState(false)

  useEffect(() => { if (!project) navigate('/') }, [project, navigate])
  if (!project) return null

  const handleNext = () => {
    navigate('/skills', {
      state: {
        project: { ...project, deadline: deadline || null },
        path: 'B',
      },
    })
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bp-bg)',
      fontFamily: 'var(--bp-font)',
    }}>
      <div style={{
        maxWidth: '560px',
        margin: '0 auto',
        padding: '80px var(--bp-page-padding) 60px',
      }}>

        <span
          onClick={() => navigate('/start', { state: { path: 'B' } })}
          style={{
            fontSize: 'var(--bp-text-sm)',
            color: 'var(--bp-muted)',
            cursor: 'pointer',
            display: 'inline-block',
            marginBottom: '32px',
          }}
        >
          ← Back
        </span>

        <p style={{
          fontSize: 'var(--bp-text-sm)',
          color: 'var(--bp-muted)',
          margin: 0,
        }}>
          You picked
        </p>
        <p style={{
          fontSize: 'var(--bp-text-md)',
          fontWeight: 500,
          color: 'var(--bp-text)',
          marginTop: '4px',
          marginBottom: '32px',
        }}>
          {project.title}
        </p>

        <h1 style={{
          fontSize: '22px',
          fontWeight: 500,
          color: 'var(--bp-text)',
          marginBottom: '24px',
        }}>
          When do you need this done?
        </h1>

        <div>
          <label style={labelStyle}>Deadline</label>
          <input
            type="date"
            value={deadline}
            onChange={e => setDeadline(e.target.value)}
            style={inputStyle}
          />
        </div>

        <button
          onClick={handleNext}
          onMouseEnter={() => setNextHover(true)}
          onMouseLeave={() => setNextHover(false)}
          style={{
            width: '100%',
            fontSize: 'var(--bp-text-base)',
            fontWeight: 500,
            color: 'var(--bp-surface)',
            background: 'var(--bp-accent)',
            border: 'none',
            borderRadius: 'var(--bp-radius-card)',
            padding: '10px 20px',
            cursor: 'pointer',
            fontFamily: 'var(--bp-font)',
            opacity: nextHover ? 0.9 : 1,
            transition: 'opacity 0.15s',
            marginTop: '24px',
          }}
        >
          Find my skills →
        </button>
      </div>
    </div>
  )
}
