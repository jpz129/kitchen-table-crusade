import { narrativeByTone } from '../data/narrative'
import type { Tone } from '../types/mission'
import { pickOne } from '../utils/random'

interface NarrativeOptions {
  tone: Tone
  army1: string
  army2: string
  rng: () => number
}

export const generateNarrative = ({ tone, army1, army2, rng }: NarrativeOptions) => {
  const toneSet = narrativeByTone[tone]
  const title = `${pickOne(toneSet.titleParts, rng)} at ${pickOne(toneSet.titleParts, rng)}`

  const opener = pickOne(toneSet.briefingOpeners, rng)
  const middle = pickOne(toneSet.briefingMiddles, rng)
  const closer = pickOne(toneSet.briefingClosers, rng)
  const absurdity = pickOne(toneSet.absurdityLines, rng)

  const briefing =
    `${opener} ${army1} and ${army2} collide in this improvised combat zone. ` +
    `${middle} ${closer}`

  return {
    title,
    briefing,
    absurdity,
  }
}
