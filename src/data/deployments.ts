import type { Deployment } from '../types/mission'

export const deployments: Deployment[] = [
  {
    id: 'dawn-of-battle',
    name: 'Dawn of Battle',
    description: 'Both forces deploy along opposing long edges.',
    weight: 4,
    zones: [
      { id: 'a', label: 'Force A Zone', x: 0, y: 0, width: 100, height: 14 },
      { id: 'b', label: 'Force B Zone', x: 0, y: 46, width: 100, height: 14 },
    ],
  },
  {
    id: 'long-edge-assault',
    name: 'Long Edge Assault',
    description: 'Aggressive forward deployments leave a hot centerline.',
    weight: 3,
    zones: [
      { id: 'a', label: 'Force A Zone', x: 0, y: 0, width: 100, height: 18 },
      { id: 'b', label: 'Force B Zone', x: 0, y: 42, width: 100, height: 18 },
    ],
  },
  {
    id: 'corner-strike',
    name: 'Corner Strike',
    description: 'Diagonal corner footholds force tight movement choices.',
    weight: 2,
    zones: [
      { id: 'a', label: 'Force A Zone', x: 0, y: 0, width: 35, height: 20 },
      { id: 'b', label: 'Force B Zone', x: 65, y: 40, width: 35, height: 20 },
    ],
  },
  {
    id: 'diagonal-clash',
    name: 'Diagonal Clash',
    description: 'Deployment lanes split the board across a slanted front.',
    weight: 1,
    zones: [
      { id: 'a', label: 'Force A Zone', x: 0, y: 0, width: 40, height: 24 },
      { id: 'b', label: 'Force B Zone', x: 60, y: 36, width: 40, height: 24 },
    ],
  },
]
