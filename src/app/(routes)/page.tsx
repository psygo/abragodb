import { edgeDbClient } from "@db"

import { selectPlayers } from "@queries"

import { DbStatisticsCard, PlayersTable } from "@components"

export default async function HomePage() {
  const players = await selectPlayers.run(edgeDbClient)

  return (
    <section className="flex flex-col gap-2">
      <DbStatisticsCard
        totalPlayers={players[0]?.total_players ?? 0}
      />
      <PlayersTable players={players} />
    </section>
  )
}
