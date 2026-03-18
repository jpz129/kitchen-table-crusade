import type { ScoringRule } from '../types/mission'

export const scoringArchetypes: Record<number, ScoringRule[]> = {
  500: [
    {
      id: 'small-hold-two',
      name: 'Secure the Lane',
      summary:
        'At end of each round, score if you control at least 2 objectives and control more than your opponent.',
      weight: 4,
    },
    {
      id: 'small-raid-and-hold',
      name: 'Probe and Anchor',
      summary: 'Score for controlling one home objective and one enemy-side objective each round.',
      weight: 2,
    },
  ],
  1000: [
    {
      id: 'mid-hold-more',
      name: 'Frontline Tally',
      summary: 'Score at the end of each command phase for each controlled objective, bonus for controlling more.',
      weight: 4,
    },
    {
      id: 'mid-center-pressure',
      name: 'Center Pressure',
      summary:
        'Score for controlling the central objective plus one additional objective at round end.',
      weight: 3,
    },
  ],
  2000: [
    {
      id: 'large-progressive',
      name: 'Grand Offensive',
      summary:
        'Score progressively for 1, 2, and 3+ held objectives; bonus if one objective is in enemy territory.',
      weight: 5,
    },
    {
      id: 'large-grid-control',
      name: 'Grid Supremacy',
      summary: 'Score each round for controlling objective pairs in separate table quadrants.',
      weight: 2,
    },
  ],
}
