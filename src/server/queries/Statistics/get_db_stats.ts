import e from "@schema"

export const selectStatistics = e.select({
  total_players: e.count(e.Player),
})
