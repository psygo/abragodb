import { z } from "zod"

import { type Option } from "@shad"

export const optionSchema = z.object({
  label: z.string(),
  value: z.string(),
  disable: z.boolean().optional(),
})

export function stringsToOptions(
  strings: string[] | null | undefined,
): Option[] {
  if (!strings) return []
  return strings.map((s) => ({ label: s, value: s }))
}
