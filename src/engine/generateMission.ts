import { deployments } from '../data/deployments'
import { objectiveLayouts } from '../data/objectives'
import { scoringArchetypes } from '../data/scoring'
import { householdOptions, substitutionTable } from '../data/substitutions'
import { terrainTemplates } from '../data/terrain'
import { missionTwists } from '../data/twists'
import type {
  HouseholdTerrainOption,
  Mission,
  MissionTwist,
  TerrainPlacement,
  TerrainSubstitution,
  UserInputs,
} from '../types/mission'
import { createRng, hashString, pickOne, randomInt, weightedPick } from '../utils/random'
import { generateNarrative } from './generateNarrative'

const MIN_TERRAIN_COUNT = 5
const MAX_TERRAIN_COUNT = 8
const BOARD_WIDTH = 100
const BOARD_HEIGHT = 60

const normalizeTerrainChoices = (selected: HouseholdTerrainOption[]): HouseholdTerrainOption[] => {
  if (selected.length > 0) {
    return selected
  }
  return ['Misc Random Objects', 'Books']
}

const normalizedArmyName = (value: string, fallback: string): string => {
  const trimmed = value.trim()
  return trimmed.length > 0 ? trimmed : fallback
}

const chooseTwist = (tone: UserInputs['tone'], rng: () => number): MissionTwist => {
  const compatible = missionTwists.filter((twist) => twist.tones.includes(tone))
  return weightedPick(compatible, rng)
}

const chooseTerrainPlacements = (
  deploymentId: string,
  rng: () => number,
): { templateName: string; placements: TerrainPlacement[] } => {
  const candidates = terrainTemplates.filter(
    (template) => !template.compatibleDeployments || template.compatibleDeployments.includes(deploymentId),
  )
  const template = pickOne(candidates.length ? candidates : terrainTemplates, rng)
  const terrainCount = Math.min(
    randomInt(rng, MIN_TERRAIN_COUNT, MAX_TERRAIN_COUNT),
    template.placements.length,
  )
  return {
    templateName: template.name,
    placements: template.placements.slice(0, terrainCount),
  }
}

const chooseSubstitution = (
  terrainType: TerrainPlacement['terrainType'],
  availableHousehold: HouseholdTerrainOption[],
  offset: number,
): TerrainSubstitution => {
  const terrainChoices = substitutionTable[terrainType]
  const rotatedHousehold = [
    ...availableHousehold.slice(offset % availableHousehold.length),
    ...availableHousehold.slice(0, offset % availableHousehold.length),
  ]

  for (const householdType of rotatedHousehold) {
    const match = terrainChoices[householdType]
    if (match) {
      return match
    }
  }

  const fallbackPool = householdOptions
    .map((option) => terrainChoices[option])
    .filter((item): item is TerrainSubstitution => Boolean(item))

  return fallbackPool[0]
}

export const generateMission = (rawInputs: UserInputs): Mission => {
  const terrainChoices = normalizeTerrainChoices(rawInputs.householdTerrain)
  const inputsUsed: UserInputs = {
    ...rawInputs,
    householdTerrain: terrainChoices,
  }

  const timestamp = new Date().toISOString()
  const seed = hashString(`${timestamp}:${JSON.stringify(inputsUsed)}`)
  const rng = createRng(seed)

  const army1 = normalizedArmyName(inputsUsed.army1, 'The First Force')
  const army2 = normalizedArmyName(inputsUsed.army2, 'The Invading Host')
  const deployment = weightedPick(deployments, rng)
  const compatibleObjectives = objectiveLayouts.filter((layout) =>
    layout.compatibleDeployments.includes(deployment.id),
  )
  const objectives = pickOne(compatibleObjectives, rng)
  const scoring = weightedPick(scoringArchetypes[inputsUsed.gameSize], rng)
  const twist = chooseTwist(inputsUsed.tone, rng)
  const terrain = chooseTerrainPlacements(deployment.id, rng)
  const substitutions = terrain.placements.map((placement, index) =>
    chooseSubstitution(placement.terrainType, terrainChoices, index),
  )
  const narrativeParts = generateNarrative({
    tone: inputsUsed.tone,
    army1,
    army2,
    rng,
  })

  const narrative = `${narrativeParts.briefing} ${narrativeParts.absurdity}`

  return {
    title: narrativeParts.title,
    deployment,
    objectives,
    scoring,
    twist,
    terrainLayout: {
      board: { width: BOARD_WIDTH, height: BOARD_HEIGHT },
      templateName: terrain.templateName,
      placements: terrain.placements,
    },
    substitutions,
    narrative,
    narrativeSource: 'template',
    inputsUsed: {
      ...inputsUsed,
      army1,
      army2,
    },
    timestamp,
  }
}
