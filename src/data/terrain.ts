import type { TerrainTemplate } from '../types/mission'

export const terrainTemplates: TerrainTemplate[] = [
  {
    id: 'balanced-grid',
    name: 'Balanced Grid',
    placements: [
      { id: 't1', terrainType: 'Large Ruin', x: 18, y: 16, width: 14, height: 10 },
      { id: 't2', terrainType: 'Large Ruin', x: 68, y: 34, width: 14, height: 10 },
      { id: 't3', terrainType: 'Medium Ruin', x: 60, y: 12, width: 10, height: 8 },
      { id: 't4', terrainType: 'Medium Ruin', x: 30, y: 38, width: 10, height: 8 },
      { id: 't5', terrainType: 'Barricade', x: 46, y: 20, width: 10, height: 4 },
      { id: 't6', terrainType: 'Tower', x: 48, y: 40, width: 8, height: 8 },
      { id: 't7', terrainType: 'Industrial Node', x: 14, y: 32, width: 8, height: 7 },
      { id: 't8', terrainType: 'Scatter Terrain', x: 78, y: 20, width: 8, height: 6 },
    ],
  },
  {
    id: 'diagonal-push',
    name: 'Diagonal Push',
    compatibleDeployments: ['corner-strike', 'diagonal-clash'],
    placements: [
      { id: 't1', terrainType: 'Bastion', x: 8, y: 8, width: 12, height: 8 },
      { id: 't2', terrainType: 'Large Ruin', x: 28, y: 18, width: 12, height: 8 },
      { id: 't3', terrainType: 'Medium Ruin', x: 46, y: 28, width: 10, height: 7 },
      { id: 't4', terrainType: 'Tower', x: 62, y: 36, width: 8, height: 8 },
      { id: 't5', terrainType: 'Crates', x: 76, y: 46, width: 10, height: 7 },
      { id: 't6', terrainType: 'Barricade', x: 40, y: 14, width: 9, height: 3 },
      { id: 't7', terrainType: 'Industrial Node', x: 54, y: 44, width: 8, height: 6 },
    ],
  },
  {
    id: 'laned-firefight',
    name: 'Laned Firefight',
    placements: [
      { id: 't1', terrainType: 'Large Ruin', x: 10, y: 24, width: 14, height: 10 },
      { id: 't2', terrainType: 'Large Ruin', x: 76, y: 24, width: 14, height: 10 },
      { id: 't3', terrainType: 'Barricade', x: 30, y: 14, width: 14, height: 4 },
      { id: 't4', terrainType: 'Barricade', x: 56, y: 42, width: 14, height: 4 },
      { id: 't5', terrainType: 'Tower', x: 46, y: 24, width: 8, height: 8 },
      { id: 't6', terrainType: 'Scatter Terrain', x: 34, y: 40, width: 8, height: 6 },
      { id: 't7', terrainType: 'Scatter Terrain', x: 58, y: 16, width: 8, height: 6 },
      { id: 't8', terrainType: 'Crates', x: 46, y: 12, width: 8, height: 6 },
    ],
  },
]
