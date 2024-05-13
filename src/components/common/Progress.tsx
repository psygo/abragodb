import { Loader2 } from "lucide-react"

type ProgressProps = {
  size?: number
}

export function Progress({ size = 64 }: ProgressProps) {
  return (
    <Loader2
      className="m-auto mt-20 animate-spin"
      style={{ width: size, height: size }}
    />
  )
}
