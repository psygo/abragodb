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

export const LANGUAGE_OPTIONS: Option[] = stringsToOptions([
  "Português",
  "Inglês",
  "Espanhol",
  "Francês",
])

export const COUNTRY_OPTIONS: Option[] = stringsToOptions([
  "🇧🇷 Brasil",
  "🇦🇷 Argentina",
])

export const profileFormValidationSchema = z.object({
  first_name: z.string().optional().nullish(),
  last_name: z.string().optional().nullish(),
  public_email: z
    .string()
    .email("Este email é inválido.")
    .optional()
    .nullish(),
  date_of_birth: z.date(),
  description: z.string().optional().nullish(),
  languages: z.array(optionSchema),
  nationalities: z.array(optionSchema),
})

export type ProfileFormValidation = z.infer<
  typeof profileFormValidationSchema
>
