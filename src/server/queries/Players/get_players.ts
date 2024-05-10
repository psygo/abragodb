import e, { type $infer } from "@@/dbschema/edgeql-js"

export const selectPlayers = e.select(
  e.Player,
  (player) => ({
    nanoid: true,
    username: true,
    email: true,
    profile: {
      first_name: true,
      last_name: true,
    },
    total_players: e.count(player),
  }),
)

export type Players = $infer<typeof selectPlayers>
