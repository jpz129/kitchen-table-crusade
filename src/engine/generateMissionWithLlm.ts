import { deployments } from '../data/deployments'
import { objectiveLayouts } from '../data/objectives'
import { scoringArchetypes } from '../data/scoring'
import { householdOptions, substitutionTable } from '../data/substitutions'
import { terrainTemplates } from '../data/terrain'
import { missionTwists } from '../data/twists'
import type {
  HouseholdTerrainOption,
  Mission,
  TerrainSubstitution,
  TerrainType,
  UserInputs,
} from '../types/mission'

const OPENAI_CHAT_COMPLETIONS_URL = 'https://api.openai.com/v1/chat/completions'
const BOARD_WIDTH = 100
const BOARD_HEIGHT = 60

// ── Menu strings sent to the LLM ──────────────────────────────────────────────

const buildMenu = (inputs: UserInputs): string => {
  const scoringList = scoringArchetypes[inputs.gameSize] ?? []

  const deploymentMenu = deployments
    .map((d) => `  - ${d.id}: ${d.description}`)
    .join('\n')

  const objectivesMenu = objectiveLayouts
    .map((o) => `  - ${o.id}: ${o.description} (compatible deployments: ${o.compatibleDeployments.join(', ')})`)
    .join('\n')

  const scoringMenu = scoringList
    .map((s) => `  - ${s.id}: ${s.summary}`)
    .join('\n')

  const twistMenu = missionTwists
    .map((t) => `  - ${t.id} [tones: ${t.tones.join(', ')}]: ${t.summary}`)
    .join('\n')

  const terrainTemplateMenu = terrainTemplates
    .map((t) => {
      const types = [...new Set(t.placements.map((p) => p.terrainType))].join(', ')
      return `  - ${t.id} (${t.placements.length} pieces: ${types})`
    })
    .join('\n')

  const householdMenu = inputs.householdTerrain.join(', ')

  return [
    `Game size: ${inputs.gameSize}`,
    `Army 1: ${inputs.army1}`,
    `Army 2: ${inputs.army2}`,
    `Tone: ${inputs.tone}`,
    `Available household objects: ${householdMenu}`,
    '',
    'DEPLOYMENTS (pick one deploymentId):',
    deploymentMenu,
    '',
    'OBJECTIVE LAYOUTS (pick one objectivesId, must be compatible with chosen deployment):',
    objectivesMenu,
    '',
    `SCORING OPTIONS for ${inputs.gameSize}pts (pick one scoringId):`,
    scoringMenu,
    '',
    'TWISTS (pick one twistId, should suit tone):',
    twistMenu,
    '',
    'TERRAIN TEMPLATES (pick one terrainTemplateId):',
    terrainTemplateMenu,
    '',
    'TERRAIN COUNT: choose between 5 and 8 pieces from the template (terrainCount)',
  ].join('\n')
}

const buildSubstitutionInstructions = (
  terrainTemplateId: string,
  terrainCount: number,
  availableHousehold: HouseholdTerrainOption[],
): string => {
  const template = terrainTemplates.find((t) => t.id === terrainTemplateId)
  if (!template) return ''
  const placements = template.placements.slice(0, terrainCount)
  const terrainTypes = placements.map((p) => p.terrainType)

  return [
    '',
    'SUBSTITUTIONS: for each terrain piece below, assign a householdType from the available objects,',
    'and write an original name and shortLabel (max 3 words) treating it as a real battlefield feature.',
    'Available household objects: ' + availableHousehold.join(', '),
    'Terrain pieces to substitute (in order):',
    terrainTypes.map((t, i) => `  ${i + 1}. ${t}`).join('\n'),
  ].join('\n')
}

const buildSystemPrompt = (): string =>
  [
    'You are a tabletop wargame mission designer. Generate a complete original sci-fi mission.',
    'Never copy official faction names, proprietary mission text, or copyrighted content.',
    'Respond with a single valid JSON object and nothing else.',
    'The narrative should be one vivid paragraph (2-4 sentences).',
    'The terrainAbsurdity should be one sentence treating household objects as real battlefield features.',
    'Each substitution name should be evocative and in-world (e.g. "Scholastic Monolith Citadel", "Ceramic Plasma Spire").',
  ].join(' ')

// ── Response schema ────────────────────────────────────────────────────────────

interface LlmMissionDecision {
  deploymentId: string
  objectivesId: string
  scoringId: string
  twistId: string
  terrainTemplateId: string
  terrainCount: number
  substitutions: Array<{
    terrainType: string
    householdType: string
    name: string
    shortLabel: string
  }>
  title: string
  narrative: string
  terrainAbsurdity: string
}

// ── Validation helpers ─────────────────────────────────────────────────────────

const isValidHouseholdType = (value: string): value is HouseholdTerrainOption =>
  (householdOptions as string[]).includes(value)

const resolveSubstitution = (
  raw: LlmMissionDecision['substitutions'][number],
  available: HouseholdTerrainOption[],
  index: number,
): TerrainSubstitution => {
  const terrainType = raw.terrainType as TerrainType
  const householdType: HouseholdTerrainOption = isValidHouseholdType(raw.householdType)
    ? raw.householdType
    : available[index % available.length]

  const name = typeof raw.name === 'string' && raw.name.trim().length > 0
    ? raw.name.trim()
    : substitutionTable[terrainType]?.[householdType]?.name ?? terrainType

  const shortLabel = typeof raw.shortLabel === 'string' && raw.shortLabel.trim().length > 0
    ? raw.shortLabel.trim()
    : substitutionTable[terrainType]?.[householdType]?.shortLabel ?? terrainType

  return { terrainType, householdType, name, shortLabel }
}

