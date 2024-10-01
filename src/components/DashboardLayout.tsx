import { ReactNode } from "react"
import { MainMenu } from "@/components/menu/MainMenu"
import MobileMenu from "@/components/menu/MobileMenu"
import SubMenuNav from "@/components/menu/SubMenuNav"
import { MenuItem } from "@/types/menu"

type DashboardLayoutProps = {
  children: ReactNode
  mainMenuItems?: MenuItem[]
  extraMenuItems?: MenuItem[]
}

export const DashboardLayout = ({
  children,
  mainMenuItems = [],
  extraMenuItems = [],
}: DashboardLayoutProps) => {
  const menuItems = [...mainMenuItems, ...extraMenuItems]

  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      <MainMenu menuItems={extraMenuItems} />
      <MobileMenu menuItems={menuItems} />
      <div className="w-full h-full flex flex-row bg-slate-50 overflow-hidden">
        {!!menuItems.length && <SubMenuNav menuItems={menuItems} />}
        <div className="w-full">{children}</div>
      </div>
    </div>
  )
}
