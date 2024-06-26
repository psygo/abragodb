import { SignedIn } from "@clerk/nextjs"

import { edgeDbClient } from "@db"

import { localDateToDate } from "@utils"

import {
  brStatesToOptions,
  stringsToOptions,
  type Username,
} from "@types"

import { getPlayerQuery } from "@queries"

import {
  type ProfileFormValidation,
  profileFormValidationSchema,
} from "@validation"

import {
  PlayerAccountStatus,
  PlayerProfileCard,
  ProfileForm,
} from "@components"

type PlayerPageProps = {
  params: { username: Username }
}

export default async function PlayerPage({
  params,
}: PlayerPageProps) {
  const username = params.username
  const player =
    await getPlayerQuery(username).run(edgeDbClient)

  if (!player)
    return (
      <article className="prose dark:prose-invert">
        <h2>Este jogador nao foi encontrado.</h2>
      </article>
    )

  function getProfileFormInitialValues() {
    const initialSex = player?.profile?.sex ?? ""
    const initialDateOfBirth = player?.profile
      ?.date_of_birth
      ? localDateToDate(player?.profile.date_of_birth)
      : new Date()

    const initialLanguages = player?.profile?.languages
      ? stringsToOptions(player?.profile.languages)
      : []

    const initialNationalities = player?.profile
      ?.nationalities
      ? stringsToOptions(player.profile.nationalities)
      : []
    const initialBrStatesOfOrigin = player?.profile
      ?.br_states_of_origin
      ? brStatesToOptions(
          player.profile.br_states_of_origin,
        )
      : []
    const initialCitiesOfOrigin = player?.profile
      ?.cities_of_origin
      ? stringsToOptions(player.profile.cities_of_origin)
      : []

    const initialCountriesOfResidence = player?.profile
      ?.countries_of_residence
      ? stringsToOptions(
          player.profile.countries_of_residence,
        )
      : []
    const initialBrStatesOfResidence = player?.profile
      ?.br_states_of_residence
      ? brStatesToOptions(
          player.profile.br_states_of_residence,
        )
      : []
    const initialCitiesOfResidence = player?.profile
      ?.cities_of_residence
      ? stringsToOptions(player.profile.cities_of_residence)
      : []

    const initialSocialsLinks = player?.profile
      ?.socials_links
      ? player.profile.socials_links
      : {}

    const initialGoUsers = player?.profile?.go_users
      ? player.profile.go_users
      : {}

    const initialValues: ProfileFormValidation =
      profileFormValidationSchema.parse({
        ...player?.profile,

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

    return initialValues
  }

  return (
    <article>
      <SignedIn>
        <PlayerAccountStatus player={player} />
      </SignedIn>

      <PlayerProfileCard player={player} />

      <SignedIn>
        <ProfileForm
          clerkId={player.clerkid}
          initialValues={getProfileFormInitialValues()}
        />
      </SignedIn>
    </article>
  )
}
