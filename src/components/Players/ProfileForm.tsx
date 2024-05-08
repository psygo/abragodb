"use client"

import { LocalDate } from "edgedb"

import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

import { z } from "zod"

import { useParams, useRouter } from "next/navigation"

import { CalendarIcon } from "lucide-react"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { updatePlayerProfile } from "@actions"

import {
  Button,
  Calendar,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Textarea,
} from "@shad"

import { cn } from "@styles"

import { MultipleSelector, type Option } from "@shad"

const LANGUAGE_OPTIONS: Option[] = [
  { label: "portuguese", value: "Português" },
  { label: "english", value: "Inglês" },
  { label: "spanish", value: "Espanhol" },
  { label: "french", value: "Francês" },
]

const optionSchema = z.object({
  label: z.string(),
  value: z.string(),
  disable: z.boolean().optional(),
})

export const profileFormValidationSchema = z.object({
  // languages: z
  //   .array(z.string())
  //   .optional()
  //   .nullish()
  //   .transform((v) => v ?? []),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  // .transform((v) => v ?? ""),
  // last_name: z
  //   .string()
  //   .optional()
  //   .nullish()
  //   .transform((v) => v ?? ""),
  // public_email: z
  //   .string()
  //   // .email("must be an email")
  //   .optional()
  //   .nullish()
  //   .transform((v) => v ?? ""),
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
  // description: z
  //   .string()
  //   .optional()
  //   .nullish()
  //   .transform((v) => v ?? ""),
})

export type Nullable<T> = { [K in keyof T]: T[K] | null }

export type ProfileFormValidation = z.infer<
  typeof profileFormValidationSchema
>

type ProfileFormProps = {
  initialValues: ProfileFormValidation
  // | (Nullable<ProfileFormValidation> & { id: never })
  // | null
}

export function ProfileForm({
  initialValues,
}: ProfileFormProps) {
  const defaultValues =
    profileFormValidationSchema.parse(initialValues)
  // const defaultDateOfBirth = new LocalDate(
  //   defaultValues.date_of_birth.year,
  //   defaultValues.date_of_birth.month,
  //   defaultValues.date_of_birth.day + 1,
  // )

  const profileForm = useForm<ProfileFormValidation>({
    resolver: zodResolver(profileFormValidationSchema),
    defaultValues: defaultValues,
    // ? {
    //     ...defaultValues,
    //     date_of_birth: defaultDateOfBirth,
    //   }
    // : {},
  })

  const router = useRouter()

  const params = useParams()
  const username = params.username as string

  async function onSubmit(values: ProfileFormValidation) {
    await updatePlayerProfile(username, values)
    router.refresh()
  }

  return (
    <>
      <h2 className="mt-6">Edite Seu Perfil</h2>

      <Form {...profileForm}>
        <form
          onSubmit={profileForm.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <fieldset className="grid grid-cols-2 gap-x-2 gap-y-3">
            <legend className="ml-3 mb-2 text-lg font-bold col-span-2">
              1. Dados Pessoais
            </legend>
            <FormField
              control={profileForm.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="ml-3">
                    Nome
                  </FormLabel>
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
            {/* <FormField
              control={profileForm.control}
              name="public_email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="ml-3">
                    Email de Contato
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="joao.silva@mail.com.br"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            {/* <FormField
              control={profileForm.control}
              name="date_of_birth"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="ml-3 mb-[6px] mt-2">
                    Data de Nascimento
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "pl-3 text-left font-normal",
                            !field.value &&
                              "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            format(
                              field.value.toString(),
                              "PPP",
                              { locale: ptBR },
                            )
                          ) : (
                            <span>Escolha uma data</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto p-0"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={
                          new Date(field.value.toString())
                        }
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() ||
                          date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            {/* <FormField
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
            /> */}
          </fieldset>

          <fieldset className="grid grid-cols-2 gap-x-2 gap-y-3">
            <legend className="ml-3 mb-2 text-lg font-bold col-span-2">
              2. Línguas, Nacionalidades e Regiões
            </legend>

            {/* <FormField
              control={profileForm.control}
              name="languages"
              render={({ field }) => {
                function stringToLanguageOption(): Option[] {
                  const values = field.value
                  if (!values) return []

                  return values.map(
                    (v) =>
                      LANGUAGE_OPTIONS.find(
                        (l) => v === l.value,
                      )!,
                  )
                }

                return (
                  <FormItem>
                    <FormLabel>Frameworks</FormLabel>
                    <FormControl>
                      <MultipleSelector
                        value={stringToLanguageOption()}
                        onChange={field.onChange}
                        defaultOptions={LANGUAGE_OPTIONS}
                        placeholder="Select frameworks you like..."
                        emptyIndicator={
                          <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                            no results found.
                          </p>
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            /> */}
          </fieldset>

          <Button className="w-max" type="submit">
            Salvar
          </Button>
        </form>
      </Form>
    </>
  )
}
