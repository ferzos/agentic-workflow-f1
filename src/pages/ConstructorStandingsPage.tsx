import { TeamSwatch } from '@/components/TeamSwatch'
import { Table, Td, Th } from '@/components/ui/table'
import { season } from '@/data/season'
import { constructorStandings } from '@/lib/standings'

export function ConstructorStandingsPage() {
  const rows = constructorStandings(season.races)
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Constructor standings</h1>
      <Table>
        <caption className="sr-only">2025 constructor standings</caption>
        <thead>
          <tr>
            <Th>Position</Th>
            <Th>Constructor</Th>
            <Th>Points</Th>
            <Th>Wins</Th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id}>
              <Td>{r.position}</Td>
              <Td>
                <TeamSwatch constructorId={r.id} />
              </Td>
              <Td>{r.points}</Td>
              <Td>{r.wins}</Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}
