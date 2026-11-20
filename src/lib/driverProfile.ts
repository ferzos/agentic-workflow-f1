import type { Race } from '@/data/types'
import { driverStandings } from './standings'

export interface DriverRaceResult {
  round: number
  raceName: string
  position: number
  grid: number
  points: number
  status: string
}

export interface DriverProfile {
  driverId: string
  points: number
  wins: number
  constructorId: string | undefined
  results: DriverRaceResult[]
}

// Pure: races in, one driver's season summary out.
// points and wins come from driverStandings so they always agree with the standings table.
export function driverProfile(races: Race[], driverId: string): DriverProfile {
  const standing = driverStandings(races).find((s) => s.id === driverId)
  const entries = [...races]
    .sort((a, b) => a.round - b.round)
    .flatMap((race) => {
      const row = race.results.find((r) => r.driverId === driverId)
      return row ? [{ race, row }] : []
    })
  return {
    driverId,
    points: standing?.points ?? 0,
    wins: standing?.wins ?? 0,
    constructorId: entries.at(-1)?.row.constructorId,
    results: entries.map(({ race, row }) => ({
      round: race.round,
      raceName: race.name,
      position: row.position,
      grid: row.grid,
      points: row.points,
      status: row.status,
    })),
  }
}
