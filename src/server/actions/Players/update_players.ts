"use server"

import e from "../../../../dbschema/edgeql-js"

import { edgeDbClient } from "@db"

import { dateToLocalDate } from "@utils"

import { type Username } from "@types"

import {
  type BR_STATE,
  type ProfileFormValidation,
} from "@validation"

export async function updatePlayerProfile(
  username: Username,
  values: ProfileFormValidation,
) {
  try {
    const playerQuery = e.select(e.Player, () => ({
      filter_single: { username },
    }))

    const newData = {
      ...values,
      date_of_birth: dateToLocalDate(values.date_of_birth),

      languages: values.languages.map((v) => v.value),

      nationalities: values.nationalities.map(
        (v) => v.value,
      ),
      br_states_of_origin: values.br_states_of_origin.map(
        (v) => v.value as BR_STATE,
      ),
      cities_of_origin: values.cities_of_origin.map(
        (v) => v.value,
      ),

      countries_of_residence:
        values.countries_of_residence.map((v) => v.value),
      br_states_of_residence:
        values.br_states_of_residence.map(
          (v) => v.value as BR_STATE,
        ),
      cities_of_residence: values.cities_of_residence.map(
        (v) => v.value,
      ),

      socials_links: values.socials_links,

      go_users: values.go_users,
    }

    const upsertQuery = e
      .insert(e.Profile, {
        ...newData,
        updated_at: new Date(),
        player: playerQuery,
      })
      .unlessConflict((profile) => ({
        on: profile.player,
        else: e.update(profile, () => ({
          set: {
            ...newData,
            updated_at: new Date(),
          },
        })),
      }))

    await upsertQuery.run(edgeDbClient)
  } catch (e) {
    console.error(e)
  }
}
