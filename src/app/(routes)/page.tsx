import { edgeDbClient } from "@db"

import { selectPlayers } from "@queries"

import { PlayersTable } from "@components"

export default async function HomePage() {
  const players = await selectPlayers.run(edgeDbClient)

  return (
    <section className="flex flex-col gap-2">
      <PlayersTable players={players} />
    </section>
  )
}
