"use client"

import { useRouter, useSearchParams } from "next/navigation"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@shad"

export type PlayersOrderBy = "criacao" | "elo_declarado"

type PlayersOrderBySelectProps = {
  initialValue: PlayersOrderBy
}

export function PlayersOrderBySelect({
  initialValue = "elo_declarado",
}: PlayersOrderBySelectProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  return (
    <div className="w-full flex gap-3 justify-end items-center">
      <Select
        onValueChange={(v) => {
          const newSearchParams = new URLSearchParams(
            searchParams,
          )
          newSearchParams.set("ordenar", v)
          router.push(`/?${newSearchParams.toString()}`)
        }}
        value={initialValue ?? " "}
      >
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Selecione um ordenamento" />
        </SelectTrigger>
        <SelectContent
          ref={(ref) => {
            if (!ref) return
            ref.ontouchstart = (e) => {
              e.preventDefault()
            }
          }}
        >
          <SelectItem
            className="cursor-pointer"
            value="elo_declarado"
          >
            Nível Declarado
          </SelectItem>
          <SelectItem
            className="cursor-pointer"
            value="criacao"
          >
            Data de Criação
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
