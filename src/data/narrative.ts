import type { NarrativeFragments, Tone } from '../types/mission'

export const narrativeByTone: Record<Tone, NarrativeFragments> = {
  Serious: {
    titleParts: ['Silent Meridian', 'Iron Threshold', 'Ash-Grid', 'Cold Beacon', 'Last Transit'],
    briefingOpeners: [
      'Recon augurs confirm two rival taskforces converging on contested ground.',
      'Command intelligence marks the zone as a critical junction for regional control.',
    ],
    briefingMiddles: [
      'Both forces must secure key lanes before enemy reserves can stabilize the front.',
      'Rapid objective control will decide whether this sector holds or collapses.',
    ],
    briefingClosers: [
      'Discipline and measured aggression will determine the outcome.',
      'No reinforcement is expected; success depends on precise execution.',
    ],
    absurdityLines: [
      'Field analysts classify the improvised terrain as legitimate fortified infrastructure.',
      'Logistics reports insist each domestic structure now counts as hardened battlefield cover.',
    ],
  },
  Epic: {
    titleParts: ['Storm of Cinders', 'Gates of Thunder', 'Crown of Static', 'Echoes of Titanfall'],
    briefingOpeners: [
      'Under a fractured sky, two warhosts descend to decide the fate of the sector.',
      'Across the burning horizon, rival banners close on a battlefield marked for legend.',
    ],
    briefingMiddles: [
      'Whoever seizes the central routes will write the next chapter of this campaign.',
      'Every objective is a keystone in a conflict that will echo beyond this world.',
    ],
    briefingClosers: [
      'Only relentless will and sacrificial courage can secure victory.',
      'Tonight, the table remembers heroes and ruin in equal measure.',
    ],
    absurdityLines: [
      'Even towering household relics are proclaimed sacred war monuments by command decree.',
      'Domestic silhouettes loom as mythic fortresses in the campaign record.',
    ],
  },
  Ridiculous: {
    titleParts: ['The Toaster Front', 'Operation Mugfall', 'Siege of Shelf Prime', 'Forkstorm Rising'],
    briefingOpeners: [
      'Sensors detect total chaos as two determined forces arrive at a very serious table war.',
      'A strategic emergency unfolds as commanders race to conquer a suspiciously tidy battlefield.',
    ],
    briefingMiddles: [
      'Control of key positions will decide who dominates this absurd but vital conflict zone.',
      'Rumors speak of tactical glory hidden between domestic artifacts and dramatic overreaction.',
    ],
    briefingClosers: [
      'Maintain composure, avoid stepping on dice, and claim eternal bragging rights.',
      'Victory belongs to the bold, the lucky, and whoever remembers where they put their unit markers.',
    ],
    absurdityLines: [
      'Towering scholastic monoliths, mug reactors, and cardboard bastions are officially recognized as strategic terrain.',
      'Utensil forests and card-deck crate fields are treated as ancient military works without question.',
    ],
  },
}
