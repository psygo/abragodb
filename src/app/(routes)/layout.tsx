import { cookies } from "next/headers"
import { Inter } from "next/font/google"

import { ClerkProvider } from "@clerk/nextjs"
import { shadesOfPurple } from "@clerk/themes"
import { ptBR } from "@clerk/localizations"

import {
  Theme,
  stringToTheme,
  type WithReactChildren,
} from "@types"

import { ThemeProvider } from "@providers"

import { Footer, TopNav } from "@components"

import { cn } from "@styles"
import "@styles/globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata = {
  title: "ABRAGO DB",
  description: "ABRAGO DB",
}

export default function RootLayout({
  children,
}: WithReactChildren) {
  const cookieStore = cookies()
  const theme = cookieStore.get("theme")
    ? stringToTheme(cookieStore.get("theme")!.value)
    : Theme.light

  return (
    <ThemeProvider initialTheme={theme}>
      <ClerkProvider
        appearance={{
          baseTheme:
            theme === Theme.dark
              ? shadesOfPurple
              : undefined,
        }}
        localization={ptBR}
      >
        <html lang="pt-BR">
          <body
            className={cn(
              "min-h-screen bg-background font-sans antialiased",
              inter.variable,
              theme,
            )}
          >
            <TopNav />
            <main className="p-6 min-h-screen flex justify-center">
              <div>{children}</div>
            </main>
            <Footer />
          </body>
        </html>
      </ClerkProvider>
    </ThemeProvider>
  )
}
