"use server"

import e from "@@/dbschema/edgeql-js"

import { edgeDbClient } from "@db"

import { type Username } from "@types"

export async function updatePlayerProfile(
  username: Username,
  first_name: string,
  last_name: string,
) {
  try {
    const playerQuery = e.select(e.Player, () => ({
      filter_single: { username },
    }))
    const upsertQuery = e
      .insert(e.Profile, {
        first_name,
        last_name,
        player: playerQuery,
      })
      .unlessConflict((profile) => ({
        on: profile.player,
        else: e.update(profile, () => ({
          set: {
            first_name,
            last_name,
          },
        })),
      }))

    await upsertQuery.run(edgeDbClient)
  } catch (e) {
    console.error(e)
  }
}
