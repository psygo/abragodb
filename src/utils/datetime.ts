import { type LocalDate } from "edgedb"

export function localDateToDate(
  ld: LocalDate | null | undefined,
) {
  if (!ld) return new Date()

  const d = new Date(ld.toString())
  d.setDate(d.getDate() + 1)
  return d
}
