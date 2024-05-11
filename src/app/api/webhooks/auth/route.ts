import { Webhook } from "svix"

import {
  type UserJSON,
  type WebhookEvent,
  clerkClient,
} from "@clerk/nextjs/server"

import { headers } from "next/headers"
import { NextResponse } from "next/server"

import e from "@/../dbschema/edgeql-js"

import "@utils/array"

import { edgeDbClient } from "@db"

import { standardNanoId } from "@types"

const clerkWebhooksUserEventsSecret =
  process.env.CLERK_WEBHOOKS_USER_EVENTS!

async function validateRequest(request: Request) {
  try {
    const payloadString = await request.text()
    const headerPayload = headers()

    const svixHeaders = {
      "svix-id": headerPayload.get("svix-id")!,
      "svix-timestamp": headerPayload.get(
        "svix-timestamp",
      )!,
      "svix-signature": headerPayload.get(
        "svix-signature",
      )!,
    }

    const wh = new Webhook(clerkWebhooksUserEventsSecret)

    return wh.verify(
      payloadString,
      svixHeaders,
    ) as WebhookEvent
  } catch (e) {
    console.error(e)
  }
}

export async function POST(req: Request) {
  try {
    const verifiedPayload = await validateRequest(req)

    console.log("before verification")

    if (verifiedPayload) {
      const data = verifiedPayload.data as UserJSON
      const type = verifiedPayload.type

      console.log("verified")

      switch (type) {
        case "user.created":
          await createPlayer(data)
          break
        case "user.updated":
          await updatePlayer(data)
          break
        default:
          console.log(`${type} is not a managed event.`)
      }
    }

    return NextResponse.json({})
  } catch (e) {
    console.error(e)
  }
}

async function createPlayer(userData: UserJSON) {
  try {
    const nanoId = standardNanoId()

    const insertPlayer = e.insert(e.Player, {
      clerkid: userData.id,
      username: userData.username!,
      email: userData.email_addresses.first().email_address,
      image_url: userData.image_url,
      nanoid: nanoId,
    })
    const res = await insertPlayer.run(edgeDbClient)
    if (!res) return

    await clerkClient.users.updateUser(userData.id, {
      publicMetadata: {
        nanoid: nanoId,
        isAdmin: false,
      },
    })
  } catch (e) {
    console.error(e)
  }
}

async function updatePlayer(userData: UserJSON) {
  try {
    const clerkId = userData.id
    const updatePlayer = e.update(e.Player, () => ({
      filter_single: { clerkid: clerkId },
      set: {
        email:
          userData.email_addresses.first().email_address,
        username: userData.username!,
        image_url: userData.image_url,
      },
    }))
    await updatePlayer.run(edgeDbClient)
  } catch (e) {
    console.error(e)
  }
}
