import Image from "next/image"

type PlayerAvatarProps = {
  imageUrl: string | null | undefined
  alt: string
}

export function PlayerAvatar({
  imageUrl,
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
    <Image
      className="my-4"
      src={imageSrc}
      width={50}
      height={50}
      alt={alt}
    />
  )
}
