import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useSkillSuggestion } from '../hooks/useSkillSuggestion'

const CATEGORY_TAG = {
  AI:       { bg: 'var(--bp-cat-ai-bg)',       text: 'var(--bp-cat-ai-text)' },
  Design:   { bg: 'var(--bp-cat-design-bg)',   text: 'var(--bp-cat-design-text)' },
  Research: { bg: 'var(--bp-cat-research-bg)', text: 'var(--bp-cat-research-text)' },
  Code:     { bg: 'var(--bp-cat-code-bg)',      text: 'var(--bp-cat-code-text)' },
  Other:    { bg: 'var(--bp-cat-other-bg)',     text: 'var(--bp-cat-other-text)' },
}

function LoadingDots() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
      {[0, 1, 2].map(i => (
        <span
          key={i}
          style={{
            display: 'inline-block',
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: 'var(--bp-accent)',
            animation: `bp-dot-pulse 1.4s ease-in-out ${i * 0.16}s infinite`,
          }}
        />
      ))}
    </div>
  )
}

export default function SkillConfirm() {
  const navigate = useNavigate()
  const location = useLocation()
  const project  = location.state?.project

  const { skills: aiSkills, loading, error } = useSkillSuggestion(project)

  const [displayed,   setDisplayed]   = useState(null)
  const [confirmed,   setConfirmed]   = useState([false, false])
  const [swapping,    setSwapping]    = useState([false, false])
  const [swapInputs,  setSwapInputs]  = useState(['', ''])
  const [buildHover,    setBuildHover]    = useState(false)
  const [primaryHover,  setPrimaryHover]  = useState([false, false])
  const [secondaryHover,setSecondaryHover]= useState([false, false])
  const [retrying,      setRetrying]      = useState(0)

  useEffect(() => { if (!project) navigate('/') }, [project, navigate])
  useEffect(() => { if (aiSkills) setDisplayed(aiSkills) }, [aiSkills])

  const handleLooksGood = (i) => {
    setConfirmed(prev  => { const n = [...prev]; n[i] = true;  return n })
    setSwapping(prev   => { const n = [...prev]; n[i] = false; return n })
  }

  const handleSwapClick = (i) => {
    setSwapping(prev => { const n = [...prev]; n[i] = true; return n })
  }

  const handleSwapUpdate = (i) => {
    if (!swapInputs[i].trim()) return
    setDisplayed(prev => {
      const n = [...prev]
      n[i] = {
        ...n[i],
        name: swapInputs[i].trim(),
        rationale: 'You chose this — ' + prev[i].rationale,
      }
      return n
    })
    handleLooksGood(i)
  }

  const handleBuild = () => {
    navigate('/board', { state: { project, skills: displayed } })
  }

  const bothConfirmed = confirmed[0] && confirmed[1]

  if (!project) return null

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
          onClick={() => navigate('/start', { state: { path: location.state?.path || 'A' } })}
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

        {/* Loading */}
        {loading && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <p style={{ fontSize: 'var(--bp-text-md)', color: 'var(--bp-muted)', margin: 0 }}>
              Finding the right skills for your project...
            </p>
            <LoadingDots />
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <p style={{ fontSize: 'var(--bp-text-base)', color: 'var(--bp-muted)', margin: 0 }}>
              Couldn't reach the AI right now. Check your connection and try again.
            </p>
            <button
              onClick={() => setRetrying(r => r + 1)}
              style={{
                alignSelf: 'flex-start',
                fontSize: 'var(--bp-text-sm)',
                color: 'var(--bp-accent)',
                border: '0.5px solid var(--bp-accent)',
                borderRadius: 'var(--bp-radius-card)',
                padding: '6px 14px',
                background: 'transparent',
                cursor: 'pointer',
                fontFamily: 'var(--bp-font)',
              }}
            >
              Try again
            </button>
          </div>
        )}

        {/* Loaded */}
        {!loading && !error && displayed && (
          <div>
            <h1 style={{
              fontSize: '22px',
              fontWeight: 500,
              color: 'var(--bp-text)',
              marginBottom: '8px',
            }}>
              Here's what we'd focus on
            </h1>
            <p style={{
              fontSize: 'var(--bp-text-sm)',
              color: 'var(--bp-muted)',
              marginBottom: '32px',
            }}>
              Two skills. One project. Let's actually use them.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {displayed.map((skill, i) => {
                const tag = CATEGORY_TAG[skill.category] || CATEGORY_TAG.Other
                const isConfirmed = confirmed[i]
                const isSwapping  = swapping[i]

                return (
                  <div key={i}>
                    {/* Skill card */}
                    <div style={{
                      background: 'var(--bp-surface)',
                      border: '0.5px solid var(--bp-border)',
                      ...(isConfirmed && {
                        borderLeft: '2px solid var(--bp-done-text)',
                        borderRadius: '0 var(--bp-radius-card) var(--bp-radius-card) 0',
                      }),
                      ...(!isConfirmed && {
                        borderRadius: 'var(--bp-radius-card)',
                      }),
                      padding: '16px',
                    }}>
                      {/* Category tag */}
                      <span style={{
                        fontSize: 'var(--bp-text-xs)',
                        background: tag.bg,
                        color: tag.text,
                        padding: '2px 7px',
                        borderRadius: '4px',
                        border: 'none',
                        display: 'inline-block',
                        marginBottom: '8px',
                      }}>
                        {skill.category}
                      </span>

                      <p style={{
                        fontSize: 'var(--bp-text-lg)',
                        fontWeight: 500,
                        color: 'var(--bp-text)',
                        margin: 0,
                      }}>
                        {skill.name}
                      </p>

                      <p style={{
                        fontSize: 'var(--bp-text-xs)',
                        color: 'var(--bp-muted)',
                        marginTop: '8px',
                        marginBottom: '4px',
                      }}>
                        Why this skill
                      </p>
                      <p style={{
                        fontSize: 'var(--bp-text-sm)',
                        color: 'var(--bp-text)',
                        lineHeight: 1.5,
                        margin: 0,
                      }}>
                        {skill.rationale}
                      </p>

                      <p style={{
                        fontSize: 'var(--bp-text-xs)',
                        color: 'var(--bp-muted)',
                        marginTop: '8px',
                        marginBottom: 0,
                      }}>
                        ~{skill.estimatedHours} hours to get functional
                      </p>
                    </div>

                    {/* Action row */}
                    {!isConfirmed && !isSwapping && (
                      <div style={{
                        display: 'flex',
                        gap: '8px',
                        marginTop: '12px',
                      }}>
                        <button
                          onClick={() => handleLooksGood(i)}
                          onMouseEnter={() => setPrimaryHover(prev => { const n=[...prev]; n[i]=true;  return n })}
                          onMouseLeave={() => setPrimaryHover(prev => { const n=[...prev]; n[i]=false; return n })}
                          style={{
                            fontSize: 'var(--bp-text-base)',
                            fontWeight: 500,
                            color: 'var(--bp-surface)',
                            background: 'var(--bp-accent)',
                            border: 'none',
                            borderRadius: 'var(--bp-radius-card)',
                            padding: '8px 20px',
                            cursor: 'pointer',
                            fontFamily: 'var(--bp-font)',
                            opacity: primaryHover[i] ? 0.9 : 1,
                            transition: 'opacity 0.15s',
                          }}
                        >
                          Looks good
                        </button>
                        <button
                          onClick={() => handleSwapClick(i)}
                          onMouseEnter={() => setSecondaryHover(prev => { const n=[...prev]; n[i]=true;  return n })}
                          onMouseLeave={() => setSecondaryHover(prev => { const n=[...prev]; n[i]=false; return n })}
                          style={{
                            fontSize: 'var(--bp-text-base)',
                            color: secondaryHover[i] ? 'var(--bp-accent)' : 'var(--bp-muted)',
                            background: 'none',
                            border: `0.5px solid ${secondaryHover[i] ? 'var(--bp-accent)' : 'var(--bp-border)'}`,
                            borderRadius: 'var(--bp-radius-card)',
                            padding: '8px 20px',
                            cursor: 'pointer',
                            fontFamily: 'var(--bp-font)',
                            transition: 'color 0.15s, border-color 0.15s',
                          }}
                        >
                          Swap this
                        </button>
                      </div>
                    )}

                    {/* Swap input */}
                    {isSwapping && !isConfirmed && (
                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '6px',
                        marginTop: '10px',
                      }}>
                        <input
                          type="text"
                          value={swapInputs[i]}
                          onChange={e => {
                            const n = [...swapInputs]
                            n[i] = e.target.value
                            setSwapInputs(n)
                          }}
                          placeholder="What would you rather learn?"
                          autoFocus
                          style={{
                            width: '100%',
                            fontSize: 'var(--bp-text-base)',
                            color: 'var(--bp-text)',
                            border: '0.5px solid var(--bp-border)',
                            borderRadius: 'var(--bp-radius-card)',
                            padding: '8px 12px',
                            fontFamily: 'var(--bp-font)',
                            background: 'var(--bp-surface)',
                            boxSizing: 'border-box',
                          }}
                        />
                        <button
                          onClick={() => handleSwapUpdate(i)}
                          style={{
                            alignSelf: 'flex-start',
                            fontSize: 'var(--bp-text-xs)',
                            color: swapInputs[i].trim() ? 'var(--bp-accent)' : 'var(--bp-muted)',
                            border: `0.5px solid ${swapInputs[i].trim() ? 'var(--bp-accent)' : 'var(--bp-border)'}`,
                            borderRadius: '4px',
                            padding: '3px 10px',
                            background: 'transparent',
                            cursor: swapInputs[i].trim() ? 'pointer' : 'default',
                            fontFamily: 'var(--bp-font)',
                          }}
                        >
                          Update
                        </button>
                      </div>
                    )}

                    {isConfirmed && (
                      <p style={{
                        fontSize: 'var(--bp-text-sm)',
                        fontWeight: 500,
                        color: 'var(--bp-done-text)',
                        marginTop: '10px',
                        marginBottom: 0,
                      }}>
                        ✓ Added to your board
                      </p>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Build button */}
            <button
              onClick={handleBuild}
              disabled={!bothConfirmed}
              onMouseEnter={() => setBuildHover(true)}
              onMouseLeave={() => setBuildHover(false)}
              style={{
                width: '100%',
                fontSize: 'var(--bp-text-base)',
                fontWeight: 500,
                color: 'var(--bp-surface)',
                background: 'var(--bp-accent)',
                border: 'none',
                borderRadius: 'var(--bp-radius-card)',
                padding: '10px 20px',
                cursor: bothConfirmed ? 'pointer' : 'not-allowed',
                fontFamily: 'var(--bp-font)',
                opacity: !bothConfirmed ? 0.4 : buildHover ? 0.9 : 1,
                transition: 'opacity 0.15s',
                marginTop: '32px',
              }}
            >
              Build my board →
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
