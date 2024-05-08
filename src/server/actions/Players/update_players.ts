"use server"

import e from "@@/dbschema/edgeql-js"

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
    }

    const upsertQuery = e
      .insert(e.Profile, {
        ...newData,
        player: playerQuery,
      })
      .unlessConflict((profile) => ({
        on: profile.player,
        else: e.update(profile, () => ({
          set: newData,
        })),
      }))

    await upsertQuery.run(edgeDbClient)
  } catch (e) {
    console.error(e)
  }
}
