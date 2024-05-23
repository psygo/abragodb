import e, { type $infer } from "@schema"

import { type BR_STATE } from "@types"

import { type PlayersOrderBy } from "@components"

export function selectPlayersWithState(
  state?: BR_STATE,
  orderBy?: PlayersOrderBy,
) {
  return e.select(e.Player, (player) => {
    return {
      ...e.Player["*"],
      id: false,
      profile: {
        ...e.Player.profile["*"],
        id: false,
      },
      filter: e.op(
        e.op(
          e.op(player.profile.is_public, "=", true),
          "and",
          e.op(player.account_status, "?!=", "suspended"),
        ),
        "and",
        state
          ? e.op(
              e.array([e.BrState[state]]),
              "in",
              player.profile.br_states_of_residence,
            )
          : e.op(true, "=", true),
      ),
      order_by: {
        expression:
          orderBy === "criacao"
            ? player.created_at
            : player.profile.declared_elo,
        direction: e.DESC,
      },
    }
  })
}

export type GetPlayers = $infer<
  ReturnType<typeof selectPlayersWithState>
>
