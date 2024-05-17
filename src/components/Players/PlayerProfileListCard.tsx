import "@utils/array"
import { localDateToDate } from "@utils"

import { type GetPlayer } from "@queries"

import {
  type GoUsers,
  type SocialsLinks,
} from "@validation"

import { Card, CardHeader, CardTitle } from "@shad"

import { PlayerAvatar } from "./PlayerAvatar"

import {
  PlayerAge,
  PlayerChosenStrength,
  PlayerFullName,
  PlayerSocials,
} from "./PlayerCardData/exports"

type PlayerProfileListCardProps = {
  player: GetPlayer
}

export function PlayerProfileListCard({
  player,
}: PlayerProfileListCardProps) {
  if (!player) return

  if (!player.profile)
    return (
      <h2 className="text-gray-400">Nenhuma Informação</h2>
    )

  const profile = player.profile

  function showSubtitle() {
    return (
      profile.sex ??
      profile.date_of_birth ??
      profile.public_email ??
      (profile.socials_links as SocialsLinks)
    )
  }

  return (
    <Card
      style={{
        borderColor: profile.border_color ?? "gray",
      }}
    >
      <CardHeader className="p-4 pr-5">
        <CardTitle className="flex gap-2 md:gap-3 items-center">
          <PlayerAvatar
            imageUrl={player.image_url}
            alt={player.username}
            className="h-12 md:h-14 w-12 md:w-14"
          />

          <div className="flex flex-col md:gap-1">
            <div className="flex gap-1 md:gap-2 text-2xl font-extrabold md:items-center">
              <PlayerFullName
                firstName={profile.first_name}
                lastName={profile.last_name}
              />
              <PlayerChosenStrength
                goUsers={profile.go_users as GoUsers}
              />
            </div>

            {showSubtitle() && (
              <div className="flex gap-2 items-center">
                <PlayerAge
                  dateOfBirth={localDateToDate(
                    profile.date_of_birth,
                  )}
                />
                <PlayerSocials
                  socialsLinks={
                    profile.socials_links as SocialsLinks
                  }
                />
              </div>
            )}
          </div>
        </CardTitle>
      </CardHeader>
    </Card>
  )
}
