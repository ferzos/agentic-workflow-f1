import { describe, expect, it } from 'vitest'
import type { Race, ResultRow } from '@/data/types'
import { driverProfile } from './driverProfile'
import { driverStandings } from './standings'

const row = (driverId: string, constructorId: string, position: number, points: number, grid = position): ResultRow => ({
  position,
  driverId,
  constructorId,
  grid,
  laps: 50,
  status: 'Finished',
  points,
})
const race = (round: number, results: ResultRow[], sprint?: ResultRow[]): Race => ({
  round,
  name: `R${round}`,
  date: '2025-01-01',
  circuit: 'c',
  locality: 'l',
  country: 'x',
  results,
  ...(sprint ? { sprint } : {}),
})

// Deliberately out of round order; driver 'a' switches team in round 3.
const races: Race[] = [
  race(3, [row('a', 'z', 2, 18, 4), row('b', 'y', 1, 25)]),
  race(1, [row('a', 'x', 1, 25, 2), row('b', 'y', 2, 18)], [row('a', 'x', 3, 6)]),
  race(2, [row('b', 'y', 1, 25), row('a', 'x', 5, 10, 1)]),
]

describe('driverProfile', () => {
  it('points and wins match driverStandings', () => {
    for (const id of ['a', 'b']) {
      const expected = driverStandings(races).find((s) => s.id === id)!
      expect(driverProfile(races, id)).toMatchObject({ points: expected.points, wins: expected.wins })
    }
    expect(driverProfile(races, 'a')).toMatchObject({ points: 59, wins: 1 })
  })

  it('results are ordered by round', () => {
    const { results } = driverProfile(races, 'a')
    expect(results).toEqual([
      { round: 1, raceName: 'R1', position: 1, grid: 2, points: 25, status: 'Finished' },
      { round: 2, raceName: 'R2', position: 5, grid: 1, points: 10, status: 'Finished' },
      { round: 3, raceName: 'R3', position: 2, grid: 4, points: 18, status: 'Finished' },
    ])
  })

  it('team is the constructor of the latest result', () => {
    expect(driverProfile(races, 'a').constructorId).toBe('z')
    expect(driverProfile(races, 'b').constructorId).toBe('y')
  })

  it('unknown driver returns no results', () => {
    expect(driverProfile(races, 'nobody')).toEqual({
      driverId: 'nobody',
      points: 0,
      wins: 0,
      constructorId: undefined,
      results: [],
    })
  })
})
