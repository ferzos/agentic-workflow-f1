import { screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { constructorById, season } from '@/data/season'
import { driverProfile } from '@/lib/driverProfile'
import { renderAt } from '@/test/render'

describe('DriverPage', () => {
  it('shows name, team, points and wins', () => {
    const driver = season.drivers[0]!
    const profile = driverProfile(season.races, driver.id)
    renderAt(`/drivers/${driver.id}`)
    expect(screen.getByRole('heading', { name: `${driver.givenName} ${driver.familyName}` })).toBeInTheDocument()
    expect(screen.getByTestId('driver-team')).toHaveTextContent(constructorById(profile.constructorId!)!.name)
    expect(screen.getByTestId('driver-points')).toHaveTextContent(String(profile.points))
    expect(screen.getByTestId('driver-wins')).toHaveTextContent(String(profile.wins))
    expect(within(screen.getByRole('table')).getAllByRole('row')).toHaveLength(profile.results.length + 1)
  })

  it('shows not found for an unknown id', () => {
    renderAt('/drivers/nobody')
    expect(screen.getByRole('heading', { name: 'Driver not found' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Back to driver standings' })).toHaveAttribute('href', '/standings/drivers')
  })
})
