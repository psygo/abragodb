import { z } from "zod"

import { optionSchema } from "@types"

//----------------------------------------------------------

export const socialsLinksSchema = z
  .record(z.string(), z.string().optional())
  .optional()

export type SocialsLinks = z.infer<
  typeof socialsLinksSchema
>

//----------------------------------------------------------

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

//----------------------------------------------------------

export const profileFormValidationSchema = z.object({
  border_color: z.string().optional().nullish(),
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
