import {
  addDays,
  endOfMonth,
  format as formatDate,
  parseISO,
  startOfMonth,
} from "date-fns"

export function getEmptyMonthData(date: string): { x: Date; y: number }[]
export function getEmptyMonthData(
  date: string,
  format: string,
): { x: string; y: number }[]

export function getEmptyMonthData(date: string, format?: string) {
  const startDate = startOfMonth(parseISO(date))
  const endDate = endOfMonth(startDate)

  const data = []
  let currentDate = startDate

  while (currentDate <= endDate) {
    const xValue = format ? formatDate(currentDate, "MMM dd") : currentDate
    data.push({ x: xValue, y: 0 })
    currentDate = addDays(currentDate, 1)
  }

  return data
}
