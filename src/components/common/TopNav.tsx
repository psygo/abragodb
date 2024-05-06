import Link from "next/link"

export function TopNav() {
  return (
    <nav className="flex justify-between px-3 py-2">
      <Link href="/">
        <h1>ABRAGO DB</h1>
      </Link>
      <Link href="/sobre">
        <h2>Sobre</h2>
      </Link>
    </nav>
  )
}
