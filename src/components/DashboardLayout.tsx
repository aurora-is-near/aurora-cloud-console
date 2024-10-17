import { ReactNode, useMemo } from "react"
import {
  AdjustmentsHorizontalIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline"
import { MainMenu } from "@/components/menu/MainMenu"
import { MenuItem, MenuSection } from "@/types/menu"
import { SidebarMenu } from "@/components/menu/SidebarMenu"

type DashboardLayoutProps = {
  teamKey?: string
  showAdminMenu?: boolean
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
    if (!teamKey) {
      return []
    }

    const items: MenuItem[] = [
      {
        name: "Settings",
        href: `/dashboard/${teamKey}/settings`,
        icon: <Cog6ToothIcon />,
      },
    ]

    if (showAdminMenu) {
      items.unshift({
        name: "Admin",
        href: `/dashboard/${teamKey}/admin`,
        icon: <AdjustmentsHorizontalIcon />,
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
    </div>
  )
}
