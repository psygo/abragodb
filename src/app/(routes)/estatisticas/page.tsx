import { edgeDbClient } from "@db"

import { selectStatistics } from "@queries"

import {
  BrazilMap,
  BrazilMapCard,
  DbStatisticCard,
} from "@components"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@shad"

export default async function StatisticsPage() {
  const statsQuery =
    await selectStatistics().run(edgeDbClient)

  const totalPlayersPerState =
    statsQuery.players_per_state.map((st) => ({
      state: st.key.br_state,
      total: st.elements.length,
    }))

  console.log(totalPlayersPerState)

  return (
    <div className="grid grid-cols-2 gap-x-2 gap-y-2">
      {/* <div className="flex justify-between"> */}
        <DbStatisticCard
          label="Total de Jogadores"
          stats={statsQuery.total_players}
        />
        <DbStatisticCard
          label="Total de Jogadores Públicos"
          stats={statsQuery.total_players_public}
        />
      {/* </div> */}
      <BrazilMapCard className="col-span-2" />
    </div>
  )
}
