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

import { PlayerAvatar } from "./PlayerAvatar"

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
                  <TableCell className="flex gap-2 items-center font-medium">
                    <PlayerAvatar
                      className="h-6 w-6"
                      imageUrl={p.image_url}
                    />
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
