import { Children, ReactNode, isValidElement } from "react"
import clsx from "clsx"

const findChild = (children: ReactNode, displayName: string) =>
  Children.toArray(children).find(
    (child) =>
      isValidElement(child) && (child.type as any).displayName === displayName
  )

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
  tag: Tag = "div",
  children,
  ...rest
}: {
  className?: string
  tag?: keyof JSX.IntrinsicElements
  children: ReactNode
  [key: string]: unknown
}) => {
  const title = findChild(children, "Title")
  const subtitle = findChild(children, "Subtitle")
  const actions = findChild(children, "Actions")
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
      className={clsx("overflow-hidden rounded-md bg-white shadow", className)}
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
