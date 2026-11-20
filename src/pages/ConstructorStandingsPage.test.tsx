import { screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { constructorById, season } from '@/data/season'
import { constructorStandings } from '@/lib/standings'
import { renderAt } from '@/test/render'

describe('ConstructorStandingsPage', () => {
  it('lists every constructor in the standings, one row each', () => {
    renderAt('/standings/constructors')
    const rows = within(screen.getByRole('table')).getAllByRole('row')
    expect(rows).toHaveLength(constructorStandings(season.races).length + 1)
  })

  it('ranks the leading constructor first with points and wins', () => {
    renderAt('/standings/constructors')
    const [leader] = constructorStandings(season.races)
    const c = constructorById(leader!.id)!
    const row = within(screen.getByRole('table')).getAllByRole('row')[1]!
    expect(within(row).getByText(c.name)).toBeInTheDocument()
    expect(within(row).getByText(String(leader!.points))).toBeInTheDocument()
    expect(within(row).getByText(String(leader!.wins))).toBeInTheDocument()
  })
})
