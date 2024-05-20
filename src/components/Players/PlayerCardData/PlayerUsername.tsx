import { type Username } from "@types"

type PlayerUsernameProps = {
  username: Username
}

export function PlayerUsername({
  username,
}: PlayerUsernameProps) {
  return (
    <h4 className="text-lg text-gray-400">@{username}</h4>
  )
}
