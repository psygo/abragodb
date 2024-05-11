import { cn } from "@styles"

import { Avatar, AvatarFallback, AvatarImage } from "@shad"

type PlayerAvatarProps = {
  imageUrl: string | null | undefined
  alt?: string
  className?: string
}

export function PlayerAvatar({
  imageUrl,
  className = "",
  alt = "",
}: PlayerAvatarProps) {
  if (!imageUrl) return

  const searchParams = new URLSearchParams()
  searchParams.set("height", "100")
  searchParams.set("width", "100")
  searchParams.set("quality", "100")
  searchParams.set("fit", "crop")
  const imageSrc = `${imageUrl}?${searchParams.toString()}`

  return (
    <Avatar className={cn(className)}>
      <AvatarImage src={imageSrc} alt={alt} />
      <AvatarFallback>?</AvatarFallback>
    </Avatar>
  )
}
