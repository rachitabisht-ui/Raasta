import { useState, useEffect } from 'react'
import { suggestSkills } from '../services/claude'

export function useSkillSuggestion(project) {
  const [skills, setSkills]   = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  useEffect(() => {
    if (!project?.title) return
    let cancelled = false

    setLoading(true)
    setError(null)
    setSkills(null)

    suggestSkills(project)
      .then(result  => { if (!cancelled) { setSkills(result);  setLoading(false) } })
      .catch(err    => { if (!cancelled) { setError(err);      setLoading(false) } })

    return () => { cancelled = true }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project?.title, project?.goal])

  return { skills, loading, error }
}
