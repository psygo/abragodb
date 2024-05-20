import { cn } from "@styles"

import { Badge } from "@shad"

export type BadgeListProps = {
  label?: string
  badges: string[] | undefined | null
  className?: string
}

export function BadgeList({
  label,
  badges,
  className = "",
}: BadgeListProps) {
  if (!badges || badges.length === 0) return

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      {label && (
        <p className="text-gray-400 text-xs ml-1">
          {label}
        </p>
      )}
      <div className="flex flex-wrap gap-1 items-center">
        {badges.map((n, i) => (
          <Badge variant="outline" key={i}>
            {n}
          </Badge>
        ))}
      </div>
    </div>
  )
}
