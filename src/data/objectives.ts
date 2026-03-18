import type { ObjectiveLayout } from '../types/mission'

export const objectiveLayouts: ObjectiveLayout[] = [
  {
    id: 'centerline-quads',
    name: 'Centerline Quadrants',
    description: 'Hold multiple points near the midpoint to earn command flow.',
    compatibleDeployments: ['dawn-of-battle', 'long-edge-assault'],
    markers: [
      { id: 'o1', label: 'Obj 1', x: 25, y: 20 },
      { id: 'o2', label: 'Obj 2', x: 75, y: 20 },
      { id: 'o3', label: 'Obj 3', x: 25, y: 40 },
      { id: 'o4', label: 'Obj 4', x: 75, y: 40 },
    ],
  },
  {
    id: 'five-point-cross',
    name: 'Five-Point Crossfire',
    description: 'A central anchor objective is surrounded by flanking points.',
    compatibleDeployments: ['dawn-of-battle', 'long-edge-assault', 'corner-strike'],
    markers: [
      { id: 'o1', label: 'Obj 1', x: 50, y: 30 },
      { id: 'o2', label: 'Obj 2', x: 20, y: 30 },
      { id: 'o3', label: 'Obj 3', x: 80, y: 30 },
      { id: 'o4', label: 'Obj 4', x: 50, y: 14 },
      { id: 'o5', label: 'Obj 5', x: 50, y: 46 },
    ],
  },
  {
    id: 'diagonal-chain',
    name: 'Diagonal Relay',
    description: 'Capture linked objectives across a diagonal transit lane.',
    compatibleDeployments: ['corner-strike', 'diagonal-clash'],
    markers: [
      { id: 'o1', label: 'Obj 1', x: 15, y: 10 },
      { id: 'o2', label: 'Obj 2', x: 35, y: 22 },
      { id: 'o3', label: 'Obj 3', x: 55, y: 34 },
      { id: 'o4', label: 'Obj 4', x: 75, y: 46 },
    ],
  },
  {
    id: 'staggered-lanes',
    name: 'Staggered Lanes',
    description: 'Objectives sit in offset lanes, rewarding flexible lines.',
    compatibleDeployments: ['dawn-of-battle', 'diagonal-clash'],
    markers: [
      { id: 'o1', label: 'Obj 1', x: 18, y: 16 },
      { id: 'o2', label: 'Obj 2', x: 48, y: 24 },
      { id: 'o3', label: 'Obj 3', x: 82, y: 18 },
      { id: 'o4', label: 'Obj 4', x: 32, y: 44 },
      { id: 'o5', label: 'Obj 5', x: 68, y: 42 },
    ],
  },
]
