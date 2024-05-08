"use server"

import e from "@@/dbschema/edgeql-js"

import { edgeDbClient } from "@db"

import { type Username } from "@types"

export async function updatePlayerProfile(
  username: Username,
  first_name?: string | null,
  last_name?: string | null,
  description?: string | null,
) {
  try {
    const playerQuery = e.select(e.Player, () => ({
      filter_single: { username },
    }))
    const upsertQuery = e
      .insert(e.Profile, {
        first_name,
        last_name,
        description,
        player: playerQuery,
      })
      .unlessConflict((profile) => ({
        on: profile.player,
        else: e.update(profile, () => ({
          set: {
            first_name,
            last_name,
            description,
          },
        })),
      }))

    await upsertQuery.run(edgeDbClient)
  } catch (e) {
    console.error(e)
  }
}
