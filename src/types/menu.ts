import { ReactNode } from "react"

export type MenuItem = {
  href: string
  name: string
  icon?: ReactNode
  items?: Omit<MenuItem, "items" | "icon">[]
}

export type MenuSection = {
  heading?: string
  items: MenuItem[]
}
