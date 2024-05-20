import e, { type $infer } from "@schema"

import { type BR_STATE } from "@types"

export function selectPlayersWithState(state?: string) {
  const hasState = state && state.length === 2

  return e.select(e.Player, (player) => {
    return {
      ...e.Player["*"],
      id: false,
      profile: {
        ...e.Player.profile["*"],
        id: false,
      },
      filter: e.op(
        e.op(player.profile.is_public, "=", true),
        "and",
        hasState
          ? e.op(
              e.array([e.BrState[state as BR_STATE]]),
              "in",
              player.profile.br_states_of_residence,
            )
          : e.op(true, "=", true),
      ),
      order_by: {
        expression: player.profile.declared_elo,
        direction: e.DESC,
      },
    }
  })
}

export type GetPlayers = $infer<
  ReturnType<typeof selectPlayersWithState>
>
