import e, {
  type $infer,
} from "./../../../../dbschema/edgeql-js"

export const selectPlayers = e.select({
  players: e.select(e.Player, (player) => ({
    ...e.Player["*"],
    id: false,
    profile: {
      ...e.Player.profile["*"],
      id: false,
    },
    filter: e.op(player.profile.is_public, "=", true),
    order_by: {
      expression: player.created_at,
      direction: e.DESC,
    },
  })),
})

export type GetPlayers = $infer<typeof selectPlayers>
