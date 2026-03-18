export type GameSize = 500 | 1000 | 2000

export type Tone = 'Serious' | 'Epic' | 'Ridiculous'

export type HouseholdTerrainOption =
  | 'Books'
  | 'Mugs'
  | 'Cardboard Boxes'
  | 'Dice Containers'
  | 'Cups / Glasses'
  | 'Candles'
  | 'Decks of Cards'
  | 'Kitchen Utensils'
  | 'Misc Random Objects'

export interface UserInputs {
  gameSize: GameSize
  army1: string
  army2: string
  tone: Tone
  householdTerrain: HouseholdTerrainOption[]
}

export interface BoardDimensions {
  width: number
  height: number
}

export interface BattlefieldZone {
  id: string
  label: string
  x: number
  y: number
  width: number
  height: number
}

export interface Deployment {
  id: string
  name: string
  description: string
  weight: number
  zones: BattlefieldZone[]
}

export interface ObjectiveMarker {
  id: string
  label: string
  x: number
  y: number
}

export interface ObjectiveLayout {
  id: string
  name: string
  description: string
  compatibleDeployments: string[]
  markers: ObjectiveMarker[]
}

export interface ScoringRule {
  id: string
  name: string
  summary: string
  weight: number
}

export interface MissionTwist {
  id: string
  name: string
  summary: string
  weight: number
  tones: Tone[]
}

export type TerrainType =
  | 'Large Ruin'
  | 'Medium Ruin'
  | 'Barricade'
  | 'Tower'
  | 'Industrial Node'
  | 'Scatter Terrain'
  | 'Crates'
  | 'Bastion'

export interface TerrainPlacement {
  id: string
  terrainType: TerrainType
  x: number
  y: number
  width: number
  height: number
}

export interface TerrainTemplate {
  id: string
  name: string
  compatibleDeployments?: string[]
  placements: TerrainPlacement[]
}

export interface TerrainSubstitution {
  terrainType: TerrainType
  householdType: HouseholdTerrainOption
  name: string
  shortLabel: string
}

export interface NarrativeFragments {
  titleParts: string[]
  briefingOpeners: string[]
  briefingMiddles: string[]
  briefingClosers: string[]
  absurdityLines: string[]
}

export interface Mission {
  title: string
  deployment: Deployment
  objectives: ObjectiveLayout
  scoring: ScoringRule
  twist: MissionTwist
  terrainLayout: {
    board: BoardDimensions
    templateName: string
    placements: TerrainPlacement[]
  }
  substitutions: TerrainSubstitution[]
  narrative: string
  narrativeSource: 'template' | 'llm'
  inputsUsed: UserInputs
  timestamp: string
}
