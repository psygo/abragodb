import e, { type $infer } from "@@/dbschema/edgeql-js"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMars } from "@fortawesome/free-solid-svg-icons"

import { localDateToDate } from "@utils"

import { type Username } from "@types"

import { type GoUsers, goStrength } from "@validation"

import {
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
            <div className="flex flex-col gap-[6px]">
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
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>{player.profile?.description}</p>
        </CardContent>
      </Card>
    </section>
  )
}
