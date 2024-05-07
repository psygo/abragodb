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

const profileFormValidationSchema = z.object({
  first_name: z.string(),
})

type ProfileFormValidation = z.infer<
  typeof profileFormValidationSchema
>

export function ProfileForm() {
  const profileForm = useForm<ProfileFormValidation>({
    resolver: zodResolver(profileFormValidationSchema),
  })

  function onSubmit(values: ProfileFormValidation) {
    console.log("submit")
  }

  return (
    <>
      <h2 className="mt-6">Edite o Seu Perfil</h2>
      <form></form>

      <Form {...profileForm}>
        <form
          onSubmit={profileForm.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <FormField
            control={profileForm.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder="Nome" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Salvar</Button>
        </form>
      </Form>
    </>
  )
}
