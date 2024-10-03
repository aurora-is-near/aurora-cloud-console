import { ComponentType, ReactNode } from "react"

export type MenuItem = {
  name: string
  href: string
  icon: JSX.Element
  disabled?: boolean
  Menu: ComponentType
}

export type SidebarMenuItem = {
  href: string
  name: string
  icon?: ReactNode
  disabled?: boolean
}
