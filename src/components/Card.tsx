import { ReactNode } from "react"
import clsx from "clsx"
import { findChildren, findOtherChildren } from "@/utils/helpers"

const HORIZONTAL_PADDING = "px-6 sm:px-5 md:px-6"

const Title = ({
  children,
  tag: Tag = "h2",
  isDisabled,
}: {
  children: ReactNode
  tag?: keyof JSX.IntrinsicElements
  isDisabled?: boolean
}) => (
  <Tag
    className={clsx(
      "text-base font-medium !leading-none sm:text-lg",
      isDisabled ? "text-gray-500" : "text-gray-900",
    )}
  >
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

const Body = ({ children }: { children: ReactNode }) => (
  <div className={clsx(HORIZONTAL_PADDING, "pb-7")}>{children}</div>
)
Body.displayName = "Body"

const Row = ({ children }: { children: ReactNode }) => (
  <div className={clsx(HORIZONTAL_PADDING, "py-4 border-t")}>{children}</div>
)
Row.displayName = "Row"

const Card = ({
  className,
  tag: Tag = "div",
  borderRadius = "md",
  isDisabled,
  children,
  ...rest
}: {
  className?: string
  tag?: keyof JSX.IntrinsicElements
  borderRadius?: "md" | "xl" | "2xl"
  isDisabled?: boolean
  children: ReactNode
  [key: string]: unknown
}) => {
  const title = findChildren(children, "Title")
  const subtitle = findChildren(children, "Subtitle")
  const actions = findChildren(children, "Actions")
  const content = findOtherChildren(children, ["Title", "Subtitle", "Actions"])

  const hasHeader = !!(title || subtitle || actions)

  return (
    <Tag
      className={clsx(
        "border",
        {
          "rounded-md": borderRadius === "md",
          "rounded-xl": borderRadius === "xl",
          "rounded-2xl": borderRadius === "2xl",
          "px-4 py-5 sm:px-5 md:px-6 sm:py-6": !hasHeader,
        },
        isDisabled ? "bg-gray-100" : "bg-white",
        className,
      )}
      {...rest}
    >
      {hasHeader && (
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
Card.Body = Body
Card.Row = Row

export default Card
