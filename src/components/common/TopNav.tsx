"use client"

import Link from "next/link"

import { Moon, Sun } from "lucide-react"

import { Button } from "@shad"

import { useTheme } from "@providers"

export function TopNav() {
  return (
    <nav className="flex justify-between items-center px-2 py-3 bg-gray-200 dark:bg-gray-900">
      <LeftNav />
      <RightNav />
    </nav>
  )
}

function RightNav() {
  const { cycleTheme } = useTheme()

  return (
    <section className="flex items-center gap-2">
      <Button variant="ghost" asChild>
        <Link href="/sobre">
          <h2 className="font-bold tracking-tight text-xl">
            Sobre
          </h2>
        </Link>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={async () => await cycleTheme()}
      >
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </section>
  )
}

function LeftNav() {
  return (
    <section>
      <Button variant="ghost" asChild>
        <Link href="/">
          <h1 className="font-extrabold tracking-tight text-2xl">
            ABRAGO DB
          </h1>
        </Link>
      </Button>
    </section>
  )
}
