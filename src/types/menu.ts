import { ComponentType } from "react"

export type MenuItem = {
  name: string
  href: string
  icon: JSX.Element
  disabled?: boolean
  Menu: ComponentType
}
