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

export const socialsLinksSchema = z
  .record(z.string(), z.string().optional())
  .optional()

export type SocialsLinks = z.infer<
  typeof socialsLinksSchema
>

export const goUsersSchema = z
  .record(
    z.string(),
    z.object({
      server: z.string().optional(),
      username: z.string().optional(),
      strength: z.string().optional(),
    }),
  )
  .optional()

export type GoUsers = z.infer<typeof goUsersSchema>

export const profileFormValidationSchema = z.object({
  is_public: z.boolean().optional().default(false),

  first_name: z.string().optional().nullish(),
  last_name: z.string().optional().nullish(),
  public_email: z
    .string()
    .email("Este email é inválido.")
    .optional()
    .nullish(),
  sex: z.string().optional(),
  date_of_birth: z.date(),
  description: z.string().optional().nullish(),

  languages: z.array(optionSchema),

  nationalities: z.array(optionSchema),
  br_states_of_origin: z.array(optionSchema),
  cities_of_origin: z.array(optionSchema),

  countries_of_residence: z.array(optionSchema),
  br_states_of_residence: z.array(optionSchema),
  cities_of_residence: z.array(optionSchema),

  socials_links: socialsLinksSchema,

  go_users: goUsersSchema,
})

export type ProfileFormValidation = z.infer<
  typeof profileFormValidationSchema
>

//----------------------------------------------------------
// Languages

export const LANGUAGE_OPTIONS: Option[] = stringsToOptions([
  "Português",
  "Inglês",
  "Espanhol",
  "Alemão",
  "Coreano",
  "Francês",
  "Holandês",
  "Indiano",
  "Italiano",
  "Japonês",
  "Mandarim",
  "Russo",
  "Turco",
  "Vietnamita",
])

//----------------------------------------------------------
// Countries

export const COUNTRY_OPTIONS: Option[] = stringsToOptions([
  "🇧🇷 Brasil",
  "Alemanha",
  "🇦🇷 Argentina",
  "Aruba",
  "Austrália",
  "Áustria",
  "Azerbaijão",
  "Bahamas",
  "Bangladesh",
  "Barbados",
  "Bélgica",
  "Belize",
  "Bielorússia",
  "Bolívia",
  "Bulgária",
  "Canadá",
  "Chile",
  "China",
  "Colômbia",
  "Coreia do Sul",
  "Costa Rica",
  "Croácia",
  "Cuba",
  "Dinamarca",
  "El Salvador",
  "Equador",
  "Escócia",
  "Eslováquia",
  "Espanha",
  "Finlândia",
  "França",
  "Grécia",
  "Guadalupe",
  "Guatemala",
  "Guiana",
  "Guiana Francesa",
  "Haiti",
  "Holanda",
  "Honduras",
  "Hungria",
  "Índia",
  "Indonésia",
  "Inglaterra",
  "Irlanda",
  "Irlanda do Norte",
  "Itália",
  "Jamaica",
  "Japão",
  "Estados Unidos",
  "Martinica",
  "México",
  "Nicarágua",
  "Noruega",
  "Nova Zelândia",
  "Panamá",
  "Paquistão",
  "Paraguai",
  "País de Gales",
  "Peru",
  "Porto Rico",
  "Portugal",
  "Polônia",
  "Reino Unido",
  "República Dominicana",
  "República Tcheca",
  "Romênia",
  "Rússia",
  "Sérvia",
  "Suécia",
  "Suíça",
  "Suriname",
  "Taiwan",
  "Trinidade e Tobago",
  "Turquia",
  "Ucrânia",
  "Uruaguai",
  "Venezuela",
  "Vietnã",
])

//----------------------------------------------------------
// Brazilian States

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

//----------------------------------------------------------
// Go Strength

export const goServers = [
  "OGS",
  "KGS",
  "Fox Weiqi",
  "Tygem",
  "WBaduk",
  "Pandanet",
  "Fly or Die",
]

//----------------------------------------------------------
// Go Strength

export type GoStrength = {
  kyu_dan: string
  elo: number
}

export const goStrength: GoStrength[] = [
  { kyu_dan: "30k", elo: -900 },
  { kyu_dan: "29k", elo: -800 },
  { kyu_dan: "28k", elo: -700 },
  { kyu_dan: "27k", elo: -600 },
  { kyu_dan: "26k", elo: -500 },
  { kyu_dan: "25k", elo: -400 },
  { kyu_dan: "24k", elo: -300 },
  { kyu_dan: "23k", elo: -200 },
  { kyu_dan: "22k", elo: -100 },
  { kyu_dan: "21k", elo: 0 },
  { kyu_dan: "20k", elo: 100 },
  { kyu_dan: "19k", elo: 200 },
  { kyu_dan: "18k", elo: 300 },
  { kyu_dan: "17k", elo: 400 },
  { kyu_dan: "16k", elo: 500 },
  { kyu_dan: "15k", elo: 600 },
  { kyu_dan: "14k", elo: 700 },
  { kyu_dan: "13k", elo: 800 },
  { kyu_dan: "12k", elo: 900 },
  { kyu_dan: "11k", elo: 1000 },
  { kyu_dan: "10k", elo: 1100 },
  { kyu_dan: "9k", elo: 1200 },
  { kyu_dan: "8k", elo: 1300 },
  { kyu_dan: "7k", elo: 1400 },
  { kyu_dan: "6k", elo: 1500 },
  { kyu_dan: "5k", elo: 1600 },
  { kyu_dan: "4k", elo: 1700 },
  { kyu_dan: "3k", elo: 1800 },
  { kyu_dan: "2k", elo: 1900 },
  { kyu_dan: "1k", elo: 2000 },
  { kyu_dan: "1d", elo: 2100 },
  { kyu_dan: "2d", elo: 2200 },
  { kyu_dan: "3d", elo: 2300 },
  { kyu_dan: "4d", elo: 2400 },
  { kyu_dan: "5d", elo: 2500 },
  { kyu_dan: "6d", elo: 2600 },
  { kyu_dan: "7d", elo: 2700 },
  { kyu_dan: "8d", elo: 2710 },
  { kyu_dan: "9d", elo: 2720 },
  { kyu_dan: "1p", elo: 2730 },
  { kyu_dan: "2p", elo: 2760 },
  { kyu_dan: "3p", elo: 2790 },
  { kyu_dan: "4p", elo: 2820 },
  { kyu_dan: "5p", elo: 2850 },
  { kyu_dan: "6p", elo: 2880 },
  { kyu_dan: "7p", elo: 2890 },
  { kyu_dan: "8p", elo: 2920 },
  { kyu_dan: "9p", elo: 2950 },
]

//----------------------------------------------------------
