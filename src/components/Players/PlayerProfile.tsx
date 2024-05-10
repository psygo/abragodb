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
import { faMars } from "@fortawesome/free-solid-svg-icons"

import { localDateToDate } from "@utils"

import { type Username } from "@types"

import {
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
  Separator,
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

  function getMaxStrength() {
    const goUsers = player?.profile?.go_users as GoUsers
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
    const dateOfBirth = player?.profile?.date_of_birth
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
              <h2 className="flex gap-2 text-2xl font-extrabold">
                <span>{player.profile?.first_name}</span>
                <span>{player.profile?.last_name}</span>
                <span className="text-gray-600">
                  {getMaxStrength()}
                </span>
              </h2>

              <div className="flex gap-2 items-center">
                <FontAwesomeIcon
                  className="h-[15px] w-[15px] mb-[1px]"
                  color="gray"
                  icon={faMars}
                />
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
          <Separator />

          <div className="flex gap-1 items-center">
            {player.profile?.languages?.map((l, i) => (
              <Badge key={i}>{l}</Badge>
            ))}
            <p className="text-gray-400 text-sm">Idiomas</p>
          </div>
          <div className="flex gap-1 items-center">
            {player.profile?.nationalities?.map((n, i) => (
              <Badge key={i}>{n}</Badge>
            ))}
            <p className="text-gray-400 text-sm">
              Nacionalidades
            </p>
          </div>

          <Separator />

          <div className="flex flex-col gap-2">
            <p className="text-gray-500 text-sm">
              Descrição
            </p>
            <p className="text-[0.95rem]">
              {player.profile?.description}
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
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
