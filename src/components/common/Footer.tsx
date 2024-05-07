import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub } from "@fortawesome/free-brands-svg-icons"

export function Footer() {
  return (
    <footer className="bg-gray-200 flex justify-center items-center p-4">
      <a
        href="https://github.com/psygo/abragodb"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FontAwesomeIcon
          className="h-6 w-6"
          color="gray"
          icon={faGithub}
        />
      </a>
    </footer>
  )
}
