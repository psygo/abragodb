import { LocalDate } from "edgedb"

export function localDateToDate(ld: LocalDate) {
  const d = new Date(ld.toString())
  d.setDate(d.getDate() + 1)
  return d
}

export function dateToLocalDate(d: Date) {
  return new LocalDate(
    d.getFullYear(),
    d.getMonth() + 1,
    d.getDate(),
  )
}
