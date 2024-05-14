import e from "@schema"

import { type BR_STATE } from "@types"

export function selectStatistics(state?: string) {
  const hasState = state && state.length === 2

  return e.select({
    total_players: e.count(e.Player),
    total_players_in_state: e.select(
      e.Player,
      (player) => ({
        // group: {
        //   by: {
        //     br_state: player.profile.br_states_of_residence,
        //   },
        //   then: {
        //     count: e.count(player)
        //   }
        // },
        total: e.count(player),
        filter: hasState
          ? e.op(
              e.array([e.BrState[state as BR_STATE]]),
              "in",
              player.profile.br_states_of_residence,
            )
          : e.op(true, "=", true),
      }),
    ),
  })
}
