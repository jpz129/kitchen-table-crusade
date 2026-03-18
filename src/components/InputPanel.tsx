import { householdOptions } from '../data/substitutions'
import type { GameSize, Tone, UserInputs } from '../types/mission'

interface InputPanelProps {
  inputs: UserInputs
  onChange: (next: UserInputs) => void
  onGenerate: () => void
  onRandomize: () => void
  onReset: () => void
}

const gameSizes: GameSize[] = [500, 1000, 2000]
const tones: Tone[] = ['Serious', 'Epic', 'Ridiculous']

export const InputPanel = ({ inputs, onChange, onGenerate, onRandomize, onReset }: InputPanelProps) => {
  const toggleTerrain = (option: UserInputs['householdTerrain'][number]) => {
    const selected = inputs.householdTerrain.includes(option)
    const householdTerrain = selected
      ? inputs.householdTerrain.filter((item) => item !== option)
      : [...inputs.householdTerrain, option]
    onChange({ ...inputs, householdTerrain })
  }

  return (
    <section className="input-panel">
      <h2>Mission Controls</h2>

      <label className="field">
        <span>Game Size</span>
        <select
          value={inputs.gameSize}
          onChange={(event) => onChange({ ...inputs, gameSize: Number(event.target.value) as GameSize })}
        >
          {gameSizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </label>

      <label className="field">
        <span>Army 1</span>
        <input
          type="text"
          value={inputs.army1}
          placeholder="The First Force"
          onChange={(event) => onChange({ ...inputs, army1: event.target.value })}
        />
      </label>

      <label className="field">
        <span>Army 2</span>
        <input
          type="text"
          value={inputs.army2}
          placeholder="The Invading Host"
          onChange={(event) => onChange({ ...inputs, army2: event.target.value })}
        />
      </label>

      <label className="field">
        <span>Tone</span>
        <select value={inputs.tone} onChange={(event) => onChange({ ...inputs, tone: event.target.value as Tone })}>
          {tones.map((tone) => (
            <option key={tone} value={tone}>
              {tone}
            </option>
          ))}
        </select>
      </label>

      <fieldset className="field terrain-group">
        <legend>Household Terrain Available</legend>
        <div className="checkbox-grid">
          {householdOptions.map((option) => (
            <label key={option} className="check-item">
              <input
                type="checkbox"
                checked={inputs.householdTerrain.includes(option)}
                onChange={() => toggleTerrain(option)}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="button-row">
        <button type="button" onClick={onGenerate}>
          Generate Mission
        </button>
        <button type="button" onClick={onRandomize}>
          Randomize Inputs
        </button>
        <button type="button" className="ghost" onClick={onReset}>
          Reset
        </button>
      </div>
    </section>
  )
}
