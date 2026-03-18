import type { Mission } from '../types/mission'

interface LlmNarrativePayload {
  title: string
  narrative: string
}

const OPENAI_CHAT_COMPLETIONS_URL = 'https://api.openai.com/v1/chat/completions'

const buildPrompt = (mission: Mission) =>
  [
    `Tone: ${mission.inputsUsed.tone}`,
    `Army 1: ${mission.inputsUsed.army1}`,
    `Army 2: ${mission.inputsUsed.army2}`,
    `Deployment: ${mission.deployment.name} - ${mission.deployment.description}`,
    `Objectives: ${mission.objectives.name} - ${mission.objectives.description}`,
    `Scoring: ${mission.scoring.summary}`,
    `Twist: ${mission.twist.name} - ${mission.twist.summary}`,
    `Terrain substitutions: ${mission.substitutions
      .map((sub) => `${sub.terrainType} => ${sub.name}`)
      .join('; ')}`,
  ].join('\n')

const parseJsonContent = (value: string): LlmNarrativePayload | null => {
  try {
    const parsed = JSON.parse(value) as Partial<LlmNarrativePayload>
    if (typeof parsed.title !== 'string' || typeof parsed.narrative !== 'string') {
      return null
    }
    return {
      title: parsed.title.trim(),
      narrative: parsed.narrative.trim(),
    }
  } catch {
    return null
  }
}

export const enhanceNarrativeWithLlm = async (
  mission: Mission,
  apiKey: string,
): Promise<Pick<Mission, 'title' | 'narrative' | 'narrativeSource'> | null> => {
  const response = await fetch(OPENAI_CHAT_COMPLETIONS_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      temperature: 0.8,
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'system',
          content:
            'You write original sci-fi tabletop mission prose. Never copy or reference proprietary faction names, logos, or official mission text. Output valid JSON with keys: title, narrative. narrative must be one short paragraph plus one sentence that in-world justifies household-object terrain as real battlefield features.',
        },
        {
          role: 'user',
          content:
            `Create a mission title and narrative briefing from this structured mission context.\n\n` +
            `${buildPrompt(mission)}\n\n` +
            `Return JSON only: {"title":"...","narrative":"..."}`,
        },
      ],
      max_tokens: 220,
    }),
  })

  if (!response.ok) {
    return null
  }

  const data = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>
  }
  const content = data.choices?.[0]?.message?.content
  if (!content) {
    return null
  }

  const parsed = parseJsonContent(content)
  if (!parsed || parsed.title.length === 0 || parsed.narrative.length === 0) {
    return null
  }

  return {
    title: parsed.title,
    narrative: parsed.narrative,
    narrativeSource: 'llm',
  }
}
