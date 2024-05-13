import { nanoid } from "nanoid"

export type Username = string
export type Email = string
export type NanoId = string
export type ClerkId = string

export function standardNanoId(): NanoId {
  return nanoid(10)
}
