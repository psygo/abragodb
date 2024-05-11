import e, { type $infer } from "@@/dbschema/edgeql-js"

export const selectPlayers = e.select({
  total_players: e.count(e.Player),
  players: e.select(e.Player, (player) => ({
    nanoid: true,
    username: true,
    email: true,
    image_url: true,
    profile: {
      first_name: true,
      last_name: true,
    },
    order_by: {
      expression: player.created_at,
      direction: e.DESC,
    },
  })),
})

export type GetPlayers = $infer<typeof selectPlayers>
