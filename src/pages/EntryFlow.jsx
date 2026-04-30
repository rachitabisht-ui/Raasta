import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const FOCUS_OPTIONS = ['Coursework', 'Job search', 'Personal interest', 'Other']

const SUGGESTIONS = {
  Coursework: [
    {
      title: 'Turn your research into a case study',
      description: 'Structure your findings into a portfolio piece hiring managers actually read.',
      skills: ['NotebookLM', 'Figma'],
    },
    {
      title: 'Build a presentation for your capstone',
      description: 'Go from messy notes to a deck that tells a clear story.',
      skills: ['NotebookLM', 'Slides AI'],
    },
    {
      title: 'Document your design process',
      description: 'Make your thinking visible — not just your output.',
      skills: ['Figma', 'Loom'],
    },
  ],
  'Job search': [
    {
      title: 'Build a portfolio case study from scratch',
      description: "Take one project you've done and make it interview-ready.",
      skills: ['Figma', 'NotebookLM'],
    },
    {
      title: 'Create a personal website',
      description: "Something simple that shows who you are and what you've made.",
      skills: ['Vibe coding', 'Figma'],
    },
    {
      title: 'Prepare a research-backed pitch deck',
      description: 'Use AI to synthesise your research into a compelling narrative.',
      skills: ['NotebookLM', 'Slides AI'],
    },
  ],
  'Personal interest': [
    {
      title: 'Build a tool that solves something in your daily workflow',
      description: 'Automate the thing that annoys you most.',
      skills: ['Claude Code', 'n8n'],
    },
    {
      title: 'Create an AI-assisted creative project',
      description: "Images, video, writing — make something you've been putting off.",
      skills: ['Midjourney', 'Runway'],
    },
    {
      title: 'Document and share what you know',
      description: 'Turn your expertise into something others can learn from.',
      skills: ['NotebookLM', 'Loom'],
    },
  ],
}
SUGGESTIONS.Other = SUGGESTIONS['Personal interest']

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

