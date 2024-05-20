import "@utils/array"

import { getFirstStrength, type GoUsers } from "@types"

import { cn } from "@styles"

type PlayerChosenStrengthProps = {
  goUsers: GoUsers | null | undefined
}

export function PlayerChosenStrength({
  goUsers,
}: PlayerChosenStrengthProps) {
  function getStrengthColor() {
    const firstStrength = getFirstStrength(goUsers)
    if (!firstStrength) return "gray"

    if (firstStrength.kyu_dan.length === 3)
      return "text-blue-800 dark:text-blue-500"
    else if (firstStrength.kyu_dan.includes("k"))
      return "text-green-800 dark:text-green-600"
    else if (firstStrength.kyu_dan.includes("d"))
      return "text-orange-800 dark:text-orange-600"
    else return "gray"
  }

  function getStrength() {
    const firstStrength = getFirstStrength(goUsers)
    if (!firstStrength?.kyu_dan || !firstStrength?.server)
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
