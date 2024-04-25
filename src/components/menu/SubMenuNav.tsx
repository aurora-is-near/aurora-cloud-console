"use client"

import { usePathname } from "next/navigation"
import Heading from "../Heading"
import { MenuItem } from "@/types/menu"

const SubMenuNav = ({ menuItems }: { menuItems: MenuItem[] }) => {
  const pathname = usePathname()
  const activeMenu = menuItems.find((item) => pathname.startsWith(item.href))
  const { name, SubMenu } = activeMenu ?? {}

  return (
    <aside className="inset-y-0 flex-col hidden p-6 overflow-y-auto bg-white border-r border-gray-200 w-72 lg:flex gap-y-7 min-w-[250px]">
      <Heading>{name}</Heading>

      <nav className="flex flex-col flex-1 gap-y-4">
        {SubMenu && <SubMenu />}
      </nav>
    </aside>
  )
}

export default SubMenuNav
