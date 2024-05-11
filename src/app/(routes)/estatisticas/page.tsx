import { edgeDbClient } from "@db"

import { selectStatistics } from "@queries"

import { DbStatisticsCard } from "@components"

export default async function StatisticsPage() {
  const statsQuery =
    await selectStatistics.run(edgeDbClient)

  return (
    <DbStatisticsCard
      label="Total de Jogadores"
      stats={statsQuery.total_players}
    />
  )
}
