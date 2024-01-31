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

export const formatDate = (date: Date | string): string =>
  new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date))
