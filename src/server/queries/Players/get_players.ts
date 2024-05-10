import e, { type $infer } from "@@/dbschema/edgeql-js"

export const selectPlayers = e.select(e.Player, () => ({
  nanoid: true,
  username: true,
  email: true,
}))

export type Players = $infer<typeof selectPlayers>
