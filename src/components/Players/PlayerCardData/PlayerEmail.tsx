import "@utils/array"

import { type Email } from "@types"

type PlayerEmailProps = {
  email: Email | null | undefined
}

export function PlayerEmail({ email }: PlayerEmailProps) {
  if (!email || email === "") return

  return (
    <a
      href={`mailto:${email}`}
      className="text-[1rem] text-gray-500 hidden md:block"
    >
      {email}
    </a>
  )
}
