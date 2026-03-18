import type { MissionTwist } from '../types/mission'

export const missionTwists: MissionTwist[] = [
  {
    id: 'signal-fog',
    name: 'Signal Fog',
    summary: 'Command uplinks are unstable; long-range coordination suffers for early rounds.',
    weight: 4,
    tones: ['Serious', 'Epic'],
  },
  {
    id: 'orbital-echoes',
    name: 'Orbital Echoes',
    summary:
      'Ancient satellites awaken and project ghost signatures, forcing feints and sudden redeployments.',
    weight: 3,
    tones: ['Epic', 'Serious'],
  },
  {
    id: 'gravity-wobble',
    name: 'Localized Gravity Wobble',
    summary: 'A drifting anomaly makes movement through the center unpredictable.',
    weight: 2,
    tones: ['Serious', 'Ridiculous'],
  },
  {
    id: 'heroic-last-stand',
    name: 'Heroic Last Stand',
    summary: 'Units near critical objectives refuse to break and fight with dramatic resolve.',
    weight: 3,
    tones: ['Epic'],
  },
  {
    id: 'tea-break-armistice',
    name: 'Unscheduled Tea-Break Armistice',
    summary:
      'At one random moment, both sides pause in mutual confusion before hostilities instantly resume.',
    weight: 2,
    tones: ['Ridiculous'],
  },
  {
    id: 'domestic-anomaly',
    name: 'Domestic-Scale Anomaly',
    summary:
      'Common objects resonate with battlefield energy and are treated as strategic assets.',
    weight: 3,
    tones: ['Ridiculous', 'Epic'],
  },
]
