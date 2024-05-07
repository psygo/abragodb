"use client"

import { z } from "zod"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@shad"
import { updatePlayerProfile } from "../../server/actions/Players/update_players"
import { useParams, useRouter } from "next/navigation"

const profileFormValidationSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
})

type ProfileFormValidation = z.infer<
  typeof profileFormValidationSchema
>

export function ProfileForm() {
  const profileForm = useForm<ProfileFormValidation>({
    resolver: zodResolver(profileFormValidationSchema),
  })

  const router = useRouter()

  const params = useParams()
  const username = params.username as string

  async function onSubmit(values: ProfileFormValidation) {
    await updatePlayerProfile(
      username,
      values.first_name,
      values.last_name,
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
          <Button
            className="w-max col-span-2"
            type="submit"
          >
            Salvar
          </Button>
        </form>
      </Form>
    </>
  )
}
