type PlayerDescriptionProps = {
  description: string | null | undefined
}

export function PlayerDescription({
  description,
}: PlayerDescriptionProps) {
  if (!description || description === "") return

  return (
    <div className="flex flex-col gap-2 pl-1">
      <p className="text-gray-400 text-xs">Descrição</p>
      <p className="text-[0.95rem]">{description}</p>
    </div>
  )
}
