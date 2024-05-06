import e from "@@/dbschema/edgeql-js"

import { edgeDbClient } from "@db"

export default async function HomePage() {
  const selectPlayers = e.select(e.Player, () => ({
    id: true,
    username: true,
    email: true,
  }))

  const players = await selectPlayers.run(edgeDbClient)

  return (
    <>
      {players.map((p, i) => {
        return (
          <div key={i}>
            <p>{p.username}</p>
            <p>{p.email}</p>
          </div>
        )
      })}
    </>
  )
}
