import { Dispatch, SetStateAction, useState } from "react"
import { CHART_DATE_OPTIONS } from "../constants/charts"

export const useChartInterval = (): [
  string | undefined,
  Dispatch<SetStateAction<string | undefined>>,
] => {
  const [interval, setInterval] = useState<string | undefined>(
    CHART_DATE_OPTIONS[0].value,
  )

  return [interval, setInterval]
}
