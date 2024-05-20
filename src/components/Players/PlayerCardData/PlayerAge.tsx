type PlayerAgeProps = {
  dateOfBirth: Date
}
export function PlayerAge({ dateOfBirth }: PlayerAgeProps) {
  const now = new Date()
  const ageDifMs = now.getTime() - dateOfBirth.getTime()
  const ageDate = new Date(ageDifMs)
  const age = Math.abs(ageDate.getUTCFullYear() - 1970)
  const ageStr = age > 1 ? `${age} anos` : ""

  return (
    <p className="text-[1rem] text-gray-500">{ageStr}</p>
  )
}
