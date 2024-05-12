"use client"

import { useUser as useClerkUser } from "@clerk/nextjs"

import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

import { useState } from "react"

import { useParams, useRouter } from "next/navigation"

import {
  CalendarIcon,
  Link,
  Plus,
  Trash2,
} from "lucide-react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faDiscord,
  faFacebook,
  faInstagram,
  faTwitch,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { type ClerkId } from "@types"

import { updatePlayerProfile } from "@actions"

import {
  BR_STATE_OPTIONS,
  COUNTRY_OPTIONS,
  type GoUsers,
  LANGUAGE_OPTIONS,
  profileFormValidationSchema,
  type ProfileFormValidation,
  goServers,
  goStrength,
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
  Textarea,
} from "@shad"

import { cn } from "@styles"

type ProfileFormProps = {
  clerkId: ClerkId
  initialValues?: ProfileFormValidation
}

export function ProfileForm({
  clerkId,
  initialValues,
}: ProfileFormProps) {
  const { isSignedIn, user } = useClerkUser()

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

  const [goUsers, setGoUsers] = useState<GoUsers>(
    initialValues?.go_users ?? {},
  )

  function totalUsers() {
    return Object.keys(goUsers ?? {}).length
  }

  function playerIsSignedInUser() {
    return isSignedIn && user.id === clerkId
  }

  if (!playerIsSignedInUser()) return

  return (
    <section>
      <h2 className="mt-6 ml-3 text-2xl font-bold">
        Edite Seu Perfil
      </h2>

      <Form {...profileForm}>
        <form
          onSubmit={profileForm.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <fieldset className="flex justify-end">
            <FormField
              control={profileForm.control}
              name="is_public"
              render={({ field }) => (
                <FormItem className="flex items-center gap-2 p-2">
                  <FormLabel className="text-base">
                    Público?
                  </FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </fieldset>

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
                    <Input
                      placeholder="João"
                      {...field}
                      value={field?.value ?? ""}
                    />
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
                    <Input
                      placeholder="Silva"
                      {...field}
                      value={field.value ?? ""}
                    />
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
                    <Input
                      placeholder="joao.silva@mail.com.br"
                      {...field}
                      value={field.value ?? ""}
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
                        captionLayout="dropdown-buttons"
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
              control={profileForm.control}
              name="sex"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="ml-3">
                    Sexo
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value ?? ""}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione seu sexo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {[
                        "Masculino",
                        "Feminino",
                        "Outro",
                      ].map((s, i) => (
                        <SelectItem key={i} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                      value={field.value ?? ""}
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
                  <FormItem className="col-span-6">
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
                  <FormItem className="col-span-6">
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
                        placeholder="Alagoas..."
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
                        placeholder="Belo Horizonte..."
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
                  <FormItem className="col-span-6">
                    <FormLabel className="ml-3">
                      País(es) de Residência
                    </FormLabel>
                    <FormControl>
                      <MultipleSelector
                        value={field.value}
                        onChange={field.onChange}
                        defaultOptions={COUNTRY_OPTIONS}
                        placeholder="Selecione suas nações de residência"
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
              name="br_states_of_residence"
              control={profileForm.control}
              render={({ field }) => {
                return (
                  <FormItem className="col-span-3">
                    <FormLabel className="ml-3">
                      Estado(s) Brasileiro(s) de Residência
                    </FormLabel>
                    <FormControl>
                      <MultipleSelector
                        value={field.value}
                        onChange={field.onChange}
                        defaultOptions={BR_STATE_OPTIONS}
                        placeholder="Alagoas..."
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
              name="cities_of_residence"
              control={profileForm.control}
              render={({ field }) => {
                return (
                  <FormItem className="col-span-3">
                    <FormLabel className="ml-3">
                      Cidade(s) de Residência
                    </FormLabel>
                    <FormControl>
                      <MultipleSelector
                        value={field.value}
                        onChange={field.onChange}
                        defaultOptions={[]}
                        creatable
                        placeholder="Belo Horizonte..."
                        hidePlaceholderWhenSelected
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
          </fieldset>

          <fieldset>
            <legend className="ml-3 mb-2 text-lg font-bold col-span-2">
              3. Usuários em Servidores de Go
            </legend>

            <p className="ml-3 text-sm mb-2 text-gray-600">
              A força que aparecerá ao lado do seu nome no
              perfil será a primeira listada aqui.
            </p>

            {Array.from(Array(totalUsers() + 1), (e, i) => {
              const key = `user-${i}`
              return (
                <div
                  key={i}
                  className="grid grid-cols-12 gap-x-2 gap-y-3 items-end"
                >
                  <FormItem className="col-span-4 w-full">
                    <FormLabel className="ml-3">
                      Servidor
                    </FormLabel>
                    <FormControl>
                      <Select
                        value={goUsers?.[key]?.server}
                        onValueChange={(v) => {
                          const currentUsers =
                            profileForm.getValues(
                              "go_users",
                            )
                          const newGoUsers = {
                            ...currentUsers,
                          }
                          newGoUsers[key] = {
                            ...currentUsers?.[key],
                            server: v,
                          }
                          profileForm.setValue(
                            "go_users",
                            newGoUsers,
                          )
                          setGoUsers(newGoUsers)
                        }}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Escolha um servidor" />
                        </SelectTrigger>
                        <SelectContent>
                          {goServers.map((gs, i) => (
                            <SelectItem key={i} value={gs}>
                              {gs}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                  <FormItem className="col-span-3">
                    <FormLabel className="ml-3">
                      Usuário
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="joao"
                        value={
                          goUsers?.[key]?.username ?? ""
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
                            ...currentUsers?.[key],
                            username: e.target.value,
                          }
                          profileForm.setValue(
                            "go_users",
                            newGoUsers,
                          )
                          setGoUsers(newGoUsers)
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                  <FormItem className="col-span-4 w-full">
                    <FormLabel className="ml-3">
                      Força
                    </FormLabel>
                    <FormControl>
                      <Select
                        value={goUsers?.[key]?.strength}
                        onValueChange={(v) => {
                          const currentUsers =
                            profileForm.getValues(
                              "go_users",
                            )
                          const newGoUsers = {
                            ...currentUsers,
                          }
                          newGoUsers[key] = {
                            ...currentUsers?.[key],
                            strength: v,
                          }
                          profileForm.setValue(
                            "go_users",
                            newGoUsers,
                          )
                          setGoUsers(newGoUsers)
                        }}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecione sua força" />
                        </SelectTrigger>
                        <SelectContent>
                          {goStrength.map((gs, i) => (
                            <SelectItem
                              key={i}
                              value={gs.kyu_dan}
                            >
                              {gs.kyu_dan}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                  {i === totalUsers() ? (
                    <Button
                      type="button"
                      className="col-span-1"
                      onClick={() => {
                        const newGoUsers = { ...goUsers }
                        newGoUsers[`user-${i + 1}`] = {}
                        setGoUsers(newGoUsers)
                      }}
                    >
                      <Plus className="h-[18px] w-[18px]" />
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      className="col-span-1"
                      onClick={() => {
                        const newGoUsers = { ...goUsers }
                        delete newGoUsers[key]
                        profileForm.setValue(
                          "go_users",
                          newGoUsers,
                        )
                        setGoUsers({ ...newGoUsers })
                      }}
                    >
                      <Trash2 className="h-[17px] w-[17px]" />
                    </Button>
                  )}
                </div>
              )
            })}
          </fieldset>

          <fieldset className="grid grid-cols-6 gap-x-2 gap-y-3">
            <legend className="ml-3 mb-4 text-lg font-bold col-span-2">
              4. Redes Sociais e Outros Links
            </legend>

            <FormField
              control={profileForm.control}
              name="socials_links.discord"
              render={({ field }) => {
                return (
                  <FormItem className="col-span-6">
                    <FormLabel className="ml-3 mb-2 flex gap-1 items-center">
                      <FontAwesomeIcon
                        className="h-4 w-4"
                        color="gray"
                        icon={faDiscord}
                      />
                      Discord
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="url"
                        placeholder="https://discordapp.com/users/joao.silva9999"
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
              name="socials_links.facebook"
              render={({ field }) => {
                return (
                  <FormItem className="col-span-6">
                    <FormLabel className="ml-3 mb-2 flex gap-1 items-center">
                      <FontAwesomeIcon
                        className="h-[14px] w-[14px]"
                        color="gray"
                        icon={faFacebook}
                      />
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
                    <FormLabel className="ml-3 mb-2 flex gap-1 items-center">
                      <FontAwesomeIcon
                        className="h-4 w-4"
                        color="gray"
                        icon={faInstagram}
                      />
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
                    <FormLabel className="ml-3 mb-2 flex gap-1 items-center">
                      <FontAwesomeIcon
                        className="h-[15px] w-[15px]"
                        color="gray"
                        icon={faTwitch}
                      />
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
                    <FormLabel className="ml-3 mb-2 flex gap-1 items-center">
                      <FontAwesomeIcon
                        className="h-4 w-4"
                        color="gray"
                        icon={faYoutube}
                      />
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
                    <FormLabel className="ml-3 mb-2 flex gap-1 items-center">
                      <Link className="h-[15px] w-[15px]" />
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
    </section>
  )
}
