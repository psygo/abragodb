import { z } from "zod"

export const profileFormValidationSchema = z.object({
  // languages: z
  //   .array(z.string())
  //   .optional()
  //   .nullish()
  //   .transform((v) => v ?? []),
  first_name: z.string().optional().nullish(),
  last_name: z.string().optional().nullish(),
  public_email: z
    .string()
    .email("Este email é inválido.")
    .optional()
    .nullish(),
  date_of_birth: z.date(),
  description: z.string().optional().nullish(),
})

export type ProfileFormValidation = z.infer<
  typeof profileFormValidationSchema
>
