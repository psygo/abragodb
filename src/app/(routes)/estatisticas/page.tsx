import { edgeDbClient } from "@db"

import { selectStatistics } from "@queries"

import { BrazilMap, DbStatisticsCard } from "@components"

type StatisticsPageProps = {
  searchParams: Record<
    string,
    string | string[] | undefined
  >
}

export default async function StatisticsPage({
  searchParams,
}: StatisticsPageProps) {
  const { estado } = searchParams

  const statsQuery = await selectStatistics(
    estado as string,
  ).run(edgeDbClient)

  console.log("stats", statsQuery)

  return (
    <>
      <DbStatisticsCard
        label="Total de Jogadores"
        stats={statsQuery.total_players}
      />
      <BrazilMap />
    </>
  )
}
