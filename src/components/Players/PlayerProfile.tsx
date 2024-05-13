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

import "@utils/array"
import { localDateToDate } from "@utils"

import {
  brStatesToOptions,
  type Email,
  goStrength,
  type Username,
} from "@types"

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
        <CardTitle className="flex gap-2 md:gap-4 items-center">
          <PlayerAvatar
            imageUrl={player.image_url}
            alt={player.username}
            className="h-10 md:h-14 w-10 md:w-14"
          />

          <div className="flex flex-col gap-1 md:gap-[8px]">
            <div className="flex gap-1 md:gap-2 text-2xl font-extrabold md:items-center">
              <PlayerFullName
                firstName={profile.first_name}
                lastName={profile.last_name}
              />
              <PlayerChosenStrength
                goUsers={profile.go_users as GoUsers}
              />
              {!onlyHeader && (
                <PlayerUsername
                  username={player.username}
                />
              )}
            </div>

            {showSubtitle() && (
              <div className="flex gap-2 items-center">
                {!onlyHeader && (
                  <PlayerSex sex={profile.sex} />
                )}
                <PlayerAge
                  dateOfBirth={localDateToDate(
                    profile.date_of_birth,
                  )}
                />
                {!onlyHeader && (
                  <PlayerEmail
                    email={profile.public_email}
                  />
                )}
                {onlyHeader && (
                  <BadgeList
                    badges={profile.cities_of_residence}
                  />
                )}
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

          <GoUsersList
            goUsers={profile.go_users as GoUsers}
          />

          <PlayerDescription
            description={profile.description}
          />
        </CardContent>
      )}
    </Card>
  )
}

type PlayerAgeProps = {
  dateOfBirth: Date
}

function PlayerAge({ dateOfBirth }: PlayerAgeProps) {
  const now = new Date()
  const ageDifMs = now.getTime() - dateOfBirth.getTime()
  const ageDate = new Date(ageDifMs)
  const age = Math.abs(ageDate.getUTCFullYear() - 1970)
  const ageStr = age > 1 ? `${age} anos` : ""

  return (
    <p className="text-[1rem] text-gray-500 hidden sm:block">
      {ageStr}
    </p>
  )
}

type PlayerEmailProps = {
  email: Email | null | undefined
}

function PlayerEmail({ email }: PlayerEmailProps) {
  if (!email || email === "") return

  return (
    <a
      href={`mailto:${email}`}
      className="text-[1rem] text-gray-500 hidden md:block"
    >
      {email}
    </a>
  )
}

type PlayerUsernameProps = {
  username: Username
}

function PlayerUsername({ username }: PlayerUsernameProps) {
  return (
    <h4 className="text-lg text-gray-400 hidden md:block">
      @{username}
    </h4>
  )
}

type FullNameProps = {
  firstName: string | null | undefined
  lastName: string | null | undefined
}

function PlayerFullName({
  firstName,
  lastName,
}: FullNameProps) {
  return (
    <h2 className="text-lg md:text-2xl">
      {firstName ?? ""} {lastName ?? ""}
    </h2>
  )
}

type PlayerChosenStrengthProps = {
  goUsers: GoUsers | null | undefined
}

function PlayerChosenStrength({
  goUsers,
}: PlayerChosenStrengthProps) {
  function getFirstStrength() {
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

  return (
    getStrength() && (
      <h3
        className={cn(
          "text-gray-600 text-lg md:text-2xl",
          getStrengthColor(),
        )}
      >
        {getStrength()}
      </h3>
    )
  )
}

type GoUsersListProps = {
  goUsers: GoUsers | null | undefined
}

function GoUsersList({ goUsers }: GoUsersListProps) {
  if (!goUsers) return

  function getGoUsersBadges() {
    const gu = goUsers!
    return Object.values(gu).map(
      (g) =>
        `${g?.username ?? ""} ${g?.strength ?? ""} ${g?.server ?? ""}`,
    )
  }

  return (
    <div>
      <BadgeList
        label="Usuários em Servidores"
        badges={getGoUsersBadges()}
      />
    </div>
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
