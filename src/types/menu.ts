import { ReactNode } from "react"

export type MenuItem = {
  href: string
  name: string
  icon?: ReactNode
  disabled?: boolean
}
