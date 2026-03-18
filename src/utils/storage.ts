import type { Mission } from '../types/mission'

const LAST_MISSION_KEY = 'ktc:lastMission'

export const loadLastMission = (): Mission | null => {
  try {
    const value = window.localStorage.getItem(LAST_MISSION_KEY)
    if (!value) {
      return null
    }
    return JSON.parse(value) as Mission
  } catch {
    return null
  }
}

export const saveLastMission = (mission: Mission): void => {
  window.localStorage.setItem(LAST_MISSION_KEY, JSON.stringify(mission))
}
