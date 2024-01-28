export type MenuItem = {
  name: string
  href: string
  icon: JSX.Element
  disabled?: boolean
}

export type SubMenuItem = Omit<MenuItem, "icon"> & {
  icon?: JSX.Element
}
