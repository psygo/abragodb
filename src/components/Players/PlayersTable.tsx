"use client"

import { useRouter } from "next/navigation"

import { type GetPlayers } from "@queries"

import { PlayerProfile } from "./PlayerProfile"

import { motion } from "framer-motion"

type PlayersTableProps = {
  players: GetPlayers["players"]
}

export function PlayersTable({
  players,
}: PlayersTableProps) {
  const router = useRouter()

  const container = {
    visible: {
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.05,
      },
    },
  }
  const item = {
    hidden: {
      y: -10,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
    },
  }

  return (
    <motion.ul
      variants={container}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-2"
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
            <PlayerProfile
              key={p.username}
              player={p}
              onlyHeader={true}
            />
          </motion.li>
        )
      })}
    </motion.ul>
  )
}
