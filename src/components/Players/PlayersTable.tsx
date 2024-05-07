import e, { type $infer } from "@@/dbschema/edgeql-js"

import Link from "next/link"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@shad"

export const selectPlayers = e.select(e.Player, () => ({
  nanoid: true,
  username: true,
  email: true,
}))

export type Players = $infer<typeof selectPlayers>

type PlayersTableProps = {
  players: Players
}

export function PlayersTable({
  players,
}: PlayersTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">
            Nanoid
          </TableHead>
          <TableHead className="w-[100px]">
            Usuário
          </TableHead>
          <TableHead>Email</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {players.map((p, i) => {
          return (
            <TableRow key={i}>
              <TableCell>{p.nanoid}</TableCell>
              <TableCell className="font-medium">
                <Link
                  className="text-orange-400"
                  href={`/jogadores/${p.username}`}
                >
                  {p.username}
                </Link>
              </TableCell>
              <TableCell>{p.email}</TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
