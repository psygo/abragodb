import Link from "next/link"

import { type GetPlayers } from "@queries"

import { PlayerProfile } from "./PlayerProfile"

type PlayersTableProps = {
  players: GetPlayers["players"]
}

export function PlayersTable({
  players,
}: PlayersTableProps) {
  return (
    <div className="flex flex-col gap-2">
      {players.map((p) => {
        return (
          <Link
            key={p.username}
            href={`/jogadores/${p.username}`}
            className="hover:drop-shadow-lg"
          >
            <PlayerProfile
              key={p.username}
              player={p}
              onlyHeader={true}
            />
          </Link>
        )
      })}
    </div>
  )
}
