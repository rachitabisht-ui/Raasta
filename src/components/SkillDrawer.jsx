import { useState, useEffect } from 'react'

function daysUntil(dateStr) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const target = new Date(dateStr)
  target.setHours(0, 0, 0, 0)
  return Math.round((target - today) / (1000 * 60 * 60 * 24))
}

function categoryStyle(category) {
  const map = {
    AI:       { bg: 'var(--bp-cat-ai-bg)',       color: 'var(--bp-cat-ai-text)' },
    Design:   { bg: 'var(--bp-cat-design-bg)',   color: 'var(--bp-cat-design-text)' },
    Research: { bg: 'var(--bp-cat-research-bg)', color: 'var(--bp-cat-research-text)' },
    Code:     { bg: 'var(--bp-cat-code-bg)',     color: 'var(--bp-cat-code-text)' },
  }
  return map[category] || { bg: 'var(--bp-cat-other-bg)', color: 'var(--bp-cat-other-text)' }
}

function Divider() {
  return (
    <div style={{
      height: '0.5px',
      background: 'var(--bp-border)',
      margin: '16px 0',
    }} />
  )
}

function SectionLabel({ children }) {
  return (
    <div style={{
      fontSize: 'var(--bp-text-xs)',
      color: 'var(--bp-muted)',
      fontWeight: 500,
      letterSpacing: '0.08em',
      marginBottom: '6px',
    }}>
      {children}
    </div>
  )
}

