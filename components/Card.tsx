import { Children, ReactNode, isValidElement } from "react"
import clsx from "clsx"
import { findChildren } from "@/utils/helpers"

const Title = ({
  children,
  tag: Tag = "h2",
}: {
  children: ReactNode
  tag?: keyof JSX.IntrinsicElements
}) => (
  <Tag className="text-lg leading-none text-gray-900 font-medium">
    {children}
  </Tag>
)
Title.displayName = "Title"

const Subtitle = ({ children }: { children: ReactNode }) => (
  <p className="mt-2 text-gray-500 text-sm leading-5">{children}</p>
)
Subtitle.displayName = "Subtitle"

const Actions = ({ children }: { children: ReactNode }) => (
  <div className="flex items-center space-x-3">{children}</div>
)
Actions.displayName = "Actions"

const Card = ({
  className,
  bgClassName = "bg-white",
  tag: Tag = "div",
  children,
  ...rest
}: {
  className?: string
  bgClassName?: string
  tag?: keyof JSX.IntrinsicElements
  children: ReactNode
  [key: string]: unknown
}) => {
  const title = findChildren(children, "Title")
  const subtitle = findChildren(children, "Subtitle")
  const actions = findChildren(children, "Actions")
  const content = Children.toArray(children)
    .filter(isValidElement)
    .filter((child) => {
      const { displayName } = child.type as any
      if (
        typeof displayName === "string" &&
        ["Title", "Subtitle", "Actions"].includes(displayName)
      ) {
        return false
      }
      return true
    })

  return (
    <Tag
      className={clsx(
        "overflow-hidden rounded-md border",
        className,
        bgClassName
      )}
      {...rest}
    >
      {(title || subtitle || actions) && (
        <header className="flex justify-between items-start p-6">
          <div className="self-center">
            {title}
            {subtitle}
          </div>
          {actions}
        </header>
      )}
      {content}
    </Tag>
  )
}
Card.Title = Title
Card.Subtitle = Subtitle
Card.Actions = Actions

export default Card
