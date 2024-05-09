import { SignedIn } from "@clerk/nextjs"

import e from "@@/dbschema/edgeql-js"

import { edgeDbClient } from "@db"

import { localDateToDate, toPrettyJson } from "@utils"

import { type Username } from "@types"

import {
  brStatesToOptions,
  type GoUsers,
  type ProfileFormValidation,
  profileFormValidationSchema,
  stringsToOptions,
} from "@validation"

import { Separator } from "@shad"

import { ProfileForm } from "@components"

type PlayerPageProps = {
  params: { username: Username }
}

export default async function PlayerPage({
  params,
}: PlayerPageProps) {
  const username = params.username
  const selectPlayer = e.select(e.Player, (player) => ({
    ...e.Player["*"],
    profile: {
      ...e.Player.profile["*"],
      id: false,
    },
    filter_single: e.op(player.username, "=", username),
  }))
  const player = await selectPlayer.run(edgeDbClient)

  if (!player)
    return (
      <article className="prose dark:prose-invert">
        <h2>Este jogador nao foi encontrado.</h2>
      </article>
    )

  const initialSex = player.profile?.sex ?? ""
  const initialDateOfBirth = player.profile?.date_of_birth
    ? localDateToDate(player.profile.date_of_birth)
    : new Date()

  const initialLanguages = player.profile?.languages
    ? stringsToOptions(player.profile.languages)
    : []

  const initialNationalities = player.profile?.nationalities
    ? stringsToOptions(player.profile.nationalities)
    : []
  const initialBrStatesOfOrigin = player.profile
    ?.br_states_of_origin
    ? brStatesToOptions(player.profile.br_states_of_origin)
    : []
  const initialCitiesOfOrigin = player.profile
    ?.cities_of_origin
    ? stringsToOptions(player.profile.cities_of_origin)
    : []

  const initialCountriesOfResidence = player.profile
    ?.countries_of_residence
    ? stringsToOptions(
        player.profile.countries_of_residence,
      )
    : []
  const initialBrStatesOfResidence = player.profile
    ?.br_states_of_residence
    ? brStatesToOptions(
        player.profile.br_states_of_residence,
      )
    : []
  const initialCitiesOfResidence = player.profile
    ?.cities_of_residence
    ? stringsToOptions(player.profile.cities_of_residence)
    : []

  const initialSocialsLinks = player.profile?.socials_links
    ? player.profile.socials_links
    : {}

  const initialGoUsers = player.profile?.go_users
    ? player.profile.go_users
    : {}

  const initialValues: ProfileFormValidation =
    profileFormValidationSchema.parse({
      ...player.profile,

      sex: initialSex,
      date_of_birth: initialDateOfBirth,

      languages: initialLanguages,

      nationalities: initialNationalities,
      br_states_of_origin: initialBrStatesOfOrigin,
      cities_of_origin: initialCitiesOfOrigin,

      countries_of_residence: initialCountriesOfResidence,
      br_states_of_residence: initialBrStatesOfResidence,
      cities_of_residence: initialCitiesOfResidence,

      socials_links: initialSocialsLinks,

      go_users: initialGoUsers,
    })

  return (
    <article className="prose dark:prose-invert">
      <h2>{player.username}</h2>
      <h3>{player.email}</h3>

      <p>{player.profile?.first_name}</p>
      <p>{player.profile?.last_name}</p>
      <p>{player.profile?.description}</p>
      <p>{player.profile?.public_email}</p>
      <p>{player.profile?.date_of_birth?.toString()}</p>
      <pre>
        {toPrettyJson(player.profile?.go_users as GoUsers)}
      </pre>

      <Separator className="mt-8" />

      <SignedIn>
        <ProfileForm initialValues={initialValues} />
      </SignedIn>
    </article>
  )
}
