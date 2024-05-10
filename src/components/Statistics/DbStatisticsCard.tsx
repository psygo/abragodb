import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@shad"

type DbStatisticsCardProps = {
  totalPlayers: number
}

export function DbStatisticsCard({
  totalPlayers,
}: DbStatisticsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-md">
          Total de Jogadores
        </CardTitle>
      </CardHeader>
      <CardContent>
        <h4>{totalPlayers}</h4>
      </CardContent>
    </Card>
  )
}
