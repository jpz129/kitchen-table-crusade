export const hashString = (value: string): number => {
  let hash = 2166136261
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index)
    hash = Math.imul(hash, 16777619)
  }
  return hash >>> 0
}

export const createRng = (seed: number): (() => number) => {
  let value = seed || 1
  return () => {
    value = (value + 0x6d2b79f5) | 0
    let t = Math.imul(value ^ (value >>> 15), 1 | value)
    t ^= t + Math.imul(t ^ (t >>> 7), 61 | t)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export const randomInt = (rng: () => number, min: number, max: number): number =>
  Math.floor(rng() * (max - min + 1)) + min

export const weightedPick = <T extends { weight: number }>(items: T[], rng: () => number): T => {
  const total = items.reduce((acc, item) => acc + item.weight, 0)
  let roll = rng() * total
  for (const item of items) {
    roll -= item.weight
    if (roll <= 0) {
      return item
    }
  }
  return items[items.length - 1]
}

export const pickOne = <T>(items: T[], rng: () => number): T => items[Math.floor(rng() * items.length)]
