import "@utils/array"
import { localDateToDate } from "@utils"

import { brStatesToOptions } from "@types"

import { type GetPlayer } from "@queries"

import {
  type GoUsers,
  type SocialsLinks,
} from "@validation"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@shad"

import { BadgeList } from "../common/exports"

import { PlayerAvatar } from "./PlayerAvatar"

import {
  PlayerGoUsersList,
  PlayerAge,
  PlayerChosenStrength,
  PlayerEmail,
  PlayerFullName,
  PlayerSex,
  PlayerSocials,
  PlayerUsername,
  PlayerDescription,
} from "./PlayerCardData/exports"

type PlayerProfileCardProps = {
  player: GetPlayer
}

export function PlayerProfileCard({
  player,
}: PlayerProfileCardProps) {
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
              <PlayerUsername username={player.username} />
            </div>

            {showSubtitle() && (
              <div className="flex gap-2 items-center">
                <PlayerSex sex={profile.sex} />
                <PlayerAge
                  dateOfBirth={localDateToDate(
                    profile.date_of_birth,
                  )}
                />
                <PlayerEmail email={profile.public_email} />
                <BadgeList
                  badges={profile.cities_of_residence}
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

      <CardContent className="flex flex-col gap-5">
        <div className="flex gap-3">
          <div className="flex flex-col gap-2">
            <BadgeList
              label="Idiomas"
              badges={profile.languages}
            />
            <BadgeList
              label="Estados Brasileiros de Origem"
              badges={brStatesToOptions(
                profile.br_states_of_origin ?? [],
              ).map((st) => st.label)}
            />
            <BadgeList
              label="Países de Residência"
              badges={profile.countries_of_residence}
            />
            <BadgeList
              label="Estados Brasileiros de Residência"
              badges={brStatesToOptions(
                profile.br_states_of_residence ?? [],
              ).map((st) => st.label)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <BadgeList
              label="Nacionalidades"
              badges={profile.nationalities}
            />
            <BadgeList
              label="Cidades de Origem"
              badges={profile.cities_of_origin}
            />
            <BadgeList
              label="Cidades de Residência"
              badges={profile.cities_of_residence}
            />
          </div>
        </div>

        <PlayerGoUsersList
          goUsers={profile.go_users as GoUsers}
        />

        <PlayerDescription
          description={profile.description}
        />
      </CardContent>
    </Card>
  )
}
