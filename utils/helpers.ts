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
    value.length - backChars
  )}`
}

export const findChild = (children: ReactNode, displayName: string) =>
  Children.toArray(children).find(
    (child) =>
      isValidElement(child) && (child.type as any).displayName === displayName
  )
