import { edgeDbClient } from "@db"

import { type BR_STATE } from "@types"

import { selectPlayersWithState } from "@queries"

import {
  BrStateFilter,
  PlayersList,
  type PlayersOrderBy,
  PlayersOrderBySelect,
} from "@components"

type HomePageProps = {
  searchParams: Record<
    string,
    string | string[] | undefined
  >
}

export default async function HomePage({
  searchParams,
}: HomePageProps) {
  console.log("searchp", searchParams)
  const { estado, ordenar } = searchParams

  const playersQuery = await selectPlayersWithState(
    estado as BR_STATE,
    ordenar as PlayersOrderBy,
  ).run(edgeDbClient)

  return (
    <div className="flex flex-col justify-end gap-2">
      <div className="flex flex-col gap-1">
        <PlayersOrderBySelect
          initialValue={ordenar as PlayersOrderBy}
        />
        <BrStateFilter initialValue={estado as BR_STATE} />
      </div>
      <PlayersList players={playersQuery} />
    </div>
  )
}
