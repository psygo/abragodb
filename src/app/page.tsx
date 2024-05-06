import e from "@/../dbschema/edgeql-js"

import { edgeDbClient } from "../server/db/exports"

export default async function HomePage() {
  const selectPlayers = e.select(e.Player, () => ({
    id: true,
    username: true,
    email: true,
  }))

  const players = await selectPlayers.run(edgeDbClient)

  return (
    <main className="">
      {players.map((p, i) => {
        return (
          <div key={i}>
            <p>{p.username}</p>
            <p>{p.email}</p>
          </div>
        )
      })}
    </main>
  )
}
