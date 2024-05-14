import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faDiscord,
  faGithub,
} from "@fortawesome/free-brands-svg-icons"

export function Footer() {
  return (
    <footer className="flex gap-2 justify-center items-center p-4 bg-gray-200 dark:bg-gray-900">
      <a
        className="h-6 w-6"
        href="https://github.com/psygo/abragodb"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FontAwesomeIcon
          className="h-[22px] w-[22px]"
          color="gray"
          icon={faGithub}
        />
      </a>
      <a
        className="h-6 w-6"
        href="https://discord.gg/7u6MVMFEfv"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FontAwesomeIcon
          className="h-6 w-6"
          color="gray"
          icon={faDiscord}
        />
      </a>
    </footer>
  )
}
