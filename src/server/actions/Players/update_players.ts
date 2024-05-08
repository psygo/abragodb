"use server"

import e from "@@/dbschema/edgeql-js"

import { edgeDbClient } from "@db"

import { type Username } from "@types"

import { type ProfileFormValidation } from "@components"

export async function updatePlayerProfile(
  username: Username,
  values: ProfileFormValidation,
) {
  try {
    console.log("values", values.date_of_birth.toString())

    const playerQuery = e.select(e.Player, () => ({
      filter_single: { username },
    }))
    const upsertQuery = e
      .insert(e.Profile, {
        ...values,
        player: playerQuery,
      })
      .unlessConflict((profile) => ({
        on: profile.player,
        else: e.update(profile, () => ({
          set: {
            ...values,
          },
        })),
      }))

    await upsertQuery.run(edgeDbClient)
  } catch (e) {
    console.error(e)
  }
}
