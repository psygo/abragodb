import { edgeDbClient } from "@db"

import { selectPlayers } from "@queries"

import { PlayersTable } from "@components"

export default async function HomePage() {
  const playersQuery = await selectPlayers.run(edgeDbClient)

  return (
    <section className="flex flex-col gap-2">
      <PlayersTable players={playersQuery.players} />
    </section>
  )
}
