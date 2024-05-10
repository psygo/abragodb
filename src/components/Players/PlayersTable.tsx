import Link from "next/link"

import { type Players } from "@queries"

import {
  Card,
  CardContent,
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
    <Card className="px-6 py-2">
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">
                Nome
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {players.map((p, i) => {
              return (
                <TableRow key={i}>
                  <TableCell className="font-medium">
                    <Link
                      className="flex gap-1 text-orange-400"
                      href={`/jogadores/${p.username}`}
                    >
                      <span>
                        {p.profile?.first_name ?? "—"}
                      </span>
                      <span>
                        {p.profile?.last_name ?? "—"}
                      </span>
                    </Link>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
