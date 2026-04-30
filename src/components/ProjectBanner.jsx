export default function ProjectBanner({ project, onReset }) {
  const formatted = new Date(project.deadline).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })

  return (
    <div style={{
      background: 'var(--bp-surface)',
      borderBottom: '0.5px solid var(--bp-border)',
      padding: '16px var(--bp-page-padding)',
      display: 'flex',
      alignItems: 'center',
      gap: '24px',
      flexWrap: 'wrap',
    }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{
          fontSize: 'var(--bp-text-xs)',
          color: 'var(--bp-muted)',
          marginBottom: '4px',
        }}>
          Active project
        </p>
        <h1 style={{
          fontSize: 'var(--bp-text-xl)',
          fontWeight: 500,
          color: 'var(--bp-text)',
          marginBottom: '4px',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}>
          {project.title}
        </h1>
        <p style={{
          fontSize: 'var(--bp-text-base)',
          color: 'var(--bp-muted)',
          fontWeight: 400,
        }}>
          {project.goal}
        </p>
      </div>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        flexShrink: 0,
      }}>
        <div style={{ textAlign: 'right' }}>
          <p style={{ fontSize: 'var(--bp-text-sm)', color: 'var(--bp-muted)' }}>
            Deadline
          </p>
          <p style={{ fontSize: 'var(--bp-text-base)', fontWeight: 500, color: 'var(--bp-text)' }}>
            {formatted}
          </p>
        </div>

        <span style={{
          fontSize: 'var(--bp-text-sm)',
          fontWeight: 500,
          color: 'var(--bp-progress-text)',
          background: 'var(--bp-progress-bg)',
          padding: '4px 10px',
          borderRadius: 'var(--bp-radius-pill)',
          border: 'none',
        }}>
          {project.status}
        </span>

        {onReset && (
          <button
            onClick={onReset}
            style={{
              fontSize: 'var(--bp-text-xs)',
              color: 'var(--bp-muted)',
              cursor: 'pointer',
              background: 'none',
              border: 'none',
              padding: 0,
              fontFamily: 'var(--bp-font)',
            }}
          >
            Reset to demo
          </button>
        )}
      </div>
    </div>
  )
}