// ── Main export ────────────────────────────────────────────────────────────────

export const generateMissionWithLlm = async (
  rawInputs: UserInputs,
  apiKey: string,
): Promise<Mission | null> => {
  const inputs: UserInputs = {
    ...rawInputs,
    army1: rawInputs.army1.trim() || 'The First Force',
    army2: rawInputs.army2.trim() || 'The Invading Host',
    householdTerrain:
      rawInputs.householdTerrain.length > 0
        ? rawInputs.householdTerrain
        : ['Books', 'Misc Random Objects'],
  }

  const menuPrompt = buildMenu(inputs)

  const firstPassMessages = [
    { role: 'system' as const, content: buildSystemPrompt() },
    {
      role: 'user' as const,
      content:
        'From the menu below, pick IDs for deployment, objectives, scoring, twist, and terrain template. ' +
        'Also write title, narrative, and terrainAbsurdity. ' +
        'Do NOT include substitutions yet — respond with placeholders.\n\n' +
        menuPrompt +
        '\n\nRespond with JSON: ' +
        '{"deploymentId":"","objectivesId":"","scoringId":"","twistId":"","terrainTemplateId":"",' +
        '"terrainCount":6,"title":"","narrative":"","terrainAbsurdity":"","substitutions":[]}',
    },
  ]

  const firstResponse = await fetch(OPENAI_CHAT_COMPLETIONS_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      temperature: 0.85,
      response_format: { type: 'json_object' },
      messages: firstPassMessages,
      max_tokens: 400,
    }),
  })

  if (!firstResponse.ok) return null

  const firstData = (await firstResponse.json()) as {
    choices?: Array<{ message?: { content?: string } }>
  }
  const firstContent = firstData.choices?.[0]?.message?.content
  if (!firstContent) return null

  let partial: Partial<LlmMissionDecision>
  try {
    partial = JSON.parse(firstContent) as Partial<LlmMissionDecision>
  } catch {
    return null
  }

  const terrainTemplateId = terrainTemplates.find((t) => t.id === partial.terrainTemplateId)
    ? partial.terrainTemplateId!
    : terrainTemplates[0].id

  const rawTerrainCount = typeof partial.terrainCount === 'number' ? partial.terrainCount : 6
  const terrainCount = Math.max(5, Math.min(8, rawTerrainCount))

  const subsInstructions = buildSubstitutionInstructions(
    terrainTemplateId,
    terrainCount,
    inputs.householdTerrain,
  )

  const secondPassMessages = [
    ...firstPassMessages,
    { role: 'assistant' as const, content: firstContent },
    {
      role: 'user' as const,
      content:
        'Good. Now add the substitutions array to complete the mission. ' +
        subsInstructions +
        '\n\nReturn the full JSON object again with the substitutions array filled in. ' +
        'Each substitution: {"terrainType":"...","householdType":"...","name":"...","shortLabel":"..."}',
    },
  ]

  const secondResponse = await fetch(OPENAI_CHAT_COMPLETIONS_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      temperature: 0.75,
      response_format: { type: 'json_object' },
      messages: secondPassMessages,
      max_tokens: 600,
    }),
  })

  if (!secondResponse.ok) return null

  const secondData = (await secondResponse.json()) as {
    choices?: Array<{ message?: { content?: string } }>
  }
  const secondContent = secondData.choices?.[0]?.message?.content
  if (!secondContent) return null

  let decision: Partial<LlmMissionDecision>
  try {
    decision = JSON.parse(secondContent) as Partial<LlmMissionDecision>
  } catch {
    return null
  }

  // ── Resolve structured fields from local data ─────────────────────────────

  const deployment =
    deployments.find((d) => d.id === decision.deploymentId) ?? deployments[0]

  const objectives =
    objectiveLayouts.find(
      (o) =>
        o.id === decision.objectivesId &&
        o.compatibleDeployments.includes(deployment.id),
    ) ??
    objectiveLayouts.find((o) => o.compatibleDeployments.includes(deployment.id)) ??
    objectiveLayouts[0]

  const scoringPool = scoringArchetypes[inputs.gameSize] ?? scoringArchetypes[1000]
  const scoring =
    scoringPool.find((s) => s.id === decision.scoringId) ?? scoringPool[0]

  const twist =
    missionTwists.find((t) => t.id === decision.twistId) ?? missionTwists[0]

  const template =
    terrainTemplates.find((t) => t.id === terrainTemplateId) ?? terrainTemplates[0]

  const placements = template.placements.slice(0, terrainCount)

  const rawSubs = Array.isArray(decision.substitutions) ? decision.substitutions : []
  const substitutions: TerrainSubstitution[] = placements.map((placement, index) => {
    const raw = rawSubs[index] ?? { terrainType: placement.terrainType, householdType: '', name: '', shortLabel: '' }
    return resolveSubstitution(
      { ...raw, terrainType: placement.terrainType },
      inputs.householdTerrain,
      index,
    )
  })

  const title =
    typeof decision.title === 'string' && decision.title.trim().length > 0
      ? decision.title.trim()
      : 'Untitled Engagement'

  const narrative =
    typeof decision.narrative === 'string' && decision.narrative.trim().length > 0
      ? [decision.narrative.trim(), decision.terrainAbsurdity?.trim()].filter(Boolean).join(' ')
      : 'No briefing available.'

  return {
    title,
    deployment,
    objectives,
    scoring,
    twist,
    terrainLayout: {
      board: { width: BOARD_WIDTH, height: BOARD_HEIGHT },
      templateName: template.name,
      placements,
    },
    substitutions,
    narrative,
    narrativeSource: 'llm',
    inputsUsed: inputs,
    timestamp: new Date().toISOString(),
  }
}
