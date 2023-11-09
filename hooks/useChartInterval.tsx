import { Dispatch, SetStateAction, useState } from "react"
import { CHART_DATE_OPTIONS } from "../constants/charts"

type Interval = string | null

export const useChartInterval = (): [
  Interval,
  Dispatch<SetStateAction<Interval>>,
] => {
  const [interval, setInterval] = useState<Interval>(
    CHART_DATE_OPTIONS[0].value,
  )

  return [interval, setInterval]
}
