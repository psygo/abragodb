"use client"

import { useRouter } from "next/navigation"

import { type GetPlayers } from "@queries"

import { PlayerProfile } from "./PlayerProfile"

type PlayersTableProps = {
  players: GetPlayers["players"]
}

export function PlayersTable({
  players,
}: PlayersTableProps) {
  const router = useRouter()

  return (
    <div className="flex flex-col gap-2">
      {players.map((p) => {
        return (
          <div
            key={p.username}
            onClick={() =>
              router.push(`/jogadores/${p.username}`)
            }
            className="hover:drop-shadow-lg hover:cursor-pointer"
          >
            <PlayerProfile
              key={p.username}
              player={p}
              onlyHeader={true}
            />
          </div>
        )
      })}
    </div>
  )
}
