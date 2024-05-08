"use server"

import e from "@@/dbschema/edgeql-js"

import { edgeDbClient } from "@db"

import { type Username } from "@types"

import { type ProfileFormValidation } from "@validation"
import { dateToLocalDate } from "../../../utils/datetime"

export async function updatePlayerProfile(
  username: Username,
  values: ProfileFormValidation,
) {
  try {
    const playerQuery = e.select(e.Player, () => ({
      filter_single: { username },
    }))
    const upsertQuery = e
      .insert(e.Profile, {
        ...values,
        date_of_birth: dateToLocalDate(
          values.date_of_birth,
        ),
        player: playerQuery,
      })
      .unlessConflict((profile) => ({
        on: profile.player,
        else: e.update(profile, () => ({
          set: {
            ...values,
            date_of_birth: dateToLocalDate(
              values.date_of_birth,
            ),
          },
        })),
      }))

    await upsertQuery.run(edgeDbClient)
  } catch (e) {
    console.error(e)
  }
}
