import type { Mission } from '../types/mission'

interface TerrainLegendProps {
  mission: Mission
}

export const TerrainLegend = ({ mission }: TerrainLegendProps) => (
  <section className="terrain-legend">
    <h3>Terrain Substitutions</h3>
    <ul>
      {mission.substitutions.map((substitution, index) => (
        <li key={`${substitution.terrainType}-${index}`}>
          <strong>{substitution.terrainType}</strong>: {substitution.name} ({substitution.householdType})
        </li>
      ))}
    </ul>
  </section>
)
