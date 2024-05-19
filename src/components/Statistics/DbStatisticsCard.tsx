import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@shad"

type DbStatisticsCardProps = {
  label: string
  stats: number
}

export function DbStatisticsCard({
  label,
  stats,
}: DbStatisticsCardProps) {
  return (
    <Card className="w-[150px] bg-gray-100 dark:bg-gray-800">
      <CardHeader className="p-4">
        <CardTitle className="text-sm text-gray-400">
          {label}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0 flex justify-end">
        <h4 className="text-2xl font-semibold">{stats}</h4>
      </CardContent>
    </Card>
  )
}
