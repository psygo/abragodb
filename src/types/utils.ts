import { type ReactNode } from "react"

export type WithReactChildren = {
  children: ReactNode
}

export type Nullable<T> = { [K in keyof T]: T[K] | null }
