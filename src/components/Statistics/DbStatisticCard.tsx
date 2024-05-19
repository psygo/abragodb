"use client"

import { useEffect } from "react"

import {
  motion,
  animate,
  useMotionValue,
  useTransform,
} from "framer-motion"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@shad"

type DbStatisticsCardProps = {
  label: string
  stats: number
}

export function DbStatisticCard({
  label,
  stats,
}: DbStatisticsCardProps) {
  const value = useMotionValue(0)
  const animatedValue = useTransform(value, Math.ceil)

  useEffect(() => {
    const animation = animate(value, stats, { duration: 2 })
    return animation.stop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Card className="bg-gray-100 dark:bg-gray-800">
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-sm text-gray-400 text-right">
          {label}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0 flex justify-end">
        <motion.h4 className="text-2xl font-semibold">
          {animatedValue}
        </motion.h4>
      </CardContent>
    </Card>
  )
}
