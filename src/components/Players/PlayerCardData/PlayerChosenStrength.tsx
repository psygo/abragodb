import "@utils/array"

import { goStrength } from "@types"

import { type GoUsers } from "@validation"

import { cn } from "@styles"

type PlayerChosenStrengthProps = {
  goUsers: GoUsers | null | undefined
}

export function PlayerChosenStrength({
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
      return "text-green-800 dark:text-green-600"
    else if (firstStrength.kyu_dan.includes("d"))
      return "text-orange-800 dark:text-orange-600"
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
          "text-gray-600 text-lg md:text-lg",
          getStrengthColor(),
        )}
      >
        {getStrength()}
      </h3>
    )
  )
}
