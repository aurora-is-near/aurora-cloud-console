import { ReactNode } from "react"
import { findChildren, findOtherChildren } from "@/utils/helpers"
import clsx from "clsx"

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

  return (
    <li className="items-center justify-between px-6 py-[18px] grid grid-cols-4 gap-x-6">
      {otherChildren}
      <div
        className={clsx("flex items-center justify-end", {
          "col-span-3": otherChildren.length === 1,
          "col-span-2": otherChildren.length === 2,
          "col-span-1": otherChildren.length === 3,
        })}
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
