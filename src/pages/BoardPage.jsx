import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import ProjectBanner from '../components/ProjectBanner'
import BoardShell    from '../components/BoardShell'
import SkillDrawer   from '../components/SkillDrawer'
import { project as mockProject, skills as mockSkills } from '../data/mockData'

const resourceMap = {
  'notebooklm':  mockSkills[0].resources,
  'claude':      mockSkills[1].resources,
  'figma':       [mockSkills[1].resources[0]],
  'n8n':         mockSkills[0].resources,
  'vibe coding': mockSkills[1].resources,
  'runway':      mockSkills[0].resources,
  'midjourney':  mockSkills[0].resources,
}

function lookupResources(skillName, index) {
  const lower = (skillName || '').toLowerCase()
  const matchedKey = Object.keys(resourceMap).find(key => lower.includes(key))
  if (matchedKey) return resourceMap[matchedKey]
  return [{
    id: 'res-placeholder-' + index,
    type: 'generated',
    sourceLabel: 'Generated for your project',
    title: `Getting started with ${skillName}`,
    qualityLabel: 'Shows the process, not just the output.',
    steps: [
      "Start by exploring the tool's main interface for 10 minutes without a specific goal — just get familiar.",
      'Find one specific task from your project that this skill could help with.',
      'Try to complete that one task using the tool. Do not move on until you have a result.',
      'Note what worked, what confused you, and what you would do differently.',
      'Come back to this card and update your progress.',
    ],
  }]
}

function buildDeadline(projectDeadline, index) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  if (projectDeadline) {
    const end = new Date(projectDeadline)
    end.setHours(0, 0, 0, 0)
    const daysLeft = Math.max(1, Math.round((end - today) / (1000 * 60 * 60 * 24)))
    const factor   = index === 0 ? 0.6 : 0.9
    const d = new Date(today)
    d.setDate(today.getDate() + Math.round(daysLeft * factor))
    return d.toISOString().split('T')[0]
  }

  const offset = index === 0 ? 10 : 18
  const d = new Date(today)
  d.setDate(today.getDate() + offset)
  return d.toISOString().split('T')[0]
}

export default function BoardPage() {
  const location = useLocation()
  const goTo     = useNavigate()

  const incomingProject = location.state?.project
  const incomingSkills  = location.state?.skills

  const [project] = useState(() => incomingProject || mockProject)

  const [skills, setSkills] = useState(() => {
    if (!incomingSkills) return mockSkills

    const projectId = 'proj-' + Date.now()
    return incomingSkills.map((skill, i) => ({
      id:             'skill-' + (Date.now() + i),
      projectId,
      title:          skill.name,
      category:       skill.category,
      rationale:      skill.rationale,
      status:         'pending',
      progress:       0,
      deadline:       buildDeadline(incomingProject?.deadline, i),
      estimatedHours: skill.estimatedHours,
      note:           skill.rationale,
      bakedNote:      null,
      resources:      lookupResources(skill.name, i),
    }))
  })

  const [selectedSkillId, setSelectedSkillId] = useState(null)

  const handleStatusChange = (skillId, nextStatus, bakedNote = null) => {
    setSkills(prev => prev.map(s => {
      if (s.id !== skillId) return s
      return {
        ...s,
        status:   nextStatus,
        progress: nextStatus === 'completed' || nextStatus === 'baked' ? 100 : s.progress,
        ...(bakedNote !== null && { bakedNote }),
      }
    }))
  }

  const handleProgressUpdate = (skillId, progress) => {
    setSkills(prev => prev.map(s => s.id === skillId ? { ...s, progress } : s))
  }

  const handleCardClick  = (skill) => setSelectedSkillId(skill.id)
  const handleDrawerClose = () => setSelectedSkillId(null)
  const handleReset       = () => goTo('/')

  const drawerSkill = selectedSkillId ? skills.find(s => s.id === selectedSkillId) : null

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      fontFamily: 'var(--bp-font)',
      background: 'var(--bp-bg)',
    }}>
      <ProjectBanner project={project} onReset={handleReset} />
      <BoardShell
        skills={skills}
        onStatusChange={handleStatusChange}
        onCardClick={handleCardClick}
      />
      {drawerSkill && (
        <SkillDrawer
          key={drawerSkill.id}
          skill={drawerSkill}
          project={project}
          onClose={handleDrawerClose}
          onProgressUpdate={handleProgressUpdate}
        />
      )}
    </div>
  )
}
