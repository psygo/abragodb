import { Link } from "lucide-react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faDiscord,
  faFacebook,
  faInstagram,
  faTwitch,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons"
import {
  faGenderless,
  faMars,
  faVenus,
} from "@fortawesome/free-solid-svg-icons"

import { localDateToDate } from "@utils"

import { brStatesToOptions, goStrength } from "@types"

import { type GetPlayer } from "@queries"

import {
  type GoUsers,
  type SocialsLinks,
} from "@validation"

import { cn } from "@styles"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@shad"

import { BadgeList } from "./BadgeList"
import { PlayerAvatar } from "./PlayerAvatar"

type PlayerProfileProps = {
  player: GetPlayer
  onlyHeader?: boolean
}

export function PlayerProfile({
  player,
  onlyHeader = false,
}: PlayerProfileProps) {
  if (!player) return

  if (!player.profile)
    return (
      <h2 className="text-gray-400">Nenhuma Informação</h2>
    )

  const profile = player.profile

  function getFirstStrength() {
    const goUsers = profile?.go_users as GoUsers
    if (!goUsers) return ""

    const strengths = Object.values({ ...goUsers })
    if (strengths.length === 0) return ""

    return strengths
      .map((u) => {
        return {
          ...goStrength.find(
            (gs) => gs.kyu_dan === u.strength,
          )!,
          server: u.server,
        }
      })
      .first()
  }

  function getStrengthColor() {
    const firstStrength = getFirstStrength()
    if (firstStrength === "") return "gray"

    if (firstStrength.kyu_dan.includes("k"))
      return "text-green-800"
    else if (firstStrength.kyu_dan.includes("d"))
      return "text-orange-800"
    else return "gray"
  }

  function getStrength() {
    const firstStrength = getFirstStrength()
    if (
      firstStrength === "" ||
      !firstStrength?.kyu_dan ||
      !firstStrength?.server
    )
      return ""

    return `${firstStrength.kyu_dan} ${firstStrength.server}`
  }

  function getAge() {
    const dateOfBirth = profile?.date_of_birth
    if (!dateOfBirth) return ""
    const d = localDateToDate(dateOfBirth)

    const now = new Date()
    const ageDifMs = now.getTime() - d.getTime()
    const ageDate = new Date(ageDifMs)
    const age = Math.abs(ageDate.getUTCFullYear() - 1970)
    return age > 1 ? `${age} anos` : ""
  }

  function showSubtitle() {
    return (
      profile.sex ??
      profile.date_of_birth ??
      profile.public_email ??
      (profile.socials_links as SocialsLinks)
    )
  }

  function showResidence() {
    return (
      onlyHeader &&
      profile.br_states_of_residence &&
      profile.br_states_of_residence.length > 0 &&
      profile.cities_of_residence &&
      profile.cities_of_residence.length > 0
    )
  }

  function getGoUsersBadges() {
    const goUsers = (profile.go_users as GoUsers)!
    return Object.values(goUsers).map(
      (gu) =>
        `${gu?.username ?? ""} ${gu?.strength ?? ""} ${gu?.server ?? ""}`,
    )
  }

  return (
    <Card
      style={{
        borderColor: profile.border_color ?? "gray",
      }}
    >
      <CardHeader className="p-4 pr-5">
        <CardTitle className="flex gap-2 items-center">
          <PlayerAvatar
            imageUrl={player.image_url}
            alt={player.username}
          />

          <div className="flex flex-col gap-[4px]">
            <div className="flex gap-2 text-2xl font-extrabold items-center">
              <h2>
                {profile?.first_name} {profile?.last_name}
              </h2>
              {getStrength() && (
                <h3
                  className={cn(
                    "text-gray-600",
                    getStrengthColor(),
                  )}
                >
                  {getStrength()}
                </h3>
              )}
              <h4 className="text-lg text-gray-400">
                @{player.username}
              </h4>
            </div>

            {showSubtitle() && (
              <div className="flex gap-2 items-center">
                <PlayerSex sex={profile.sex} />
                <p className="text-[1rem] text-gray-500">
                  {getAge()}
                </p>
                <a
                  href={`mailto:${profile.public_email}`}
                  className="text-[1rem] text-gray-500"
                >
                  {profile.public_email}
                </a>
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

      {onlyHeader && (
        <CardContent className="flex gap-2 p-4 pt-0 px-6">
          {(profile.go_users as GoUsers) && (
            <div>
              <BadgeList
                label="Usuários em Servidores de Go"
                badges={getGoUsersBadges()}
              />
            </div>
          )}
          {showResidence() && (
            <>
              <BadgeList
                label="Estados Brasileiros de Residência"
                badges={brStatesToOptions(
                  profile.br_states_of_residence ?? [],
                ).map((st) => st.label)}
              />
              <BadgeList
                label="Cidades de Residência"
                badges={profile.cities_of_residence}
              />
            </>
          )}
        </CardContent>
      )}

      {!onlyHeader && (
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

          {(profile.go_users as GoUsers) && (
            <div>
              <BadgeList
                label="Usuários em Servidores de Go"
                badges={getGoUsersBadges()}
              />
            </div>
          )}

          <PlayerDescription
            description={profile.description}
          />
        </CardContent>
      )}
    </Card>
  )
}

type PlayerDescriptionProps = {
  description: string | null | undefined
}

function PlayerDescription({
  description,
}: PlayerDescriptionProps) {
  if (!description || description === "") return
  return (
    <div className="flex flex-col gap-2 pl-1">
      <p className="text-gray-400 text-xs">Descrição</p>
      <p className="text-[0.95rem]">{description}</p>
    </div>
  )
}

type PlayerSexProps = {
  sex: string | null | undefined
}

function PlayerSex({ sex }: PlayerSexProps) {
  if (!sex || sex === "") return

  if (sex === "Masculino")
    return (
      <FontAwesomeIcon
        className="h-[15px] w-[15px] mb-[1px]"
        color="gray"
        icon={faMars}
      />
    )
  else if (sex === "Feminino")
    return (
      <FontAwesomeIcon
        className="h-[15px] w-[15px] mb-[1px]"
        color="gray"
        icon={faVenus}
      />
    )
  else if (sex === "Outro")
    return (
      <FontAwesomeIcon
        className="h-[15px] w-[15px] mb-[1px]"
        color="gray"
        icon={faGenderless}
      />
    )
}

type PlayerSocialsProps = {
  socialsLinks: SocialsLinks
}

function PlayerSocials({
  socialsLinks,
}: PlayerSocialsProps) {
  if (!socialsLinks) return

  const {
    discord,
    facebook,
    instagram,
    twitch,
    youtube,
    personal,
  } = socialsLinks

  return (
    <div className="ml-1 pb-1 flex gap-2 items-center">
      {discord && (
        <a href={discord}>
          <FontAwesomeIcon
            className="h-[18px] w-[18px]"
            color="gray"
            icon={faDiscord}
          />
        </a>
      )}
      {facebook && (
        <a href={facebook}>
          <FontAwesomeIcon
            className="h-[16px] w-[16px] pb-[1px]"
            color="gray"
            icon={faFacebook}
          />
        </a>
      )}
      {instagram && (
        <a href={instagram}>
          <FontAwesomeIcon
            className="h-[17.5px] w-[17.5px]"
            color="gray"
            icon={faInstagram}
          />
        </a>
      )}
      {twitch && (
        <a href={twitch}>
          <FontAwesomeIcon
            className="h-[16.5px] w-[16.5px]"
            color="gray"
            icon={faTwitch}
          />
        </a>
      )}
      {youtube && (
        <a href={youtube}>
          <FontAwesomeIcon
            className="h-[17.5px] w-[17.5px]"
            color="gray"
            icon={faYoutube}
          />
        </a>
      )}
      {personal && (
        <a href={personal}>
          <Link
            className="h-[14.5px] w-[14.5px] mt-1"
            color="gray"
          />
        </a>
      )}
    </div>
  )
}
