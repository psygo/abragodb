import { SignedIn } from "@clerk/nextjs"

import e from "@@/dbschema/edgeql-js"

import { edgeDbClient } from "@db"

import { localDateToDate } from "@utils"

import { type Username } from "@types"

import {
  brStatesToOptions,
  profileFormValidationSchema,
  stringsToOptions,
  type ProfileFormValidation,
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
  const initialValues: ProfileFormValidation =
    profileFormValidationSchema.parse({
      ...player.profile,
      date_of_birth: initialDateOfBirth,
      languages: initialLanguages,
      nationalities: initialNationalities,
      br_states_of_origin: initialBrStatesOfOrigin,
      cities_of_origin: initialCitiesOfOrigin,
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

      <Separator className="mt-8" />

      <SignedIn>
        <ProfileForm initialValues={initialValues} />
      </SignedIn>
    </article>
  )
}
