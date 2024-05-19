"use client"

import { motion } from "framer-motion"

import { useRouter } from "next/navigation"

import { type GetPlayers } from "@queries"

import { PlayerProfileListCard } from "./PlayerProfileListCard"

export const container = {
  visible: {
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.05,
    },
  },
}
export const item = {
  hidden: {
    y: -10,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
  },
}

type PlayersTableProps = {
  players: GetPlayers["players"]
}

export function PlayersList({
  players,
}: PlayersTableProps) {
  const router = useRouter()

  return (
    <motion.ul
      variants={container}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-2 m-0"
    >
      {players.map((p) => {
        return (
          <motion.li
            variants={item}
            key={p.username}
            onClick={() =>
              router.push(`/jogadores/${p.username}`)
            }
            className="hover:drop-shadow-lg hover:cursor-pointer"
          >
            <PlayerProfileListCard
              key={p.username}
              player={p}
            />
          </motion.li>
        )
      })}
    </motion.ul>
  )
}