export default function EntryFlow() {
  const navigate = useNavigate()
  const location = useLocation()
  const path = location.state?.path || 'A'

  // Path A state
  const [title, setTitle]       = useState('')
  const [goal, setGoal]         = useState('')
  const [deadline, setDeadline] = useState('')
  const [submitHover, setSubmitHover] = useState(false)

  // Path B state
  const [focus, setFocus]           = useState(null)
  const [wish, setWish]             = useState('')
  const [cardHover, setCardHover]   = useState(null)
  const [cardsTriggered, setCardsTriggered] = useState(false)
  const [nextHover, setNextHover]   = useState(false)

  const handlePathASubmit = () => {
    if (!title.trim() || !goal.trim()) return
    navigate('/skills', {
      state: {
        project: {
          title: title.trim(),
          goal: goal.trim(),
          deadline: deadline || null,
          status: 'active',
          version: 1,
        },
        path: 'A',
      },
    })
  }

  const handleSuggestionClick = (card) => {
    navigate('/timeline', {
      state: {
        project: {
          title: card.title,
          goal: card.description,
          deadline: null,
          status: 'active',
          version: 1,
        },
        path: 'B',
      },
    })
  }

  const suggestions = focus ? (SUGGESTIONS[focus] || SUGGESTIONS['Personal interest']) : []
  const showSuggestions = focus && (wish.length > 20 || cardsTriggered)
  const pathAReady = title.trim() && goal.trim()

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

        {/* Back */}
        <span
          onClick={() => navigate('/')}
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

        {/* ── PATH A ── */}
        {path === 'A' && (
          <div>
            <h1 style={{
              fontSize: '22px',
              fontWeight: 500,
              color: 'var(--bp-text)',
              marginBottom: '24px',
            }}>
              What are you building?
            </h1>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={labelStyle}>Project name</label>
                <input
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="e.g. Portfolio case study, Capstone presentation, Personal tool"
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>What does done look like?</label>
                <textarea
                  rows={3}
                  value={goal}
                  onChange={e => setGoal(e.target.value)}
                  placeholder="e.g. A published case study I can send to hiring managers"
                  style={{ ...inputStyle, resize: 'vertical' }}
                />
              </div>

              <div>
                <label style={labelStyle}>When do you need this done?</label>
                <input
                  type="date"
                  value={deadline}
                  onChange={e => setDeadline(e.target.value)}
                  style={inputStyle}
                />
              </div>

              <button
                onClick={handlePathASubmit}
                disabled={!pathAReady}
                onMouseEnter={() => setSubmitHover(true)}
                onMouseLeave={() => setSubmitHover(false)}
                style={{
                  width: '100%',
                  fontSize: 'var(--bp-text-base)',
                  fontWeight: 500,
                  color: 'var(--bp-surface)',
                  background: 'var(--bp-accent)',
                  border: 'none',
                  borderRadius: 'var(--bp-radius-card)',
                  padding: '10px 20px',
                  cursor: pathAReady ? 'pointer' : 'not-allowed',
                  fontFamily: 'var(--bp-font)',
                  opacity: !pathAReady ? 0.4 : submitHover ? 0.9 : 1,
                  transition: 'opacity 0.15s',
                  marginTop: '8px',
                }}
              >
                Find my skills →
              </button>
            </div>
          </div>
        )}

        {/* ── PATH B ── */}
        {path === 'B' && (
          <div>
            <h1 style={{
              fontSize: '22px',
              fontWeight: 500,
              color: 'var(--bp-text)',
              marginBottom: '24px',
            }}>
              What's your current focus?
            </h1>

            {/* Focus pills — 2x2 grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '8px',
            }}>
              {FOCUS_OPTIONS.map(opt => (
                <button
                  key={opt}
                  onClick={() => setFocus(opt)}
                  style={{
                    background: focus === opt ? 'var(--bp-accent-light)' : 'var(--bp-surface)',
                    border: `0.5px solid ${focus === opt ? 'var(--bp-accent)' : 'var(--bp-border)'}`,
                    borderRadius: 'var(--bp-radius-pill)',
                    padding: '8px 16px',
                    fontSize: 'var(--bp-text-sm)',
                    color: focus === opt ? 'var(--bp-progress-text)' : 'var(--bp-text)',
                    cursor: 'pointer',
                    fontFamily: 'var(--bp-font)',
                    transition: 'background 0.15s, border-color 0.15s',
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>

            {/* Q2 — slides in after focus selected */}
            <div style={{
              overflow: 'hidden',
              maxHeight: focus ? '1200px' : '0',
              opacity: focus ? 1 : 0,
              transition: 'max-height 0.35s ease, opacity 0.3s ease',
            }}>
              <h2 style={{
                fontSize: 'var(--bp-text-lg)',
                fontWeight: 500,
                color: 'var(--bp-text)',
                marginTop: '32px',
                marginBottom: '12px',
              }}>
                What's something you keep wishing you could do or make?
              </h2>

              <textarea
                rows={4}
                value={wish}
                onChange={e => setWish(e.target.value)}
                placeholder="Don't overthink it — just write what comes to mind."
                style={{ ...inputStyle, resize: 'vertical' }}
              />

              {/* Next button — always visible once focus is selected */}
              <button
                onClick={() => setCardsTriggered(true)}
                disabled={!wish.trim()}
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
                  cursor: wish.trim() ? 'pointer' : 'not-allowed',
                  fontFamily: 'var(--bp-font)',
                  opacity: !wish.trim() ? 0.4 : nextHover ? 0.9 : 1,
                  transition: 'opacity 0.15s',
                  marginTop: '12px',
                }}
              >
                Next →
              </button>

              {/* Suggestion cards — appear after 20 chars or on Next click */}
              <div style={{
                overflow: 'hidden',
                maxHeight: showSuggestions ? '800px' : '0',
                opacity: showSuggestions ? 1 : 0,
                transition: 'max-height 0.4s ease, opacity 0.3s ease',
                marginTop: '16px',
              }}>
                {suggestions.map((card, i) => (
                  <div
                    key={i}
                    onClick={() => handleSuggestionClick(card)}
                    onMouseEnter={() => setCardHover(i)}
                    onMouseLeave={() => setCardHover(null)}
                    style={{
                      background: 'var(--bp-surface)',
                      border: `0.5px solid ${cardHover === i ? 'var(--bp-accent)' : 'var(--bp-border)'}`,
                      borderRadius: 'var(--bp-radius-card)',
                      padding: '16px',
                      cursor: 'pointer',
                      marginBottom: '8px',
                      transition: 'border-color 0.15s',
                    }}
                  >
                    <p style={{
                      fontSize: 'var(--bp-text-md)',
                      fontWeight: 500,
                      color: 'var(--bp-text)',
                      margin: 0,
                    }}>
                      {card.title}
                    </p>
                    <p style={{
                      fontSize: 'var(--bp-text-sm)',
                      color: 'var(--bp-muted)',
                      marginTop: '4px',
                      marginBottom: 0,
                    }}>
                      {card.description}
                    </p>
                    <div style={{
                      display: 'flex',
                      gap: '6px',
                      marginTop: '10px',
                    }}>
                      {card.skills.map(s => (
                        <span
                          key={s}
                          style={{
                            background: 'var(--bp-accent-light)',
                            color: 'var(--bp-progress-text)',
                            fontSize: 'var(--bp-text-xs)',
                            padding: '2px 8px',
                            borderRadius: 'var(--bp-radius-pill)',
                            border: 'none',
                          }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
