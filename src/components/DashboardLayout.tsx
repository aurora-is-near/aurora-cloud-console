import { ReactNode } from "react"
import { Toaster } from "react-hot-toast"
import MainMenu from "@/components/menu/MainMenu"
import MobileMenu from "@/components/menu/MobileMenu"
import SubMenuNav from "@/components/menu/SubMenuNav"
import { MenuItem } from "@/types/menu"
import { DashboardFooterPortal } from "@/components/DashboardFooterPortal"

type DashboardLayoutProps = {
  isAdmin?: boolean
  mainMenuItems: MenuItem[]
  extraMenuItems: MenuItem[]
  children: ReactNode
}

export const DashboardLayout = ({
  children,
  isAdmin,
  mainMenuItems,
  extraMenuItems,
}: DashboardLayoutProps) => {
  return (
    <div className="w-full lg:flex lg:flex-row lg:h-screen overflow-hidden">
      <MainMenu mainMenuItems={mainMenuItems} extraMenuItems={extraMenuItems} />
      <MobileMenu
        isAdmin={isAdmin}
        menuItems={[...mainMenuItems, ...extraMenuItems]}
      />
      <SubMenuNav isAdmin={isAdmin} />

      {children}
    </div>
  )
}
