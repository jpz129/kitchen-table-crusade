import { useEffect, useMemo, useState } from 'react'
import { InputPanel } from './components/InputPanel'
import { MissionCard } from './components/MissionCard'
import { defaultInputs } from './data/defaults'
import { householdOptions } from './data/substitutions'
import { generateMission } from './engine/generateMission'
import type { UserInputs } from './types/mission'
import { loadLastMission, saveLastMission } from './utils/storage'
import './App.css'

function App() {
  const [inputs, setInputs] = useState<UserInputs>(defaultInputs)
  const [mission, setMission] = useState(() => loadLastMission())

  useEffect(() => {
    if (mission) {
      saveLastMission(mission)
    }
  }, [mission])

  useEffect(() => {
    if (mission?.inputsUsed) {
      setInputs(mission.inputsUsed)
    }
  }, [mission])

  const subtitle = useMemo(
    () => 'Improvised battlefield generator for sci-fi tabletop play.',
    [],
  )

  const handleGenerate = (nextInputs = inputs) => {
    setMission(generateMission(nextInputs))
  }

  const handleRandomize = () => {
    const randomCount = Math.floor(Math.random() * 4) + 2
    const randomTerrain = [...householdOptions].sort(() => 0.5 - Math.random()).slice(0, randomCount)
    const randomInputs: UserInputs = {
      gameSize: [500, 1000, 2000][Math.floor(Math.random() * 3)] as UserInputs['gameSize'],
      tone: ['Serious', 'Epic', 'Ridiculous'][Math.floor(Math.random() * 3)] as UserInputs['tone'],
      army1: '',
      army2: '',
      householdTerrain: randomTerrain,
    }
    setInputs(randomInputs)
    handleGenerate(randomInputs)
  }

  const handleReset = () => {
    setInputs(defaultInputs)
    setMission(null)
    window.localStorage.removeItem('ktc:lastMission')
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>Kitchen Table Crusade</h1>
        <p>{subtitle}</p>
      </header>

      <main className="layout">
        <InputPanel
          inputs={inputs}
          onChange={setInputs}
          onGenerate={() => handleGenerate()}
          onRandomize={handleRandomize}
          onReset={handleReset}
        />

        <div className="output-panel">
          {mission ? (
            <MissionCard mission={mission} />
          ) : (
            <section className="empty-state">
              <h2>No mission generated yet</h2>
              <p>
                Choose your inputs and click <strong>Generate Mission</strong> to build an original mission card.
              </p>
            </section>
          )}
        </div>
      </main>
    </div>
  )
}

export default App
