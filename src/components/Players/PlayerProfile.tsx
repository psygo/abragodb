import e, { type $infer } from "@@/dbschema/edgeql-js"

import { type Username } from "@types"
import Image from "next/image"

export function getPlayerQuery(username: Username) {
  return e.select(e.Player, (player) => ({
    ...e.Player["*"],
    profile: {
      ...e.Player.profile["*"],
      id: false,
    },
    filter_single: e.op(player.username, "=", username),
  }))
}

type GetPlayerReturnType = ReturnType<typeof getPlayerQuery>

export type GetPlayer = $infer<GetPlayerReturnType>

type PlayerProfileProps = {
  player: GetPlayer
}

export function PlayerProfile({
  player,
}: PlayerProfileProps) {
  if (!player) return

  if (!player.profile)
    return (
      <h2 className="text-gray-400">Nenhuma Informacao</h2>
    )

  return (
    <section className="mt-1">
      <div className="flex gap-2">
        <PlayerAvatar
          imageUrl={player.image_url}
          alt={player.username}
        />
        <h2 className="mt-6 flex gap-2">
          <span>{player.profile?.first_name}</span>
          <span>{player.profile?.last_name}</span>
        </h2>
      </div>
      <p>{player.profile?.description}</p>
      <p>{player.profile?.public_email}</p>
      <p>{player.profile?.date_of_birth?.toString()}</p>
    </section>
  )
}

type PlayerAvatarProps = {
  imageUrl: string | null | undefined
  alt: string
}

export function PlayerAvatar({
  imageUrl,
  alt = "",
}: PlayerAvatarProps) {
  if (!imageUrl) return

  const searchParams = new URLSearchParams()
  searchParams.set("height", "100")
  searchParams.set("width", "100")
  searchParams.set("quality", "100")
  searchParams.set("fit", "crop")
  const imageSrc = `${imageUrl}?${searchParams.toString()}`

  return (
    <Image
      src={imageSrc}
      width={50}
      height={50}
      alt={alt}
    />
  )
}
