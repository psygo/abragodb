import { type GetPlayers } from "@queries"

import { PlayerProfile } from "./PlayerProfile"

type PlayersTableProps = {
  players: GetPlayers["players"]
}

export function PlayersTable({
  players,
}: PlayersTableProps) {
  return players.map((p) => {
    return <PlayerProfile key={p.clerkid} player={p} />
  })
}
