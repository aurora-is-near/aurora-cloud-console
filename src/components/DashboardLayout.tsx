import { ReactNode } from "react"
import { MainMenu } from "@/components/menu/MainMenu"
import { MenuItem } from "@/types/menu"
import { SidebarMenu } from "@/components/menu/SidebarMenu"

type DashboardLayoutProps = {
  children: ReactNode
  sidebarMenuItems?: MenuItem[]
  mainMenuItems?: MenuItem[]
  fallbackMenu?: MenuItem
}

export const DashboardLayout = ({
  children,
  sidebarMenuItems = [],
  mainMenuItems = [],
  fallbackMenu,
}: DashboardLayoutProps) => {
  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      <MainMenu menuItems={mainMenuItems} />
      <div className="w-full h-full flex flex-row bg-slate-50 overflow-hidden">
        {!!sidebarMenuItems.length && (
          <SidebarMenu
            menuItems={sidebarMenuItems}
            fallbackMenu={fallbackMenu}
          />
        )}
        <div className="w-full">{children}</div>
      </div>
    </div>
  )
}
