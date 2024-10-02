"use client"

import { usePathname } from "next/navigation"
import { MenuItem } from "@/types/menu"
import Heading from "../Heading"

export const SidebarMenu = ({
  menuItems,
  fallbackMenu,
}: {
  menuItems: MenuItem[]
  fallbackMenu?: MenuItem
}) => {
  const pathname = usePathname()
  const activeMenu = menuItems.find((item) => pathname.startsWith(item.href))

  const { name, SubMenu } = activeMenu ?? fallbackMenu ?? {}

  if (!SubMenu) {
    return null
  }

  return (
    <aside className="inset-y-0 flex-col hidden p-6 overflow-y-auto bg-white border-r border-slate-200 w-72 min-w-72 lg:flex gap-y-7">
      <Heading>{name}</Heading>

      <nav className="flex flex-col flex-1 gap-y-4">
        {SubMenu && <SubMenu />}
      </nav>
    </aside>
  )
}
