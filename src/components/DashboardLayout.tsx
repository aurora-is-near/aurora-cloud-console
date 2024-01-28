import { ReactNode } from "react"
import { Toaster } from "react-hot-toast"
import MainMenu from "@/components/menu/MainMenu"
import MobileMenu from "@/components/menu/MobileMenu"
import SubMenuNav from "@/components/menu/SubMenuNav"
import { MenuItem } from "@/types/menu"

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

      <main className="max-h-full overflow-auto flex-1">
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 5000,
          }}
        />
        <div className="relative px-4 py-6 md:px-6 lg:px-8 min-h-screen flex flex-col">
          {children}
        </div>
      </main>
    </div>
  )
}
