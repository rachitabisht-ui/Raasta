import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage   from './pages/LandingPage'
import EntryFlow     from './pages/EntryFlow'
import TimelineInput from './pages/TimelineInput'
import SkillConfirm  from './pages/SkillConfirm'
import BoardPage     from './pages/BoardPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"          element={<LandingPage />} />
        <Route path="/start"     element={<EntryFlow />} />
        <Route path="/timeline"  element={<TimelineInput />} />
        <Route path="/skills"    element={<SkillConfirm />} />
        <Route path="/board"     element={<BoardPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
