import { Inter } from "next/font/google"

import { type WithReactChildren } from "@types"

import { TopNav } from "@components"

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
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <TopNav />
        <main className="p-4">{children}</main>
      </body>
    </html>
  )
}
