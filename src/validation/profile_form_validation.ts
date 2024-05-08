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
  br_states_of_origin: z.array(optionSchema),
})

export type ProfileFormValidation = z.infer<
  typeof profileFormValidationSchema
>

export const LANGUAGE_OPTIONS: Option[] = stringsToOptions([
  "Português",
  "Inglês",
  "Espanhol",
  "Alemão",
  "Chinês",
  "Coreano",
  "Francês",
  "Italiano",
  "Japonês",
])

export const COUNTRY_OPTIONS: Option[] = stringsToOptions([
  "🇧🇷 Brasil",
  "🇦🇷 Argentina",
])

export function brStatesToOptions(
  states: BR_STATE[],
): Option[] {
  return states.map((st) => {
    return BR_STATE_OPTIONS.find((brs) => brs.value === st)!
  })
}

export const BR_STATE_OPTIONS: Option[] = [
  { value: "AC", label: "Acre" },
  { value: "AL", label: "Alagoas" },
  { value: "AP", label: "Amapá" },
  { value: "AM", label: "Amazonas" },
  { value: "BA", label: "Bahia" },
  { value: "CE", label: "Ceará" },
  { value: "DF", label: "Distrito Federal" },
  { value: "ES", label: "Espírito Santo" },
  { value: "GO", label: "Goiás" },
  { value: "MA", label: "Maranhão" },
  { value: "MT", label: "Mato Grosso" },
  { value: "MS", label: "Mato Grosso do Sul" },
  { value: "MG", label: "Minas Gerais" },
  { value: "PA", label: "Pará" },
  { value: "PB", label: "Paraíba" },
  { value: "PR", label: "Paraná" },
  { value: "PE", label: "Pernambuco" },
  { value: "PI", label: "Piauí" },
  { value: "RJ", label: "Rio de Janeiro" },
  { value: "RN", label: "Rio Grande do Norte" },
  { value: "RS", label: "Rio Grande do Sul" },
  { value: "RO", label: "Rondônia" },
  { value: "RR", label: "Roraima" },
  { value: "SC", label: "Santa Catarina" },
  { value: "SP", label: "São Paulo" },
  { value: "SE", label: "Sergipe" },
  { value: "TO", label: "Tocantins" },
]

export type BR_STATE =
  | "AC"
  | "AL"
  | "AP"
  | "AM"
  | "BA"
  | "CE"
  | "DF"
  | "ES"
  | "GO"
  | "MA"
  | "MT"
  | "MS"
  | "MG"
  | "PA"
  | "PB"
  | "PR"
  | "PE"
  | "PI"
  | "RJ"
  | "RN"
  | "RS"
  | "RO"
  | "RR"
  | "SC"
  | "SP"
  | "SE"
  | "TO"
