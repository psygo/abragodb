import { cookies } from "next/headers"
import { Inter } from "next/font/google"

import { Theme, type WithReactChildren } from "@types"

import { ThemeProvider } from "@providers"

import { TopNav } from "@components"

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
    ? cookieStore.get("theme")!.value
    : Theme.light

  return (
    <html lang="pt-BR">
      <ThemeProvider initialTheme={theme}>
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            inter.variable,
            theme,
          )}
        >
          <TopNav />
          <main className="p-6">{children}</main>
        </body>
      </ThemeProvider>
    </html>
  )
}
