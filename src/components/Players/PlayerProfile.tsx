import e, { type $infer } from "@@/dbschema/edgeql-js"

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

import { type Username } from "@types"

import {
  brStatesToOptions,
  goStrength,
  type GoUsers,
  type SocialsLinks,
} from "@validation"

import {
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@shad"

import { PlayerAvatar } from "./PlayerAvatar"

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

  const profile = player.profile

  function getMaxStrength() {
    const goUsers = profile?.go_users as GoUsers
    if (!goUsers) return ""

    const strengths = Object.values({ ...goUsers })
    if (strengths.length === 0) return ""

    const maxStrength = strengths
      .map((u) => {
        return {
          ...goStrength.find(
            (gs) => gs.kyu_dan === u.strength,
          )!,
          server: u.server,
        }
      })
      .first()

    return `${maxStrength.kyu_dan} ${maxStrength.server}`
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

  return (
    <section>
      <Card>
        <CardHeader className="p-3">
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
                <h3 className="text-gray-600">
                  {getMaxStrength()}
                </h3>
                <h4 className="ml-2 text-lg text-gray-400">
                  @{player.username}
                </h4>
              </div>

              <div className="flex gap-2 items-center">
                <PlayerSex sex={profile.sex} />
                <p className="text-[1rem] text-gray-500">
                  {getAge()}
                </p>
                <a
                  href={`mailto:${player.profile?.public_email}`}
                  className="text-[1rem] text-gray-500"
                >
                  {player.profile?.public_email}
                </a>
                <PlayerSocials
                  socialsLinks={
                    player.profile
                      ?.socials_links as SocialsLinks
                  }
                />
              </div>
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

          <div className="flex flex-col gap-2 pl-1">
            <p className="text-gray-400 text-xs">
              Descrição
            </p>
            <p className="text-[0.95rem]">
              {profile?.description}
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
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

type BadgeListProps = {
  label: string
  badges: string[] | undefined | null
}

function BadgeList({ label, badges }: BadgeListProps) {
  if (!badges || badges.length === 0) return

  return (
    <div className="flex flex-col gap-1">
      <p className="text-gray-400 text-xs ml-1">{label}</p>
      <div className="flex gap-1 items-center">
        {badges.map((n, i) => (
          <Badge variant="outline" key={i}>
            {n}
          </Badge>
        ))}
      </div>
    </div>
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
