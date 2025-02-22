import { ReactNode } from "react"
import { MainMenu } from "@/components/menu/MainMenu"
import { MenuSection } from "@/types/menu"
import { SidebarMenu } from "@/components/menu/SidebarMenu"
import Helpscout from "@/components/Helpscout"
import { TopPageBanner } from "@/components/TopPageBanner"
import type { Silo } from "@/types/types"

type DashboardLayoutProps = {
  teamKey?: string
  silo?: Silo
  showWelcomeBanner?: boolean
  children: ReactNode
  sidebarMenu?: {
    heading: string
    action?: JSX.Element
    sections: MenuSection[]
  }
}

export const DashboardLayout = ({
  teamKey,
  silo,
  showWelcomeBanner = false,
  children,
  sidebarMenu,
}: DashboardLayoutProps) => {
  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      {showWelcomeBanner && !silo?.id && !!teamKey && (
        <TopPageBanner teamKey={teamKey} />
      )}
      <MainMenu teamKey={teamKey} />
      <div className="w-full h-full flex flex-row bg-slate-50 overflow-hidden">
        {!!sidebarMenu?.sections.length && (
          <SidebarMenu
            heading={sidebarMenu.heading}
            sections={sidebarMenu.sections}
            action={sidebarMenu.action}
          />
        )}
        <div className="w-full">{children}</div>
      </div>
      {process.env.NODE_ENV === "production" && !!teamKey && <Helpscout />}
    </div>
  )
}
