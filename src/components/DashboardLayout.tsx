import { ReactNode } from "react"
import { MainMenu } from "@/components/menu/MainMenu"
import { MenuSection } from "@/types/menu"
import { SidebarMenu } from "@/components/menu/SidebarMenu"
import Helpscout from "@/components/Helpscout"
import { TopPageBanner } from "@/components/TopPageBanner"
import type { Silo, Team } from "@/types/types"

type DashboardLayoutProps = {
  team?: Team
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
  team,
  silo,
  showWelcomeBanner = false,
  children,
  sidebarMenu,
}: DashboardLayoutProps) => {
  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      {showWelcomeBanner && team && !team?.onboarding_status && !silo && (
        <TopPageBanner team={team} />
      )}
      <MainMenu teamKey={team?.team_key} />
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
      {process.env.NODE_ENV === "production" && !!team?.team_key && (
        <Helpscout />
      )}
    </div>
  )
}
