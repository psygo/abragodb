"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@shad"

import { BR_STATE_OPTIONS } from "@types"
import { useRouter } from "next/navigation"

export function BrStateFilter() {
  const router = useRouter()

  return (
    <div className="w-full flex gap-3 justify-end items-center">
      <Select
        onValueChange={(v) => {
          const searchParams = new URLSearchParams()
          searchParams.set("estado", v)
          router.push(`/?${searchParams.toString()}`)
        }}
      >
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Selecione um estado" />
        </SelectTrigger>
        <SelectContent>
          {BR_STATE_OPTIONS.map((st, i) => {
            return (
              <SelectItem
                className="cursor-pointer"
                key={i}
                value={st.value}
              >
                {st.label}
              </SelectItem>
            )
          })}
        </SelectContent>
      </Select>
    </div>
  )
}
