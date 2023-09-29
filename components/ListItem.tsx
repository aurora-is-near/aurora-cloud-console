import { Children, ReactNode, isValidElement } from "react"
import { findChildren } from "@/utils/helpers"
import clsx from "clsx"

const Title = ({
  children,
  tag: Tag = "p",
}: {
  children: ReactNode
  tag?: keyof JSX.IntrinsicElements
}) => <Tag className="text-gray-900 text-sm leading-none">{children}</Tag>
Title.displayName = "Title"

const Subtitle = ({ children }: { children: ReactNode }) => (
  <span className="text-gray-500 text-sm leading-none">{children}</span>
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
  const otherChildren = Children.toArray(children)
    .filter(isValidElement)
    .filter((child) => {
      const { displayName } = child.type as any
      return displayName !== "Actions"
    })

  const hasOtherChildren = otherChildren.length > 0

  return (
    <li className="items-center justify-between px-6 py-[18px] grid grid-cols-4 gap-x-6">
      {otherChildren}
      <div
        className={clsx(
          "flex items-center justify-end",
          hasOtherChildren ? "col-span-1" : "col-span-2"
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
