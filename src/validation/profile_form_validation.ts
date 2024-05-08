import { z } from "zod"

export const profileFormValidationSchema = z.object({
  // languages: z
  //   .array(z.string())
  //   .optional()
  //   .nullish()
  //   .transform((v) => v ?? []),
  first_name: z.string().optional().nullish(),
  last_name: z.string().optional().nullish(),
  // .transform((v) => v ?? ""),
  // last_name: z
  //   .string()
  //   .optional()
  //   .nullish()
  //   .transform((v) => v ?? ""),
  public_email: z
    .string()
    .email("Este email é inválido.")
    .optional()
    .nullish(),
  // date_of_birth: z
  //   .date()
  //   .optional()
  //   .nullish()
  //   .transform((v) => v ?? new Date()),
  // .transform((v) => {
  //   const d = typeof v === "string" ? new Date(v) : v

  //   return d
  //     ? new LocalDate(
  //         d.getUTCFullYear(),
  //         d.getUTCMonth() + 1,
  //         d.getUTCDate(),
  //       )
  //     : new LocalDate(1999, 1, 1)
  // }),
  description: z.string().optional().nullish(),
})

export type ProfileFormValidation = z.infer<
  typeof profileFormValidationSchema
>
