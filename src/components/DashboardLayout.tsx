import { ReactNode } from "react"
import { MainMenu } from "@/components/menu/MainMenu"
import { MenuItem, SidebarMenuItem } from "@/types/menu"
import { SidebarMenu } from "@/components/menu/SidebarMenu"

type DashboardLayoutProps = {
  children: ReactNode
  mainMenuItems?: MenuItem[]
  sidebarMenu?: {
    heading: string
    action?: JSX.Element
    menuItems: SidebarMenuItem[]
  }
}

export const DashboardLayout = ({
  children,
  sidebarMenu,
  mainMenuItems = [],
}: DashboardLayoutProps) => {
  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      <MainMenu menuItems={mainMenuItems} />
      <div className="w-full h-full flex flex-row bg-slate-50 overflow-hidden">
        {!!sidebarMenu?.menuItems.length && (
          <SidebarMenu
            heading={sidebarMenu.heading}
            menuItems={sidebarMenu.menuItems}
            action={sidebarMenu.action}
          />
        )}
        <div className="w-full">{children}</div>
      </div>
    </div>
  )
}
