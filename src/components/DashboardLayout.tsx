import { ReactNode } from "react"
import MainMenu from "@/components/menu/MainMenu"
import MobileMenu from "@/components/menu/MobileMenu"
import SubMenuNav from "@/components/menu/SubMenuNav"
import { MenuItem } from "@/types/menu"

type DashboardLayoutProps = {
  mainMenuItems: MenuItem[]
  extraMenuItems: MenuItem[]
  children: ReactNode
}

export const DashboardLayout = ({
  children,
  mainMenuItems,
  extraMenuItems,
}: DashboardLayoutProps) => {
  return (
    <div className="w-full lg:flex lg:flex-row lg:h-screen overflow-hidden">
      <MainMenu mainMenuItems={mainMenuItems} extraMenuItems={extraMenuItems} />
      <MobileMenu menuItems={[...mainMenuItems, ...extraMenuItems]} />
      <SubMenuNav />
      <div className="w-full">{children}</div>
    </div>
  )
}
