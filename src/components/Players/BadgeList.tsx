import { Badge } from "@shad"

export type BadgeListProps = {
  label?: string
  badges: string[] | undefined | null
}

export function BadgeList({
  label,
  badges,
}: BadgeListProps) {
  if (!badges || badges.length === 0) return

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <p className="text-gray-400 text-xs ml-1">
          {label}
        </p>
      )}
      <div className="flex gap-1 items-center">
        {badges.map((n, i) => (
          <Badge variant="outline" key={i}>
            {n}
          </Badge>
        ))}
      </div>
    </div>
  )
}
