import e from "@@/dbschema/edgeql-js"

import { edgeDbClient } from "@db"

import { type Username } from "@types"

type PlayerPageProps = {
  params: { username: Username }
}

export default async function PlayerPage({
  params,
}: PlayerPageProps) {
  const username = params.username
  const selectPlayer = e.select(e.Player, (player) => ({
    id: true,
    username: true,
    email: true,
    filter_single: e.op(player.username, "=", username),
  }))
  const player = await selectPlayer.run(edgeDbClient)

  if (!player) return <></>

  return (
    <article className="prose dark:prose-invert">
      <h2>{player.username}</h2>
      <h3>{player.email}</h3>
    </article>
  )
}
