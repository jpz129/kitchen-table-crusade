import type { HouseholdTerrainOption, TerrainSubstitution, TerrainType } from '../types/mission'

type SubstitutionTable = Record<TerrainType, Partial<Record<HouseholdTerrainOption, TerrainSubstitution>>>

const makeSubstitution = (
  terrainType: TerrainType,
  householdType: HouseholdTerrainOption,
  name: string,
  shortLabel: string,
): TerrainSubstitution => ({
  terrainType,
  householdType,
  name,
  shortLabel,
})

export const householdOptions: HouseholdTerrainOption[] = [
  'Books',
  'Mugs',
  'Cardboard Boxes',
  'Dice Containers',
  'Cups / Glasses',
  'Candles',
  'Decks of Cards',
  'Kitchen Utensils',
  'Misc Random Objects',
]

export const substitutionTable: SubstitutionTable = {
  'Large Ruin': {
    Books: makeSubstitution('Large Ruin', 'Books', 'Stacked Book Megastructure', 'Book Stack'),
    'Cardboard Boxes': makeSubstitution(
      'Large Ruin',
      'Cardboard Boxes',
      'Collapsed Box Fortress',
      'Box Bastion',
    ),
    'Misc Random Objects': makeSubstitution(
      'Large Ruin',
      'Misc Random Objects',
      'Improvised Rubble Cluster',
      'Rubble Cluster',
    ),
  },
  'Medium Ruin': {
    Books: makeSubstitution('Medium Ruin', 'Books', 'Paperback Outpost', 'Book Outpost'),
    'Dice Containers': makeSubstitution(
      'Medium Ruin',
      'Dice Containers',
      'Polyhedral Debris Nest',
      'Dice Nest',
    ),
    'Misc Random Objects': makeSubstitution(
      'Medium Ruin',
      'Misc Random Objects',
      'Unknown Structural Hazard',
      'Object Hazard',
    ),
  },
  Barricade: {
    'Kitchen Utensils': makeSubstitution(
      'Barricade',
      'Kitchen Utensils',
      'Utensils Laid Sideways as Cover',
      'Utensil Wall',
    ),
    'Decks of Cards': makeSubstitution('Barricade', 'Decks of Cards', 'Card Deck Rampart', 'Card Rampart'),
    'Misc Random Objects': makeSubstitution(
      'Barricade',
      'Misc Random Objects',
      'Improvised Cover Line',
      'Cover Line',
    ),
  },
  Tower: {
    Mugs: makeSubstitution('Tower', 'Mugs', 'Mug Reactor Spire', 'Mug Reactor'),
    'Cups / Glasses': makeSubstitution('Tower', 'Cups / Glasses', 'Glass Observation Tower', 'Glass Tower'),
    Candles: makeSubstitution('Tower', 'Candles', 'Ceremonial Candle Beacon', 'Candle Beacon'),
  },
  'Industrial Node': {
    Mugs: makeSubstitution('Industrial Node', 'Mugs', 'Mug Plasma Converter', 'Mug Node'),
    Candles: makeSubstitution('Industrial Node', 'Candles', 'Wax-Core Power Node', 'Wax Node'),
    'Dice Containers': makeSubstitution(
      'Industrial Node',
      'Dice Containers',
      'Dice Case Relay Station',
      'Case Relay',
    ),
  },
  'Scatter Terrain': {
    'Misc Random Objects': makeSubstitution(
      'Scatter Terrain',
      'Misc Random Objects',
      'Uncatalogued Scatter Debris',
      'Scatter Debris',
    ),
    'Decks of Cards': makeSubstitution(
      'Scatter Terrain',
      'Decks of Cards',
      'Card Deck Crates',
      'Card Crates',
    ),
    Books: makeSubstitution('Scatter Terrain', 'Books', 'Loose Field Manuals', 'Field Manuals'),
  },
  Crates: {
    'Decks of Cards': makeSubstitution('Crates', 'Decks of Cards', 'Card Deck Crates', 'Card Crates'),
    'Dice Containers': makeSubstitution('Crates', 'Dice Containers', 'Dice Canister Freight', 'Dice Crates'),
    'Cardboard Boxes': makeSubstitution('Crates', 'Cardboard Boxes', 'Boxed Supply Pile', 'Box Supplies'),
  },
  Bastion: {
    'Cardboard Boxes': makeSubstitution('Bastion', 'Cardboard Boxes', 'Cardboard Bastion', 'Box Bastion'),
    Books: makeSubstitution('Bastion', 'Books', 'Bound-Volume Strongpoint', 'Book Bastion'),
    'Misc Random Objects': makeSubstitution(
      'Bastion',
      'Misc Random Objects',
      'Improvised Strongpoint',
      'Strongpoint',
    ),
  },
}
