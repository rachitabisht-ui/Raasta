import SkillSprintCard from './SkillSprintCard'

const COLUMNS = [
  { key: 'pending',    label: 'Pending',     bg: 'var(--bp-col-pending)',  dot: '#A1A1AA' },
  { key: 'inprogress', label: 'In Progress', bg: 'var(--bp-col-progress)', dot: 'var(--bp-accent)' },
  { key: 'completed',  label: 'Completed',   bg: 'var(--bp-col-done)',     dot: '#16A34A' },
  { key: 'baked',      label: 'Baked',       bg: 'var(--bp-col-baked)',    dot: 'var(--bp-baked-border)' },
]

export default function BoardShell({ skills = [], onStatusChange, onCardClick }) {
  const forColumn = (key) => skills.filter(s => s.status === key)

  return (
    <div style={{
      background: 'var(--bp-bg)',
      padding: 'var(--bp-page-padding)',
      display: 'flex',
      gap: '12px',
      flex: 1,
      minHeight: 0,
      overflow: 'auto',
    }}>
      {COLUMNS.map(col => {
        const colSkills = forColumn(col.key)
        return (
          <div
            key={col.key}
            style={{
              flex: '1 1 220px',
              background: col.bg,
              borderRadius: 'var(--bp-radius-col)',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              minWidth: '220px',
              alignSelf: 'flex-start',
              minHeight: '120px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                border: 'none',
                background: col.dot,
                flexShrink: 0,
              }} />
              <span style={{
                fontSize: 'var(--bp-text-lg)',
                fontWeight: 500,
                color: 'var(--bp-text)',
                flex: 1,
              }}>
                {col.label}
              </span>
              <span style={{
                fontSize: 'var(--bp-text-xs)',
                color: 'var(--bp-muted)',
                background: 'rgba(0,0,0,0.05)',
                borderRadius: '10px',
                border: 'none',
                padding: '1px 7px',
              }}>
                {colSkills.length}
              </span>
            </div>

            {colSkills.map(skill => (
              <SkillSprintCard
                key={skill.id}
                skill={skill}
                onStatusChange={onStatusChange}
                onCardClick={onCardClick}
              />
            ))}
          </div>
        )
      })}
    </div>
  )
}
