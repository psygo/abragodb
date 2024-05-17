import { Link } from "lucide-react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faDiscord,
  faFacebook,
  faInstagram,
  faTwitch,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons"

import "@utils/array"

import { type SocialsLinks } from "@validation"

type PlayerSocialsProps = {
  socialsLinks: SocialsLinks
}

export function PlayerSocials({
  socialsLinks,
}: PlayerSocialsProps) {
  if (!socialsLinks) return

  const {
    discord,
    facebook,
    instagram,
    twitch,
    youtube,
    personal,
  } = socialsLinks

  return (
    <div className="ml-1 pb-1 flex gap-2 items-center">
      {discord && (
        <a href={discord}>
          <FontAwesomeIcon
            className="h-[18px] w-[18px]"
            color="gray"
            icon={faDiscord}
          />
        </a>
      )}
      {facebook && (
        <a href={facebook}>
          <FontAwesomeIcon
            className="h-[16px] w-[16px] pb-[1px]"
            color="gray"
            icon={faFacebook}
          />
        </a>
      )}
      {instagram && (
        <a href={instagram}>
          <FontAwesomeIcon
            className="h-[17.5px] w-[17.5px]"
            color="gray"
            icon={faInstagram}
          />
        </a>
      )}
      {twitch && (
        <a href={twitch}>
          <FontAwesomeIcon
            className="h-[16.5px] w-[16.5px]"
            color="gray"
            icon={faTwitch}
          />
        </a>
      )}
      {youtube && (
        <a href={youtube}>
          <FontAwesomeIcon
            className="h-[17.5px] w-[17.5px]"
            color="gray"
            icon={faYoutube}
          />
        </a>
      )}
      {personal && (
        <a href={personal}>
          <Link
            className="h-[14.5px] w-[14.5px] mt-1"
            color="gray"
          />
        </a>
      )}
    </div>
  )
}
