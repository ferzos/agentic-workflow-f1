import { screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { driverById, season } from '@/data/season'
import { driverStandings } from '@/lib/standings'
import { renderAt } from '@/test/render'

describe('DriverStandingsPage', () => {
  it('lists every driver in the standings, one row each', () => {
    renderAt('/standings/drivers')
    const rows = within(screen.getByRole('table')).getAllByRole('row')
    expect(rows).toHaveLength(driverStandings(season.races).length + 1)
  })

  it('ranks the championship leader first with points and wins', () => {
    renderAt('/standings/drivers')
    const [leader] = driverStandings(season.races)
    const d = driverById(leader!.id)!
    const row = within(screen.getByRole('table')).getAllByRole('row')[1]!
    expect(within(row).getByText(`${d.givenName} ${d.familyName}`)).toBeInTheDocument()
    expect(within(row).getByText(String(leader!.points))).toBeInTheDocument()
    expect(within(row).getByText(String(leader!.wins))).toBeInTheDocument()
  })

  it('driver names link to their profile', () => {
    renderAt('/standings/drivers')
    const [leader] = driverStandings(season.races)
    const d = driverById(leader!.id)!
    const row = within(screen.getByRole('table')).getAllByRole('row')[1]!
    const link = within(row).getByRole('link', { name: `${d.givenName} ${d.familyName}` })
    expect(link).toHaveAttribute('href', `/drivers/${leader!.id}`)
  })
})
