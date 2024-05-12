import { type LocalDate } from "edgedb"

export function localDateToDate(ld: LocalDate) {
  const d = new Date(ld.toString())
  d.setDate(d.getDate() + 1)
  return d
}
