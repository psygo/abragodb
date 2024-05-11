import e from "@/../dbschema/edgeql-js"

export const selectStatistics = e.select({
  total_players: e.count(e.Player),
})
