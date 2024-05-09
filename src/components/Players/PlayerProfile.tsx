import e, { type $infer } from "@@/dbschema/edgeql-js"

import { toPrettyJson } from "@utils"

import { type Username } from "@types"

import { type GoUsers } from "@validation"

export function getPlayerQuery(username: Username) {
  return e.select(e.Player, (player) => ({
    ...e.Player["*"],
    profile: {
      ...e.Player.profile["*"],
      id: false,
    },
    filter_single: e.op(player.username, "=", username),
  }))
}

type GetPlayerReturnType = ReturnType<typeof getPlayerQuery>

export type GetPlayer = $infer<GetPlayerReturnType>

type PlayerProfileProps = {
  player: GetPlayer
}

export function PlayerProfile({
  player,
}: PlayerProfileProps) {
  if (!player) return

  return (
    <section className="mt-1">
      <p>{player.profile?.first_name}</p>
      <p>{player.profile?.last_name}</p>
      <p>{player.profile?.description}</p>
      <p>{player.profile?.public_email}</p>
      <p>{player.profile?.date_of_birth?.toString()}</p>
      <pre>
        {toPrettyJson(player.profile?.go_users as GoUsers)}
      </pre>
    </section>
  )
}
