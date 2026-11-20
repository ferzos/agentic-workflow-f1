import { Link, useParams } from 'react-router'
import { Table, Td, Th } from '@/components/ui/table'
import { constructorById, driverById, season } from '@/data/season'
import { driverProfile } from '@/lib/driverProfile'

export function DriverPage() {
  const driver = driverById(useParams().id ?? '')
  if (!driver) {
    return (
      <div>
        <h1 className="text-2xl font-bold">Driver not found</h1>
        <Link className="underline" to="/standings/drivers">
          Back to driver standings
        </Link>
      </div>
    )
  }
  const profile = driverProfile(season.races, driver.id)
  const team = profile.constructorId ? constructorById(profile.constructorId) : undefined
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">
        {driver.givenName} {driver.familyName}
      </h1>
      <dl className="grid grid-cols-3 gap-4 text-sm">
        <div>
          <dt className="text-muted-foreground">Team</dt>
          <dd data-testid="driver-team">{team?.name ?? 'Unknown'}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Points</dt>
          <dd data-testid="driver-points">{profile.points}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Wins</dt>
          <dd data-testid="driver-wins">{profile.wins}</dd>
        </div>
      </dl>
      <Table>
        <caption className="sr-only">{driver.familyName} 2025 race results</caption>
        <thead>
          <tr>
            <Th>Round</Th>
            <Th>Race</Th>
            <Th>Grid</Th>
            <Th>Position</Th>
            <Th>Points</Th>
            <Th>Status</Th>
          </tr>
        </thead>
        <tbody>
          {profile.results.map((r) => (
            <tr key={r.round}>
              <Td>{r.round}</Td>
              <Td>{r.raceName}</Td>
              <Td>{r.grid}</Td>
              <Td>{r.position}</Td>
              <Td>{r.points}</Td>
              <Td>{r.status}</Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}
