import "@utils/array"
import { localDateToDate } from "@utils"

import { type GetPlayer } from "@queries"

import { type GoUsers } from "@types"

import { type SocialsLinks } from "@validation"

import { Card, CardHeader, CardTitle } from "@shad"

import { BadgeList } from "../common/exports"

import { PlayerAvatar } from "./PlayerAvatar"

import {
  PlayerAge,
  PlayerChosenStrength,
  PlayerDeclaredElo,
  PlayerFullName,
  PlayerSocials,
} from "./PlayerCardData/exports"

type PlayerProfileListCardProps = {
  player: GetPlayer
}

export function PlayerProfileListCard({
  player,
}: PlayerProfileListCardProps) {
  if (!player?.profile) return

  const profile = player.profile

  return (
    <Card className="bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-500">
      <CardHeader className="p-4 pr-5">
        <CardTitle className="flex gap-3 md:gap-3 items-center">
          <PlayerAvatar
            imageUrl={player.image_url}
            alt={player.username}
            className="h-12 md:h-14 w-12 md:w-14"
          />

          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap gap-x-2 md:gap-2 text-2xl font-extrabold items-center">
              <PlayerFullName
                firstName={profile.first_name}
                lastName={profile.last_name}
              />
              <PlayerChosenStrength
                goUsers={profile.go_users as GoUsers}
              />
              <PlayerDeclaredElo
                elo={profile.declared_elo}
              />
            </div>

            <div className="flex flex-wrap gap-2 items-center">
              <BadgeList
                badges={profile.cities_of_residence}
              />
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
          </div>
        </CardTitle>
      </CardHeader>
    </Card>
  )
}
