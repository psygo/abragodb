"use client"

import { useUser as useClerkUser } from "@clerk/nextjs"

import { type GetPlayer } from "@queries"

type PlayerAccountStatusProps = {
  player: GetPlayer
}

export function PlayerAccountStatus({
  player,
}: PlayerAccountStatusProps) {
  const { user } = useClerkUser()

  const status = player?.account_status

  function userIsSignedInUser() {
    return user?.id === player?.clerkid
  }

  function isSuspended() {
    return status === "suspended"
  }

  return (
    <div className="my-4 mx-2 text-right">
      {isSuspended() && (
        <>
          <p>
            Este perfil foi{" "}
            <span className="text-red-600 dark:text-red-400">
              suspenso
            </span>
            .
          </p>
          {userIsSignedInUser() && (
            <p>
              Contate{" "}
              <a
                href="mailto:philippefanaro@gmail.com"
                className="underline"
              >
                um administrador
              </a>{" "}
              para saber mais.
            </p>
          )}
        </>
      )}
    </div>
  )
}
