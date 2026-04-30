import { useState } from 'react'

function daysUntil(dateStr) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const target = new Date(dateStr)
  target.setHours(0, 0, 0, 0)
  return Math.round((target - today) / (1000 * 60 * 60 * 24))
}

export default function SkillSprintCard({ skill, onStatusChange, onCardClick }) {
  const [confirming, setConfirming] = useState(false)
  const [bakedInput, setBakedInput] = useState('')
  const [hovered, setHovered] = useState(false)

  const isPending    = skill.status === 'pending'
  const isInProgress = skill.status === 'inprogress'
  const isCompleted  = skill.status === 'completed'
  const isBaked      = skill.status === 'baked'
  const hasLeftBorder = isInProgress || isBaked

  const days = daysUntil(skill.deadline)
  const dueLabel = days < 0
    ? `${Math.abs(days)} days overdue`
    : days === 0 ? 'Due today'
    : `Due in ${days} days`

  const progressPct = isCompleted || isBaked ? 100 : skill.progress
  const progressFill = isCompleted  ? 'var(--bp-done-text)'
    : isInProgress ? 'var(--bp-accent)'
    : isBaked      ? 'var(--bp-baked-border)'
    : 'var(--bp-pending-bg)'

  const button = isPending    ? { label: 'Start',         color: 'var(--bp-accent)',       border: 'var(--bp-accent)' }
    : isInProgress ? { label: 'Mark as done',  color: 'var(--bp-progress-text)', border: 'var(--bp-progress-border)' }
    : isCompleted  ? { label: 'Mark as baked', color: 'var(--bp-baked-text)',    border: 'var(--bp-baked-border)' }
    : null

  const handleButtonClick = () => {
    if (isPending)    return onStatusChange(skill.id, 'inprogress')
    if (isInProgress) return onStatusChange(skill.id, 'completed')
    if (isCompleted)  return setConfirming(true)
  }

  const handleConfirm = () => {
    if (!bakedInput.trim()) return
    onStatusChange(skill.id, 'baked', bakedInput.trim())
    setConfirming(false)
    setBakedInput('')
  }

  const cardStyle = {
    background: 'var(--bp-surface)',
    border: `0.5px solid ${hovered ? 'var(--bp-accent)' : 'var(--bp-border)'}`,
    ...(hasLeftBorder && {
      borderLeft: isInProgress
        ? '2px solid var(--bp-progress-border)'
        : '2px solid var(--bp-baked-border)',
    }),
    borderRadius: hasLeftBorder
      ? '0 var(--bp-radius-card) var(--bp-radius-card) 0'
      : 'var(--bp-radius-card)',
    padding: '12px',
    fontFamily: 'var(--bp-font)',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    cursor: 'pointer',
    transition: 'border-color 0.15s',
  }

  return (
    <div
      style={cardStyle}
      onClick={() => onCardClick?.(skill)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >

      {/* Category tag + status badge */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{
          fontSize: 'var(--bp-text-xs)',
          background: '#EEF2FF',
          color: '#4F46E5',
          padding: '2px 7px',
          borderRadius: '4px',
          border: 'none',
        }}>
          {skill.category}
        </span>

        {(isCompleted || isBaked) && (
          <span style={{
            fontSize: 'var(--bp-text-xs)',
            background: isCompleted ? 'var(--bp-done-bg)' : 'var(--bp-baked-bg)',
            color: isCompleted ? 'var(--bp-done-text)' : 'var(--bp-baked-text)',
            padding: '2px 7px',
            borderRadius: '4px',
            border: 'none',
          }}>
            {isCompleted ? 'Completed' : 'Baked'}
          </span>
        )}
      </div>

      {/* Title */}
      <p style={{
        fontSize: 'var(--bp-text-md)',
        fontWeight: 500,
        color: 'var(--bp-text)',
        lineHeight: 1.3,
        margin: 0,
      }}>
        {skill.title}
      </p>

      {/* Rationale */}
      <div>
        <p style={{ fontSize: 'var(--bp-text-xs)', color: 'var(--bp-muted)', marginBottom: '3px' }}>
          Why this skill
        </p>
        <p style={{
          fontSize: 'var(--bp-text-sm)',
          color: 'var(--bp-muted)',
          lineHeight: 1.5,
          margin: 0,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>
          {skill.rationale}
        </p>
      </div>

      {/* Progress bar — hidden for baked */}
      {!isBaked && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
            <span style={{ fontSize: 'var(--bp-text-xs)', color: 'var(--bp-muted)' }}>Progress</span>
            <span style={{ fontSize: 'var(--bp-text-xs)', color: 'var(--bp-muted)' }}>{progressPct}%</span>
          </div>
          <div style={{ height: '3px', background: 'var(--bp-border)', borderRadius: '2px', overflow: 'hidden' }}>
            <div style={{
              height: '100%',
              width: `${progressPct}%`,
              background: progressFill,
              borderRadius: '2px',
            }} />
          </div>
        </div>
      )}

      {/* Deadline + estimated time — hidden for baked */}
      {!isBaked && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{
            fontSize: 'var(--bp-text-xs)',
            color: days < 0 ? '#EF4444' : 'var(--bp-muted)',
          }}>
            {dueLabel}
          </span>
          <span style={{ fontSize: 'var(--bp-text-xs)', color: 'var(--bp-muted)' }}>
            ~{skill.estimatedHours} hours
          </span>
        </div>
      )}

      {/* Baked note */}
      {isBaked && skill.bakedNote && (
        <div>
          <div style={{
            background: 'var(--bp-baked-bg)',
            borderRadius: '4px',
            padding: '6px 8px',
            fontSize: 'var(--bp-text-sm)',
            color: 'var(--bp-baked-text)',
            lineHeight: 1.5,
          }}>
            {skill.bakedNote}
          </div>
          <p style={{
            fontSize: 'var(--bp-text-xs)',
            color: 'var(--bp-muted)',
            fontStyle: 'italic',
            marginTop: '6px',
            marginBottom: 0,
          }}>
            You actually used it. That's the good stuff.
          </p>
        </div>
      )}

      {/* Baked confirmation form — shown when "Mark as baked" is clicked */}
      {isCompleted && confirming && (
        <div
          style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '2px' }}
          onClick={e => e.stopPropagation()}
        >
          <p style={{ fontSize: 'var(--bp-text-xs)', color: 'var(--bp-muted)', margin: 0 }}>
            Where did you use this?
          </p>
          <textarea
            value={bakedInput}
            onChange={e => setBakedInput(e.target.value)}
            placeholder="Describe where you applied this skill..."
            rows={3}
            style={{
              width: '100%',
              fontSize: 'var(--bp-text-sm)',
              color: 'var(--bp-text)',
              border: '0.5px solid var(--bp-border)',
              borderRadius: '4px',
              padding: '6px 8px',
              fontFamily: 'var(--bp-font)',
              resize: 'vertical',
              background: 'var(--bp-bg)',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
          <button
            onClick={handleConfirm}
            style={{
              alignSelf: 'flex-start',
              fontSize: 'var(--bp-text-xs)',
              color: bakedInput.trim() ? 'var(--bp-baked-text)' : 'var(--bp-muted)',
              border: `0.5px solid ${bakedInput.trim() ? 'var(--bp-baked-border)' : 'var(--bp-border)'}`,
              borderRadius: '4px',
              padding: '3px 8px',
              background: 'transparent',
              cursor: bakedInput.trim() ? 'pointer' : 'default',
              fontFamily: 'var(--bp-font)',
            }}
          >
            Confirm
          </button>
        </div>
      )}

      {/* Status button — hidden while baked confirm is open, and for baked cards */}
      {button && !confirming && (
        <button
          onClick={e => { e.stopPropagation(); handleButtonClick() }}
          style={{
            alignSelf: 'flex-start',
            fontSize: 'var(--bp-text-xs)',
            color: button.color,
            border: `0.5px solid ${button.border}`,
            borderRadius: '4px',
            padding: '3px 8px',
            background: 'transparent',
            cursor: 'pointer',
            fontFamily: 'var(--bp-font)',
            marginTop: '2px',
          }}
        >
          {button.label}
        </button>
      )}

    </div>
  )
}
