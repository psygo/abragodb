import { z } from "zod"

import { goUsersSchema, optionSchema } from "@types"

//----------------------------------------------------------

export const socialsLinksSchema = z
  .record(z.string(), z.string().optional())
  .optional()

export type SocialsLinks = z.infer<
  typeof socialsLinksSchema
>

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
  declared_elo: z.number().int().optional().nullish(),
})

export type ProfileFormValidation = z.infer<
  typeof profileFormValidationSchema
>

//----------------------------------------------------------
