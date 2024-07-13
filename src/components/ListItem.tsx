import { Children, ReactNode } from "react"
import clsx from "clsx"
import { findChildren, findOtherChildren } from "@/utils/helpers"

const Title = ({
  children,
  tag: Tag = "p",
}: {
  children: ReactNode
  tag?: keyof JSX.IntrinsicElements
}) => <Tag className="text-sm leading-none text-gray-900">{children}</Tag>

Title.displayName = "Title"

const Subtitle = ({ children }: { children: ReactNode }) => (
  <span className="text-sm leading-none text-gray-500">{children}</span>
)

Subtitle.displayName = "Subtitle"

const Actions = ({ children }: { children: ReactNode }) => (
  <div className="flex items-center space-x-3">{children}</div>
)

Actions.displayName = "Actions"

const ListItem = ({
  children,
}: {
  className?: string
  children: ReactNode
}) => {
  const actions = findChildren(children, "Actions")
  const otherChildren = findOtherChildren(children, ["Actions"])
  const amountOfChildren = Children.count(children)

  return (
    <li
      className={clsx(
        "items-center justify-between grid gap-4 md:gap-6 px-4 sm:px-5 md:px-6 py-4 md:py-[18px]",
        {
          "grid-cols-1": amountOfChildren === 1,
          "grid-cols-2": amountOfChildren === 2,
          "grid-cols-2 sm:grid-cols-3": amountOfChildren === 3,
          "grid-cols-2 md:grid-cols-4": amountOfChildren === 4,
        },
      )}
    >
      {otherChildren}
      <div
        className={clsx(
          "flex items-center",
          amountOfChildren === 3 ? "sm:justify-end" : "justify-end",
        )}
      >
        {actions}
      </div>
    </li>
  )
}

ListItem.Title = Title
ListItem.Subtitle = Subtitle
ListItem.Actions = Actions

export default ListItem
