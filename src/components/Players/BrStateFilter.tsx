"use client"

import { useRouter } from "next/navigation"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@shad"

import { type BR_STATE, BR_STATE_OPTIONS } from "@types"

type BrStateFilterProps = {
  initialValue?: BR_STATE | "" | null | undefined
}

export function BrStateFilter({
  initialValue = "",
}: BrStateFilterProps) {
  const router = useRouter()

  return (
    <div className="w-full flex gap-3 justify-end items-center">
      <Select
        onValueChange={(v) => {
          console.log("here", v)
          const searchParams = new URLSearchParams()
          searchParams.set("estado", v)
          router.push(`/?${searchParams.toString()}`)
        }}
        value={initialValue ?? ""}
      >
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Selecione um estado" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem
            key={100}
            className="cursor-pointer"
            value=" "
          >
            Todos
          </SelectItem>
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
