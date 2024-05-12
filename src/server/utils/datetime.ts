import { LocalDate } from "edgedb"

export function dateToLocalDate(d: Date) {
  return new LocalDate(
    d.getFullYear(),
    d.getMonth() + 1,
    d.getDate(),
  )
}
