import { findChild } from "@/utils/helpers"
import { ReactNode } from "react"

const Title = ({
  children,
  tag: Tag = "p",
}: {
  children: ReactNode
  tag?: keyof JSX.IntrinsicElements
}) => <Tag className="w-64 text-gray-900 text-sm leading-none">{children}</Tag>
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
  const title = findChild(children, "Title")
  const subtitle = findChild(children, "Subtitle")
  const actions = findChild(children, "Actions")

  return (
    <li className="flex items-center justify-between px-6 py-[18px]">
      <div className="flex space-x-6">
        {title}
        {subtitle}
      </div>
      {actions}
    </li>
  )
}
ListItem.Title = Title
ListItem.Subtitle = Subtitle
ListItem.Actions = Actions

export default ListItem
