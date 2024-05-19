import { edgeDbClient } from "@db"

import { selectStatistics } from "@queries"

import { BrazilMap, DbStatisticsCard } from "@components"

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
    <div className="flex flex-col gap-2">
      <div className="flex justify-between">
        <DbStatisticsCard
          label="Total de Jogadores"
          stats={statsQuery.total_players}
        />
        <DbStatisticsCard
          label="Total de Jogadores Públicos"
          stats={statsQuery.total_players_public}
        />
      </div>
      <Card className="max-w-[700px] bg-gray-100 dark:bg-gray-800">
        <CardHeader className="p-4">
          <CardTitle className="text-sm text-gray-400">
            População de Jogadores por Estado
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0 flex justify-end">
          <BrazilMap />
        </CardContent>
      </Card>
    </div>
  )
}