export default function SkillDrawer({ skill, project, onClose, onProgressUpdate }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true))
    return () => cancelAnimationFrame(id)
  }, [])

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  const isPending    = skill.status === 'pending'
  const isInProgress = skill.status === 'inprogress'
  const isCompleted  = skill.status === 'completed'
  const isBaked      = skill.status === 'baked'

  const days = daysUntil(skill.deadline)
  const dueLabel = days < 0
    ? `${Math.abs(days)} days overdue`
    : days === 0 ? 'Due today'
    : `Due in ${days} days`

  const progressPct = isCompleted || isBaked ? 100 : skill.progress

  const progressFill = isCompleted  ? 'var(--bp-done-text)'
    : isInProgress ? 'var(--bp-accent)'
    : isBaked      ? 'var(--bp-baked-border)'
    : 'transparent'

  const catStyle = categoryStyle(skill.category)

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.15)',
          zIndex: 99,
        }}
      />

      {/* Drawer */}
      <div style={{
        position: 'fixed',
        top: 0,
        right: 0,
        height: '100vh',
        width: '420px',
        background: 'var(--bp-surface)',
        borderLeft: '0.5px solid var(--bp-border)',
        boxShadow: '-4px 0 24px rgba(0,0,0,0.06)',
        overflowY: 'auto',
        zIndex: 100,
        padding: '24px',
        boxSizing: 'border-box',
        fontFamily: 'var(--bp-font)',
        transform: visible ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.25s ease',
      }}>

        {/* Baked note box — rendered above the header divider */}
        {isBaked && (
          <div style={{
            background: 'var(--bp-baked-bg)',
            borderRadius: '6px',
            padding: '10px 12px',
            marginBottom: '16px',
          }}>
            <div style={{
              fontSize: 'var(--bp-text-xs)',
              color: 'var(--bp-baked-text)',
              fontWeight: 500,
              marginBottom: skill.bakedNote ? '4px' : 0,
            }}>
              Used in your project
            </div>
            {skill.bakedNote && (
              <div style={{
                fontSize: 'var(--bp-text-sm)',
                color: 'var(--bp-baked-text)',
              }}>
                {skill.bakedNote}
              </div>
            )}
          </div>
        )}

        {/* Header row */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '6px' }}>
              <span style={{
                fontSize: 'var(--bp-text-lg)',
                fontWeight: 500,
                color: 'var(--bp-text)',
              }}>
                {skill.title}
              </span>
              <span style={{
                fontSize: 'var(--bp-text-xs)',
                background: catStyle.bg,
                color: catStyle.color,
                padding: '2px 7px',
                borderRadius: '4px',
              }}>
                {skill.category}
              </span>
            </div>
            {project?.title && (
              <div style={{
                fontSize: 'var(--bp-text-sm)',
                color: 'var(--bp-muted)',
              }}>
                For: {project.title}
              </div>
            )}
          </div>
          <button
            onClick={onClose}
            style={{
              fontSize: '18px',
              color: 'var(--bp-muted)',
              cursor: 'pointer',
              background: 'none',
              border: 'none',
              padding: 0,
              lineHeight: 1,
              flexShrink: 0,
            }}
          >
            ✕
          </button>
        </div>

        <Divider />

        {/* Why this skill */}
        <SectionLabel>WHY THIS SKILL</SectionLabel>
        <p style={{
          fontSize: 'var(--bp-text-base)',
          color: 'var(--bp-text)',
          lineHeight: 1.6,
          margin: 0,
        }}>
          {skill.rationale}
        </p>

        <Divider />

        {/* Time + deadline row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 'var(--bp-text-sm)', color: 'var(--bp-muted)' }}>
            ○ ~{skill.estimatedHours} hours
          </span>
          <span style={{ fontSize: 'var(--bp-text-sm)', color: 'var(--bp-muted)' }}>
            {dueLabel}
          </span>
        </div>

        <Divider />

        {/* Progress section */}
        <div style={{ opacity: isPending ? 0.45 : 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
            <span style={{ fontSize: 'var(--bp-text-xs)', color: 'var(--bp-muted)' }}>Progress</span>
            <span style={{ fontSize: 'var(--bp-text-xs)', color: 'var(--bp-muted)' }}>{progressPct}%</span>
          </div>
          <div style={{
            height: '3px',
            background: 'var(--bp-border)',
            borderRadius: '2px',
            overflow: 'hidden',
          }}>
            {!isPending && (
              <div style={{
                height: '100%',
                width: `${progressPct}%`,
                background: progressFill,
                borderRadius: '2px',
              }} />
            )}
          </div>

          {isPending && (
            <p style={{
              fontSize: 'var(--bp-text-xs)',
              color: 'var(--bp-muted)',
              fontStyle: 'italic',
              marginTop: '8px',
              marginBottom: 0,
            }}>
              Start this skill to begin tracking progress.
            </p>
          )}

          {isInProgress && (
            <>
              <input
                type="range"
                min={0}
                max={100}
                value={progressPct}
                onChange={e => onProgressUpdate(skill.id, Number(e.target.value))}
                style={{
                  width: '100%',
                  marginTop: '8px',
                  accentColor: 'var(--bp-accent)',
                  cursor: 'pointer',
                }}
              />
              <p style={{
                fontSize: 'var(--bp-text-xs)',
                color: 'var(--bp-muted)',
                marginTop: '6px',
                marginBottom: 0,
              }}>
                Drag to update your progress.
              </p>
            </>
          )}
        </div>

        <Divider />

        {/* Resources section */}
        <SectionLabel>HOW TO USE IT</SectionLabel>

        {(skill.resources || []).length === 0 && (
          <p style={{ fontSize: 'var(--bp-text-sm)', color: 'var(--bp-muted)', margin: 0 }}>
            No resources added yet.
          </p>
        )}

        {(skill.resources || []).map((res, idx) => {
          const isGenerated = res.type === 'generated'
          return (
            <div key={res.id}>
              {idx > 0 && (
                <div style={{
                  height: '0.5px',
                  background: 'var(--bp-border)',
                  margin: '24px 0',
                }} />
              )}

              {/* Source badge */}
              <div style={{ marginBottom: '6px' }}>
                <span style={{
                  fontSize: 'var(--bp-text-xs)',
                  padding: '2px 8px',
                  borderRadius: '20px',
                  background: isGenerated ? 'var(--bp-accent-light)' : 'var(--bp-pending-bg)',
                  color: isGenerated ? 'var(--bp-progress-text)' : 'var(--bp-muted)',
                }}>
                  {res.sourceLabel}
                </span>
              </div>

              {/* Title */}
              <div style={{
                fontSize: 'var(--bp-text-base)',
                fontWeight: 500,
                color: 'var(--bp-text)',
                margin: '6px 0',
              }}>
                {res.title}
              </div>

              {/* Quality label */}
              {res.qualityLabel && (
                <div style={{
                  fontSize: 'var(--bp-text-xs)',
                  color: 'var(--bp-muted)',
                  fontStyle: 'italic',
                  marginBottom: '10px',
                }}>
                  {res.qualityLabel}
                </div>
              )}

              {/* Numbered steps */}
              {(res.steps || []).map((step, i) => (
                <div key={i} style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  marginBottom: '12px',
                }}>
                  <div style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    background: 'var(--bp-accent-light)',
                    color: 'var(--bp-progress-text)',
                    fontSize: '11px',
                    fontWeight: 500,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginRight: '10px',
                    marginTop: '2px',
                  }}>
                    {i + 1}
                  </div>
                  <div style={{
                    fontSize: 'var(--bp-text-sm)',
                    color: 'var(--bp-text)',
                    lineHeight: 1.6,
                  }}>
                    {step}
                  </div>
                </div>
              ))}
            </div>
          )
        })}

        {/* Stuck button — In Progress only */}
        {isInProgress && (
          <StuckButton skillTitle={skill.title} />
        )}

      </div>
    </>
  )
}

function StuckButton({ skillTitle }) {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      onClick={() => console.log('Stuck clicked for:', skillTitle)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: '100%',
        marginTop: '24px',
        fontSize: 'var(--bp-text-sm)',
        color: hovered ? 'var(--bp-accent)' : 'var(--bp-muted)',
        border: `0.5px solid ${hovered ? 'var(--bp-accent)' : 'var(--bp-border)'}`,
        borderRadius: 'var(--bp-radius-card)',
        padding: '10px 16px',
        background: 'none',
        cursor: 'pointer',
        fontFamily: 'var(--bp-font)',
        transition: 'border-color 0.15s, color 0.15s',
      }}
    >
      Stuck? That's where the real learning is. Ask away.
    </button>
  )
}
