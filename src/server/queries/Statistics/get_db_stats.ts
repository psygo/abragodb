import e from "@schema"

export const selectStatistics = e.select({
  total_players: e.count(e.Player),
  total_players_public: e.count(
    e.select(e.Player, (player) => {
      return {
        filter: e.op(player.profile.is_public, "=", true),
      }
    }),
  ),
  players_per_state: e.group(e.Player, (player) => {
    const first_br_state =
      player.profile.br_states_of_residence.slice(0, 1) ??
      ""

    return {
      by: e.group.set({
        br_state: first_br_state,
      }),
    }
  }),
})
