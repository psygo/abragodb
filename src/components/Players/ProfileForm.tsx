"use client"

import { z } from "zod"

import { useParams, useRouter } from "next/navigation"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { updatePlayerProfile } from "@actions"

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Textarea,
} from "@shad"

const profileFormValidationSchema = z.object({
  first_name: z
    .string()
    .optional()
    .nullish()
    .transform((v) => v ?? ""),
  last_name: z
    .string()
    .optional()
    .nullish()
    .transform((v) => v ?? ""),
  description: z
    .string()
    .optional()
    .nullish()
    .transform((v) => v ?? ""),
})

type Nullable<T> = { [K in keyof T]: T[K] | null }

type ProfileFormValidation = z.infer<
  typeof profileFormValidationSchema
>

type ProfileFormProps = {
  initialValues:
    | (Nullable<ProfileFormValidation> & { id: never })
    | null
}

export function ProfileForm({
  initialValues,
}: ProfileFormProps) {
  const profileForm = useForm<ProfileFormValidation>({
    resolver: zodResolver(profileFormValidationSchema),
    defaultValues:
      profileFormValidationSchema.parse(initialValues),
  })

  const router = useRouter()

  const params = useParams()
  const username = params.username as string

  async function onSubmit(values: ProfileFormValidation) {
    await updatePlayerProfile(
      username,
      values.first_name,
      values.last_name,
      values.description,
    )
    router.refresh()
  }

  return (
    <>
      <h2 className="mt-6">Edite o Seu Perfil</h2>

      <Form {...profileForm}>
        <form
          onSubmit={profileForm.handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-x-2 gap-y-3"
        >
          <FormField
            control={profileForm.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="ml-3">Nome</FormLabel>
                <FormControl>
                  <Input placeholder="João" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={profileForm.control}
            name="last_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="ml-3">
                  Sobrenome
                </FormLabel>
                <FormControl>
                  <Input placeholder="Silva" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="description"
            control={profileForm.control}
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel className="ml-3">
                  Descrição
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Uma breve descrição sua..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="mt-4 w-max col-span-2"
            type="submit"
          >
            Salvar
          </Button>
        </form>
      </Form>
    </>
  )
}
