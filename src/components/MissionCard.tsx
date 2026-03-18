import type { Mission } from '../types/mission'
import { BattlefieldMap } from './BattlefieldMap'
import { TerrainLegend } from './TerrainLegend'

interface MissionCardProps {
  mission: Mission
}

export const MissionCard = ({ mission }: MissionCardProps) => (
  <section className="mission-card" id="mission-card">
    <div className="mission-header">
      <div>
        <h2>{mission.title}</h2>
        <p className="source-label">
          Narrative source: {mission.narrativeSource === 'llm' ? 'OpenAI-enhanced' : 'Template fallback'}
        </p>
      </div>
      <button type="button" className="print-btn" onClick={() => window.print()}>
        Print-Friendly Mission Card
      </button>
    </div>

    <p className="narrative">{mission.narrative}</p>

    <div className="mission-meta">
      <article>
        <h3>Deployment</h3>
        <p>
          <strong>{mission.deployment.name}</strong> - {mission.deployment.description}
        </p>
      </article>
      <article>
        <h3>Objectives</h3>
        <p>
          <strong>{mission.objectives.name}</strong> - {mission.objectives.description}
        </p>
      </article>
      <article>
        <h3>Primary Scoring</h3>
        <p>{mission.scoring.summary}</p>
      </article>
      <article>
        <h3>Mission Twist</h3>
        <p>
          <strong>{mission.twist.name}</strong> - {mission.twist.summary}
        </p>
      </article>
    </div>

    <BattlefieldMap mission={mission} />
    <TerrainLegend mission={mission} />
  </section>
)
