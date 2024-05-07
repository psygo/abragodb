import { edgeDbClient } from "@db"

import { PlayersTable, selectPlayers } from "@components"

export default async function HomePage() {
  const players = await selectPlayers.run(edgeDbClient)

  return (
    <section className="flex flex-col gap-2">
      <h2 className="text-2xl font-bold">Jogadores</h2>
      <PlayersTable players={players} />
    </section>
  )
}
