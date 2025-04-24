import { cloneElement, ReactNode, useMemo } from "react"
import parseHtml from "html-react-parser"

const CONTENT_CLASS_NAMES: { [element: string]: string } = {
  p: "text-base mb-6",
  ul: "mb-6 list-disc pl-6",
  ol: "mb-6 list-decimal pl-6",
  li: "text-lg mb-1",
  strong: "font-bold",
  a: "cursor-pointer underline hover:no-underline",
  h2: "text-3xl lg:text-4xl mb-4 lg:mb-6 font-bold mt-8",
  h3: "text-2xl lg:text-3xl mb-3 lg:mb-6 font-bold mt-8",
  h4: "text-xl lg:text-2xl mb-2 lg:mb-4 font-bold mt-8",
}

const isElement = (item: ReactNode): item is JSX.Element =>
  !!item && typeof item === "object" && "$$typeof" in item

const applyStyles = (
  element?: string | JSX.Element | JSX.Element[],
): ReactNode => {
  if (!element || typeof element === "string") {
    return element
  }

  if (Array.isArray(element)) {
    return element.map(applyStyles)
  }

  return cloneElement(element, {
    children: applyStyles(element.props.children),
    className: CONTENT_CLASS_NAMES[element.type],
  })
}

const trimExternalClasses = (element: ReactNode, scope: "t" | "b") => {
  if (!isElement(element)) {
    return element
  }

  // Trim any external margin or padding classes (i.e. those on the first or
  // last element) so that we can more easily control the spacing of the entire
  // content block from the outside.
  return cloneElement(element, {
    className: element.props.className.replace(
      new RegExp(`((xs|sm|md|lg|xl|2xl):)?[mp]${scope}[^s$]+`, "g"),
      "",
    ),
  })
}

const parseContent = (html?: string) => {
  const parsedHtml = parseHtml(html ?? "")
  const arr = Array.isArray(parsedHtml) ? parsedHtml : [parsedHtml]

  const content = arr.map(applyStyles)

  content[0] = trimExternalClasses(content[0], "t")
  content[content.length - 1] = trimExternalClasses(
    content[content.length - 1],
    "b",
  )

  return { content }
}

export const useHtmlContent = (html?: string) => {
  return useMemo(() => parseContent(html), [html])
}
