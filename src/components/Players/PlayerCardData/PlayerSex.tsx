import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faGenderless,
  faMars,
  faVenus,
} from "@fortawesome/free-solid-svg-icons"

type PlayerSexProps = {
  sex: string | null | undefined
}

export function PlayerSex({ sex }: PlayerSexProps) {
  if (!sex || sex === "") return

  if (sex === "Masculino")
    return (
      <FontAwesomeIcon
        className="h-[15px] w-[15px] mb-[1px]"
        color="gray"
        icon={faMars}
      />
    )
  else if (sex === "Feminino")
    return (
      <FontAwesomeIcon
        className="h-[15px] w-[15px] mb-[1px]"
        color="gray"
        icon={faVenus}
      />
    )
  else if (sex === "Outro")
    return (
      <FontAwesomeIcon
        className="h-[15px] w-[15px] mb-[1px]"
        color="gray"
        icon={faGenderless}
      />
    )
}
