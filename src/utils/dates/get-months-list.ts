import {
  addMonths,
  endOfMonth,
  format,
  isBefore,
  parseISO,
  startOfMonth,
} from "date-fns"

type Option = {
  value: string
  label: string
}

export const getMonthsList = (createdAt: string): Option[] => {
  const startDate = startOfMonth(parseISO(createdAt))
  const currentDate = endOfMonth(new Date())

  const months: Option[] = []
  let currentMonth = startDate

  while (
    isBefore(currentMonth, currentDate) ||
    currentMonth.getMonth() === currentDate.getMonth()
  ) {
    const monthName = format(currentMonth, "MMMM")
    const year = format(currentMonth, "yyyy")

    months.push({
      label: `${monthName} ${year}`,
      value: format(currentMonth, "yyyy-MM-dd"),
    })

    currentMonth = addMonths(currentMonth, 1)
  }

  return months
}
