import { ReactNode } from "react"
import clsx from "clsx"
import { findChildren, findOtherChildren } from "@/utils/helpers"

const Title = ({
  children,
  tag: Tag = "h2",
}: {
  children: ReactNode
  tag?: keyof JSX.IntrinsicElements
}) => (
  <Tag className="text-base font-medium !leading-none text-gray-900 sm:text-lg">
    {children}
  </Tag>
)
Title.displayName = "Title"

const Subtitle = ({ children }: { children: ReactNode }) => (
  <p className="mt-1 text-sm leading-5 text-gray-500 sm:mt-2">{children}</p>
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
  const content = findOtherChildren(children, ["Title", "Subtitle", "Actions"])

  return (
    <Tag
      className={clsx("rounded-md border", className, bgClassName)}
      {...rest}
    >
      {(title || subtitle || actions) && (
        <header className="flex flex-col items-start justify-between px-4 py-5 gap-y-3 sm:gap-y-0 sm:flex-row sm:px-5 md:px-6 sm:py-6">
          <div className="sm:self-center">
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
