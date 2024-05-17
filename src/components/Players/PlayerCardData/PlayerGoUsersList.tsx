import "@utils/array"

import { type GoUsers } from "@validation"

import { BadgeList } from "../../common/exports"

type PlayerGoUsersListProps = {
  goUsers: GoUsers | null | undefined
}

export function PlayerGoUsersList({
  goUsers,
}: PlayerGoUsersListProps) {
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
