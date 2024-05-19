"use client"

import { motion } from "framer-motion"

import {
  BrazilMapCard,
  type TotalPerState,
} from "./BrazilMap"
import { DbStatisticCard } from "./DbStatisticCard"

import { container, item } from "../Players/exports"

type StatsPageContentProps = {
  totalPlayers: number
  totalPlayersPublic: number
  totalPlayersPerState: TotalPerState
}

export function StatsPageContent({
  totalPlayers,
  totalPlayersPublic,
  totalPlayersPerState,
}: StatsPageContentProps) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-2 gap-x-2 gap-y-2"
    >
      <motion.div
        variants={item}
        className="hover:drop-shadow-lg hover:cursor-pointer"
      >
        <DbStatisticCard
          label="Total de Jogadores"
          stats={totalPlayers}
        />
      </motion.div>
      <motion.div variants={item}>
        <DbStatisticCard
          label="Total de Jogadores Públicos"
          stats={totalPlayersPublic}
        />
      </motion.div>
      <motion.div variants={item} className="col-span-2">
        <BrazilMapCard
          totalPlayersPerState={totalPlayersPerState}
        />
      </motion.div>
    </motion.div>
  )
}
