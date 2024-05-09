"use client"

import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

import { useParams, useRouter } from "next/navigation"

import { CalendarIcon, Plus } from "lucide-react"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { updatePlayerProfile } from "@actions"

import {
  BR_STATE_OPTIONS,
  COUNTRY_OPTIONS,
  LANGUAGE_OPTIONS,
  profileFormValidationSchema,
  type ProfileFormValidation,
} from "@validation"

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
  MultipleSelector,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Textarea,
} from "@shad"

import { cn } from "@styles"
import { useState } from "react"

type ProfileFormProps = {
  initialValues?: ProfileFormValidation
}

export function ProfileForm({
  initialValues,
}: ProfileFormProps) {
  const profileForm = useForm<ProfileFormValidation>({
    resolver: zodResolver(profileFormValidationSchema),
    defaultValues: initialValues,
  })

  const router = useRouter()

  const params = useParams()
  const username = params.username as string

  async function onSubmit(values: ProfileFormValidation) {
    await updatePlayerProfile(username, values)
    router.refresh()
  }

  const [totalUsers, setTotalUsers] = useState(
    Object.values(initialValues?.go_users ?? {}).length,
  )

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
                    {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                    {/* @ts-ignore */}
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
                    {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                    {/* @ts-ignore */}
                    <Input placeholder="Silva" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={profileForm.control}
              name="public_email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="ml-3">
                    Email de Contato
                  </FormLabel>
                  <FormControl>
                    {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                    {/* @ts-ignore */}
                    <Input
                      placeholder="joao.silva@mail.com.br"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
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
                        selected={field.value}
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
                    {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                    {/* @ts-ignore */}
                    <Textarea
                      placeholder="Uma breve descrição sua..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </fieldset>

          <fieldset className="grid grid-cols-6 gap-x-2 gap-y-3">
            <legend className="ml-3 mb-2 text-lg font-bold col-span-2">
              2. Línguas, Nacionalidades e Localizações
            </legend>

            <FormField
              name="languages"
              control={profileForm.control}
              render={({ field }) => {
                return (
                  <FormItem className="col-span-3">
                    <FormLabel className="ml-3">
                      Idioma(s)
                    </FormLabel>
                    <FormControl>
                      <MultipleSelector
                        value={field.value}
                        onChange={field.onChange}
                        defaultOptions={LANGUAGE_OPTIONS}
                        placeholder="Selecione sua(s) língua(s)"
                        hidePlaceholderWhenSelected
                        emptyIndicator={
                          <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                            Nenhum resultado encontrado
                          </p>
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
            <FormField
              name="nationalities"
              control={profileForm.control}
              render={({ field }) => {
                return (
                  <FormItem className="col-span-3">
                    <FormLabel className="ml-3">
                      Nacionalidade(s)
                    </FormLabel>
                    <FormControl>
                      <MultipleSelector
                        value={field.value}
                        onChange={field.onChange}
                        defaultOptions={COUNTRY_OPTIONS}
                        placeholder="Selecione sua(s) nacionalidade(s)"
                        hidePlaceholderWhenSelected
                        emptyIndicator={
                          <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                            Nenhum resultado encontrado
                          </p>
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
            <FormField
              name="br_states_of_origin"
              control={profileForm.control}
              render={({ field }) => {
                return (
                  <FormItem className="col-span-3">
                    <FormLabel className="ml-3">
                      Estado(s) Brasileiro(s) de Origem
                    </FormLabel>
                    <FormControl>
                      <MultipleSelector
                        value={field.value}
                        onChange={field.onChange}
                        defaultOptions={BR_STATE_OPTIONS}
                        placeholder="Selecione seu(s) estado(s)"
                        hidePlaceholderWhenSelected
                        emptyIndicator={
                          <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                            Nenhum resultado encontrado
                          </p>
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
            <FormField
              name="cities_of_origin"
              control={profileForm.control}
              render={({ field }) => {
                return (
                  <FormItem className="col-span-3">
                    <FormLabel className="ml-3">
                      Cidade(s) de Origem
                    </FormLabel>
                    <FormControl>
                      <MultipleSelector
                        value={field.value}
                        onChange={field.onChange}
                        defaultOptions={[]}
                        creatable
                        placeholder="Selecione seu(s) estado(s)"
                        hidePlaceholderWhenSelected
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
            <FormField
              name="countries_of_residence"
              control={profileForm.control}
              render={({ field }) => {
                return (
                  <FormItem className="col-span-3">
                    <FormLabel className="ml-3">
                      Paíse(s) de Residência
                    </FormLabel>
                    <FormControl>
                      <MultipleSelector
                        value={field.value}
                        onChange={field.onChange}
                        defaultOptions={COUNTRY_OPTIONS}
                        placeholder="Selecione seu(s) países de residência"
                        hidePlaceholderWhenSelected
                        emptyIndicator={
                          <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                            Nenhum resultado encontrado
                          </p>
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
          </fieldset>

          <fieldset className="grid grid-cols-12 gap-x-2 gap-y-3 items-end">
            <legend className="ml-3 mb-2 text-lg font-bold col-span-2">
              3. Usuários em Servidores de Go
            </legend>

            {Array.from(Array(totalUsers + 1), (e, i) => {
              const key = `user${i}`
              return (
                <>
                  <FormItem className="col-span-3">
                    <FormLabel className="ml-3">
                      Servidor - {i}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="OGS"
                        value={
                          profileForm.getValues(
                            "go_users",
                          )?.[key]?.server ?? ""
                        }
                        onChange={(e) => {
                          const currentUsers =
                            profileForm.getValues(
                              "go_users",
                            )
                          const newGoUsers = {
                            ...currentUsers,
                          }
                          newGoUsers[key] = {
                            ...currentUsers?.user1,
                            server: e.target.value,
                          }
                          profileForm.setValue(
                            "go_users",
                            newGoUsers,
                          )
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                  <FormItem className="col-span-5">
                    <FormLabel className="ml-3">
                      Nome
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="usuário" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                  <FormItem className="col-span-3">
                    <FormLabel className="ml-3">
                      Força
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="10k" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                  {i === totalUsers && (
                    <Button
                      className="col-span-1"
                      onClick={() =>
                        setTotalUsers(totalUsers + 1)
                      }
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  )}
                </>
              )
            })}
          </fieldset>

          <fieldset className="grid grid-cols-6 gap-x-2 gap-y-3">
            <legend className="ml-3 mb-2 text-lg font-bold col-span-2">
              4. Redes Sociais e Outros Links
            </legend>

            <FormField
              control={profileForm.control}
              name="socials_links.facebook"
              render={({ field }) => {
                return (
                  <FormItem className="col-span-6">
                    <FormLabel className="ml-3">
                      Facebook
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="url"
                        placeholder="https://facebook.com/joao.silva"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
            <FormField
              control={profileForm.control}
              name="socials_links.instagram"
              render={({ field }) => {
                return (
                  <FormItem className="col-span-6">
                    <FormLabel className="ml-3">
                      Instagram
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="url"
                        placeholder="https://instagram.com/joao.silva"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
            <FormField
              control={profileForm.control}
              name="socials_links.twitch"
              render={({ field }) => {
                return (
                  <FormItem className="col-span-6">
                    <FormLabel className="ml-3">
                      Twitch
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="url"
                        placeholder="https://twitch.tv/joao.silva"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
            <FormField
              control={profileForm.control}
              name="socials_links.youtube"
              render={({ field }) => {
                return (
                  <FormItem className="col-span-6">
                    <FormLabel className="ml-3">
                      YouTube
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="url"
                        placeholder="https://youtube.com/@joao.silva"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
            <FormField
              control={profileForm.control}
              name="socials_links.personal"
              render={({ field }) => {
                return (
                  <FormItem className="col-span-6">
                    <FormLabel className="ml-3">
                      Pessoal
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="url"
                        placeholder="https://meublog.com.br"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
          </fieldset>

          <div className="w-full flex justify-end">
            <Button className="w-max" type="submit">
              Salvar
            </Button>
          </div>
        </form>
      </Form>
    </>
  )
}
