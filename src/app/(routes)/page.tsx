import { edgeDbClient } from "@db"

import { selectPlayersWithState } from "@queries"

import { BrStateFilter, PlayersList } from "@components"

type HomePageProps = {
  searchParams: Record<
    string,
    string | string[] | undefined
  >
}

export default async function HomePage({
  searchParams,
}: HomePageProps) {
  const { estado } = searchParams

  const playersQuery = await selectPlayersWithState(
    estado as string,
  ).run(edgeDbClient)

  console.log("playersQuery", playersQuery.players.length)
  return (
    <div className="flex flex-col justify-end gap-2">
      <BrStateFilter />
      <PlayersList players={playersQuery.players} />
    </div>
  )
}
