import { ReactNode, useMemo } from "react"
import {
  AdjustmentsHorizontalIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline"
import { MainMenu } from "@/components/menu/MainMenu"
import { MenuItem, MenuSection } from "@/types/menu"
import { SidebarMenu } from "@/components/menu/SidebarMenu"
import Helpscout from "@/components/Helpscout"

type DashboardLayoutProps = {
  teamKey?: string
  showAdminMenu: boolean
  children: ReactNode
  sidebarMenu?: {
    heading: string
    action?: JSX.Element
    sections: MenuSection[]
  }
}

export const DashboardLayout = ({
  teamKey,
  showAdminMenu,
  children,
  sidebarMenu,
}: DashboardLayoutProps) => {
  const mainMenuItems = useMemo(() => {
    const items: MenuItem[] = []

    if (showAdminMenu) {
      items.push({
        name: "Admin",
        href: "/admin",
        icon: <AdjustmentsHorizontalIcon />,
      })
    }

    if (teamKey) {
      items.push({
        name: "Settings",
        href: `/dashboard/${teamKey}/settings/team`,
        icon: <Cog6ToothIcon />,
      })
    }

    return items
  }, [teamKey, showAdminMenu])

  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      <MainMenu menuItems={mainMenuItems} />
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
      {process.env.NODE_ENV === "production" && !!teamKey && !showAdminMenu && (
        <Helpscout />
      )}
    </div>
  )
}
