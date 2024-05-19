import { edgeDbClient } from "@db"

import { selectStatistics } from "@queries"

import { BrazilMapCard, DbStatisticCard } from "@components"

export default async function StatisticsPage() {
  const statsQuery =
    await selectStatistics.run(edgeDbClient)

  const totalPlayersPerState: Record<string, number> = {}
  for (const tp of statsQuery.players_per_state) {
    if (!tp.key.br_state || tp.key.br_state === "") continue
    totalPlayersPerState[tp.key.br_state] =
      tp.elements.length
  }

  return (
    <div className="grid grid-cols-2 gap-x-2 gap-y-2">
      <DbStatisticCard
        label="Total de Jogadores"
        stats={statsQuery.total_players}
      />
      <DbStatisticCard
        label="Total de Jogadores Públicos"
        stats={statsQuery.total_players_public}
      />
      <BrazilMapCard
        className="col-span-2"
        totalPlayersPerState={totalPlayersPerState}
      />
    </div>
  )
}
