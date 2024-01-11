import { Dispatch, SetStateAction, useState } from "react"
import { CHART_DATE_OPTIONS } from "../constants/charts"

export const useChartInterval = (): [
  string | null,
  Dispatch<SetStateAction<string | null>>,
] => {
  const [interval, setInterval] = useState<string | null>(
    CHART_DATE_OPTIONS[0].value,
  )

  return [interval, setInterval]
}
