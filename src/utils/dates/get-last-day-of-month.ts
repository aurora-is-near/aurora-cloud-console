import { endOfMonth, format, parseISO } from "date-fns"

export const getLastDayOfMonth = (dateString: string) => {
  const date = parseISO(dateString)
  const lastDay = endOfMonth(date)

  return format(lastDay, "yyyy-MM-dd")
}
