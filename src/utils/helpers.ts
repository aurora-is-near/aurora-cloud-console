import { Children, ReactNode, isValidElement } from "react"

export const capitalizeFirstLetter = (string: string) => {
  if (!string || typeof string !== "string") {
    return ""
  }
  return string.charAt(0).toUpperCase() + string.slice(1)
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

const dateTimeFormat = (
  date: Date | string,
  options: Intl.DateTimeFormatOptions,
): string => {
  const dateObj = new Date(date)

  if (Number.isNaN(dateObj.getTime())) {
    console.error(`Attempted to format an invalid date: ${date}`)

    return ""
  }

  return new Intl.DateTimeFormat("en-US", options).format(dateObj)
}

export const formatDate = (date: Date | string): string =>
  dateTimeFormat(date, {
    year: "numeric",
    month: "short",
    day: "numeric",
  })

const formatTime = (date: Date | string): string =>
  dateTimeFormat(date, {
    hour: "numeric",
    minute: "numeric",
  })

export const formatDateAndTime = (date: Date | string): string =>
  `${formatDate(date)} at ${formatTime(date)}`
