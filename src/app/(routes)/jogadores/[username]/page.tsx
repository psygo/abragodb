import { LocalDate } from "edgedb"

import { SignedIn } from "@clerk/nextjs"

import e from "@@/dbschema/edgeql-js"

import { edgeDbClient } from "@db"

import { type Username } from "@types"

import { type ProfileFormValidation } from "@validation"

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

  console.log("profile", player.profile)

  // const initialValues: ProfileFormValidation =
  //   player.profile ?? {}
  // if (player.profile?.date_of_birth) initialValues.

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
        <ProfileForm 
        // initialValues={initialValues} 
        />
      </SignedIn>
    </article>
  )
}
