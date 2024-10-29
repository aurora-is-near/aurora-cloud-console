import { Children, isValidElement, ReactElement, ReactNode } from "react"
import { logger } from "@/logger"

const hasDisplayName = (
  child: ReactNode,
): child is ReactNode & { type: { displayName?: string } } =>
  isValidElement(child) && typeof child.type !== "string"

export const findChildren = <P>(
  children: ReactNode,
  displayName: string,
): ReactElement<P>[] | null => {
  const foundChildren = Children.toArray(children).filter(
    (child) => hasDisplayName(child) && child.type.displayName === displayName,
  )

  return foundChildren.length ? (foundChildren as ReactElement<P>[]) : null
}

export const findOtherChildren = (
  children: ReactNode,
  displayNames: string[],
) =>
  Children.toArray(children).filter((child) => {
    if (
      hasDisplayName(child) &&
      typeof child.type.displayName === "string" &&
      displayNames.includes(child.type.displayName)
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
    logger.error(`Attempted to format an invalid date: ${date}`)

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
