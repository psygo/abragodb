type FullNameProps = {
  firstName: string | null | undefined
  lastName: string | null | undefined
}

export function PlayerFullName({
  firstName,
  lastName,
}: FullNameProps) {
  return (
    <h2 className="text-lg md:text-xl">
      {firstName ?? ""} {lastName ?? ""}
    </h2>
  )
}
