import { Children, ReactNode, isValidElement } from "react"

export const capitalizeFirstLetter = (string: string) => {
  if (!string || typeof string !== "string") {
    return ""
  }
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export const midTruncate = (value = "", maxLength = 16) => {
  if (!value) return value
  if (value.length <= maxLength) return value

  var charsToShow = maxLength - 3
  var frontChars = Math.ceil(charsToShow / 2)
  var backChars = Math.floor(charsToShow / 2)

  return `${value.substring(0, frontChars)}…${value.substring(
    value.length - backChars,
  )}`
}

export const findChildren = (children: ReactNode, displayName: string) => {
  const foundChildren = Children.toArray(children).filter(
    (child) =>
      isValidElement(child) && (child.type as any).displayName === displayName,
  )

  return foundChildren.length ? foundChildren : null
}

export const findOtherChildren = (
  children: ReactNode,
  displayNames: string[],
) =>
  Children.toArray(children)
    .filter(isValidElement)
    .filter((child) => {
      const { displayName } = child.type as any
      if (
        typeof displayName === "string" &&
        displayNames.includes(displayName)
      ) {
        return false
      }
      return true
    })

export const formatDate = (date: Date | string): string =>
  new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date))

const formatter = new Intl.RelativeTimeFormat("en-US", {
  numeric: "auto",
})

const DIVISIONS = [
  { amount: 60, name: "seconds" },
  { amount: 60, name: "minutes" },
  { amount: 24, name: "hours" },
  { amount: 7, name: "days" },
  { amount: 4.34524, name: "weeks" },
  { amount: 12, name: "months" },
  { amount: Number.POSITIVE_INFINITY, name: "years" },
] as const

export function formatTimeAgo(date: Date) {
  let duration = (date.getTime() - new Date().getTime()) / 1000

  for (let i = 0; i < DIVISIONS.length; i++) {
    const division = DIVISIONS[i]
    if (Math.abs(duration) < division.amount) {
      return formatter.format(Math.round(duration), division.name)
    }
    duration /= division.amount
  }
}
