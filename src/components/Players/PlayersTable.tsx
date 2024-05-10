import Link from "next/link"

import { type Players } from "@queries"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@shad"

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
            Usuário
          </TableHead>
          <TableHead>Email</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {players.map((p, i) => {
          return (
            <TableRow key={i}>
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
