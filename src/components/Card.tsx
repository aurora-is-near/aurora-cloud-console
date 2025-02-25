import { ReactNode } from "react"
import clsx from "clsx"
import { findChildren, findOtherChildren } from "@/utils/helpers"

const HORIZONTAL_PADDING = "px-5 md:px-6"

const Title = ({
  children,
  tag: Tag = "h2",
  isDisabled,
  size = "medium",
}: {
  children: ReactNode
  tag?: keyof JSX.IntrinsicElements
  isDisabled?: boolean
  size?: "small" | "medium" | "large"
}) => (
  <Tag
    className={clsx(
      "text-base font-medium !leading-none",
      size === "medium" && "sm:text-lg",
      size === "large" && "md:text-xl",
      isDisabled ? "text-slate-500" : "text-slate-900",
    )}
  >
    {children}
  </Tag>
)

Title.displayName = "Title"

const Subtitle = ({ children }: { children: ReactNode }) => (
  <p className="mt-1 text-sm leading-5 text-slate-500 sm:mt-2">{children}</p>
)

Subtitle.displayName = "Subtitle"

const Actions = ({ children }: { children: ReactNode }) => (
  <div className="flex items-center space-x-3">{children}</div>
)

Actions.displayName = "Actions"

const Body = ({ children }: { children: ReactNode }) => (
  <div className={clsx(HORIZONTAL_PADDING, "pb-5")}>{children}</div>
)

Body.displayName = "Body"

const Row = ({ children }: { children: ReactNode }) => (
  <div className={clsx(HORIZONTAL_PADDING, "py-4 border-t")}>{children}</div>
)

const Header = ({ children }: { children: ReactNode }) => (
  <div className="pb-5">{children}</div>
)

Header.displayName = "Header"

const Cell = ({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) => (
  <div className={clsx(HORIZONTAL_PADDING, "py-4 border-t", className)}>
    {children}
  </div>
)

Cell.displayName = "Cell"

const Card = ({
  className,
  tag: Tag = "div",
  borderRadius = "md",
  isDisabled,
  isClickable,
  children,
  ...rest
}: {
  className?: string
  tag?: keyof JSX.IntrinsicElements
  borderRadius?: "md" | "xl" | "2xl"
  isDisabled?: boolean
  isClickable?: boolean
  children: ReactNode
  [key: string]: unknown
}) => {
  const title = findChildren(children, "Title")
  const subtitle = findChildren(children, "Subtitle")
  const actions = findChildren(children, "Actions")
  const head = findChildren(children, "Header")
  const content = findOtherChildren(children, [
    "Title",
    "Subtitle",
    "Actions",
    "Header",
  ])

  const hasHeader = !!(title ?? subtitle ?? actions)

  return (
    <Tag
      className={clsx(
        "border border-slate-200 shadow-sm",
        {
          "rounded-[10px]": borderRadius === "md",
          "rounded-xl": borderRadius === "xl",
          "rounded-2xl": borderRadius === "2xl",
          "p-5 md:p-6": !hasHeader,
        },
        isDisabled ? "bg-gray-100" : "bg-white",
        isClickable
          ? "transition-shadow transition-border-color hover:transition-shadow hover:transition-border-color hover:shadow-3xl hover:border-slate-300"
          : "",
        className,
      )}
      {...rest}
    >
      {hasHeader && (
        <header className="flex flex-col items-start justify-between px-4 py-5 gap-y-3 sm:gap-y-0 sm:flex-row sm:px-5 md:px-6 sm:py-6">
          <div className="sm:self-center">
            {head}
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
Card.Cell = Cell
Card.Header = Header

export default Card
