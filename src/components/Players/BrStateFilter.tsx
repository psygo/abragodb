"use client"

import { useRouter, useSearchParams } from "next/navigation"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@shad"

import {
  BR_STATE_OPTIONS,
  type BR_STATE_OR_ALL,
} from "@types"

type BrStateFilterProps = {
  initialValue?: BR_STATE_OR_ALL | null | undefined
}

export function BrStateFilter({
  initialValue = " ",
}: BrStateFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  return (
    <div className="w-full flex gap-3 justify-end items-center">
      <Select
        onValueChange={(v) => {
          const newSearchParams = new URLSearchParams(
            searchParams,
          )
          newSearchParams.set("estado", v)
          router.push(`/?${newSearchParams.toString()}`)
        }}
        value={initialValue ?? " "}
      >
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Selecione um estado" />
        </SelectTrigger>
        <SelectContent
          ref={(ref) => {
            if (!ref) return
            ref.ontouchstart = (e) => {
              e.preventDefault()
            }
          }}
        >
          <SelectItem className="cursor-pointer" value=" ">
            Todos os estados
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
