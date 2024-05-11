"use client"

import Link from "next/link"

import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser as useClerkUser,
} from "@clerk/nextjs"

import { Moon, Pencil, Sun } from "lucide-react"

import { Button } from "@shad"

import { useTheme } from "@providers"

export function TopNav() {
  return (
    <nav className="flex justify-between items-center px-2 py-2 pr-4 bg-gray-200 dark:bg-gray-900">
      <LeftNav />
      <RightNav />
    </nav>
  )
}

function LeftNav() {
  return (
    <section>
      <Button variant="ghost" asChild>
        <Link href="/">
          <h1 className="font-extrabold tracking-tight text-xl">
            ABRAGO DB
          </h1>
        </Link>
      </Button>
    </section>
  )
}

function RightNav() {
  return (
    <section className="flex items-center gap-1">
      <div className="mr-4">
        <PageNavLink
          href="/estatisticas"
          label="Estatísticas"
        />
        <PageNavLink href="/sobre" label="Sobre" />
      </div>
      <ThemeButton />
      <EditProfileButton />
      <ClerkSignIn />
    </section>
  )
}

type PageNavLinkProps = {
  href: string
  label: string
}

function PageNavLink({ href, label }: PageNavLinkProps) {
  return (
    <Button variant="ghost" className="p-2" asChild>
      <Link href={href}>
        <h2 className="font-semibold tracking-tight text-lg">
          {label}
        </h2>
      </Link>
    </Button>
  )
}

function ThemeButton() {
  const { cycleTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={async () => await cycleTheme()}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

function ClerkSignIn() {
  return (
    <div className="ml-3 flex items-center">
      <SignedOut>
        <SignInButton>
          <Button size="sm" variant="outline">
            Entrar
          </Button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  )
}

function EditProfileButton() {
  const { user } = useClerkUser()

  return (
    <SignedIn>
      <Link
        className="flex items-center"
        href={`/jogadores/${user?.username}`}
      >
        <Button variant="ghost" className="p-3">
          <Pencil style={{ width: 17, height: 17 }} />
        </Button>
      </Link>
    </SignedIn>
  )
}
