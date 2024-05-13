import { edgeDbClient } from "@db"

import { selectPlayers } from "@queries"

import { BrStateFilter, PlayersTable } from "@components"

type HomePageProps = {
  searchParams: Record<
    string,
    string | string[] | undefined
  >
}

export default async function HomePage({
  searchParams,
}: HomePageProps) {
  console.log("search", searchParams)
  const playersQuery = await selectPlayers.run(edgeDbClient)

  return (
    <div className="flex flex-col justify-end gap-2">
      <BrStateFilter />
      <PlayersTable players={playersQuery.players} />
    </div>
  )
}
