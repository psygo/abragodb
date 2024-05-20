import { z } from "zod"

import "@utils/array"

export enum Go_Servers {
  OGS = "OGS",
  KGS = "KGS",
  Fox = "Fox Weiqi",
  Tygem = "Tygem",
  WBaduk = "WBaduk",
  Pandanet = "Pandanet",
  FlyOrDie = "Fly or Die",
}

export function stringToGoServer(s: string) {
  return Object.values(Go_Servers).find(
    (t) => t.toString() === s,
  )!
}

export type GoStrength = {
  kyu_dan: string
  elo: number
}

export const goUsersSchema = z
  .record(
    z.string(),
    z.object({
      server: z.nativeEnum(Go_Servers).optional(),
      username: z.string().optional(),
      strength: z.string().optional(),
    }),
  )
  .optional()

export type GoUsers = z.infer<typeof goUsersSchema>

export function getFirstStrength(
  goUsers: GoUsers | null | undefined,
) {
  if (!goUsers) return

  const strengths = Object.values({ ...goUsers })
  if (strengths.length === 0) return

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

export function normalizeElo(
  server: Go_Servers | null | undefined,
  elo: number | null | undefined,
) {
  if (!server || !elo) return null

  switch (server) {
    case Go_Servers.OGS:
      return elo + 100
    case Go_Servers.Fox:
      return elo + 300
    case Go_Servers.Tygem:
      return elo - 300
    case Go_Servers.WBaduk:
      return elo - 300
    case Go_Servers.Pandanet:
      return elo - 200
    case Go_Servers.FlyOrDie:
      return elo - 400
    default:
      return elo
  }
}

export const goStrength: GoStrength[] = [
  { kyu_dan: "30k", elo: -900 },
  { kyu_dan: "29k", elo: -800 },
  { kyu_dan: "28k", elo: -700 },
  { kyu_dan: "27k", elo: -600 },
  { kyu_dan: "26k", elo: -500 },
  { kyu_dan: "25k", elo: -400 },
  { kyu_dan: "24k", elo: -300 },
  { kyu_dan: "23k", elo: -200 },
  { kyu_dan: "22k", elo: -100 },
  { kyu_dan: "21k", elo: 0 },
  { kyu_dan: "20k", elo: 100 },
  { kyu_dan: "19k", elo: 200 },
  { kyu_dan: "18k", elo: 300 },
  { kyu_dan: "17k", elo: 400 },
  { kyu_dan: "16k", elo: 500 },
  { kyu_dan: "15k", elo: 600 },
  { kyu_dan: "14k", elo: 700 },
  { kyu_dan: "13k", elo: 800 },
  { kyu_dan: "12k", elo: 900 },
  { kyu_dan: "11k", elo: 1000 },
  { kyu_dan: "10k", elo: 1100 },
  { kyu_dan: "9k", elo: 1200 },
  { kyu_dan: "8k", elo: 1300 },
  { kyu_dan: "7k", elo: 1400 },
  { kyu_dan: "6k", elo: 1500 },
  { kyu_dan: "5k", elo: 1600 },
  { kyu_dan: "4k", elo: 1700 },
  { kyu_dan: "3k", elo: 1800 },
  { kyu_dan: "2k", elo: 1900 },
  { kyu_dan: "1k", elo: 2000 },
  { kyu_dan: "1d", elo: 2100 },
  { kyu_dan: "2d", elo: 2200 },
  { kyu_dan: "3d", elo: 2300 },
  { kyu_dan: "4d", elo: 2400 },
  { kyu_dan: "5d", elo: 2500 },
  { kyu_dan: "6d", elo: 2600 },
  { kyu_dan: "7d", elo: 2700 },
  { kyu_dan: "8d", elo: 2710 },
  { kyu_dan: "9d", elo: 2720 },
  { kyu_dan: "1p", elo: 2730 },
  { kyu_dan: "2p", elo: 2760 },
  { kyu_dan: "3p", elo: 2790 },
  { kyu_dan: "4p", elo: 2820 },
  { kyu_dan: "5p", elo: 2850 },
  { kyu_dan: "6p", elo: 2880 },
  { kyu_dan: "7p", elo: 2890 },
  { kyu_dan: "8p", elo: 2920 },
  { kyu_dan: "9p", elo: 2950 },
]
