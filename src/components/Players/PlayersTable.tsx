import e, { type $infer } from "@@/dbschema/edgeql-js"

export const selectPlayers = e.select(e.Player, () => ({
  id: true,
  username: true,
  email: true,
}))

export type Players = $infer<typeof selectPlayers>

type PlayersTableProps = {
  players: Players
}

export function PlayersTable({
  players,
}: PlayersTableProps) {
  return (
    <div>
      {players.map((p, i) => {
        return (
          <div key={i}>
            <p>{p.username}</p>
            <p>{p.email}</p>
          </div>
        )
      })}
    </div>
  )
}
