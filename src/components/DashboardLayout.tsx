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
    <div className="w-full">
      <MainMenu mainMenuItems={mainMenuItems} extraMenuItems={extraMenuItems} />
      <div className="w-full lg:flex lg:flex-row lg:h-screen overflow-hidden">
        <MobileMenu menuItems={menuItems} />
        {!!menuItems.length && <SubMenuNav menuItems={menuItems} />}
        <div className="w-full">{children}</div>
      </div>
    </div>
  )
}
