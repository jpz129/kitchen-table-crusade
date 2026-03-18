import type { Mission } from '../types/mission'

interface BattlefieldMapProps {
  mission: Mission
}

const viewWidth = 800
const viewHeight = 480

export const BattlefieldMap = ({ mission }: BattlefieldMapProps) => {
  const board = mission.terrainLayout.board
  const sx = (value: number) => (value / board.width) * viewWidth
  const sy = (value: number) => (value / board.height) * viewHeight

  return (
    <figure className="map-wrapper">
      <svg viewBox={`0 0 ${viewWidth} ${viewHeight}`} role="img" aria-label="Top-down battlefield map">
        <rect x={0} y={0} width={viewWidth} height={viewHeight} className="board-bg" />

        {mission.deployment.zones.map((zone) => (
          <g key={zone.id}>
            <rect
              x={sx(zone.x)}
              y={sy(zone.y)}
              width={sx(zone.width)}
              height={sy(zone.height)}
              className="deployment-zone"
            />
            <text x={sx(zone.x) + 8} y={sy(zone.y) + 18} className="zone-label">
              {zone.label}
            </text>
          </g>
        ))}

        {mission.terrainLayout.placements.map((placement, index) => (
          <g key={placement.id}>
            <rect
              x={sx(placement.x)}
              y={sy(placement.y)}
              width={sx(placement.width)}
              height={sy(placement.height)}
              rx={4}
              className="terrain-rect"
            />
            <text x={sx(placement.x) + 4} y={sy(placement.y) + 14} className="terrain-label">
              {mission.substitutions[index]?.shortLabel ?? placement.terrainType}
            </text>
          </g>
        ))}

        {mission.objectives.markers.map((marker) => (
          <g key={marker.id}>
            <circle cx={sx(marker.x)} cy={sy(marker.y)} r={10} className="objective-dot" />
            <text x={sx(marker.x) + 14} y={sy(marker.y) + 4} className="objective-label">
              {marker.label}
            </text>
          </g>
        ))}

        <g className="map-scale">
          <text x={12} y={viewHeight - 12} className="scale-label">
            Coordinates: 0-100 (X), 0-60 (Y)
          </text>
          <text x={viewWidth - 56} y={18} className="scale-label">
            {viewWidth / 8}
          </text>
        </g>

        <g className="map-legend" transform={`translate(${viewWidth - 230}, ${viewHeight - 78})`}>
          <rect x={0} y={0} width={220} height={66} rx={8} className="legend-bg" />
          <rect x={10} y={10} width={14} height={10} className="deployment-zone" />
          <text x={30} y={19} className="legend-text">
            Deployment Zone
          </text>
          <rect x={10} y={28} width={14} height={10} className="terrain-rect" />
          <text x={30} y={37} className="legend-text">
            Terrain Piece
          </text>
          <circle cx={17} cy={52} r={6} className="objective-dot" />
          <text x={30} y={56} className="legend-text">
            Objective Marker
          </text>
        </g>
      </svg>
      <figcaption>Simple top-down map with deployment zones, objectives, and terrain labels.</figcaption>
    </figure>
  )
}
