import { edgeDbClient } from "@db"

import { selectStatistics } from "@queries"

import { StatsPageContent } from "@components"

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
    <StatsPageContent
      totalPlayers={statsQuery.total_players}
      totalPlayersPublic={statsQuery.total_players_public}
      totalPlayersPerState={totalPlayersPerState}
    />
  )
}
