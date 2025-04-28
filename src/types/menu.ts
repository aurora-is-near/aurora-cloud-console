import { ReactNode } from "react"

export type MenuItem = {
  href: string
  name: string
  icon?: ReactNode
  items?: Omit<MenuItem, "items" | "icon">[]
  variant?: "primary" | "secondary" | "compact"
  isExternal?: boolean
  getNotificationCount?: () => number | Promise<number>
}

export type MenuSection = {
  heading?: string
  items: MenuItem[]
}
