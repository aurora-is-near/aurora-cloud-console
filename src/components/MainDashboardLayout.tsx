import { ReactNode } from "react"
import {
  AdjustmentsHorizontalIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline"
import { HomeIcon } from "@heroicons/react/20/solid"
import { DashboardLayout } from "@/components/DashboardLayout"
import { SettingsMenu } from "@/components/navigation/dashboard/SettingsMenu"
import { AdminMenu } from "@/components/navigation/admin/AdminMenu"
import { MenuItem, SidebarMenuItem } from "@/types/menu"
import { Silo } from "@/types/types"
import {
  GasAbstraction,
  Integrations,
  Monitoring,
} from "../../public/static/v2/images/menuIcons"

type MainDashboardLayoutProps = {
  teamKey: string
  silo?: Silo
  showAdminMenu: boolean
  children: ReactNode
  sidebarAction: JSX.Element
}

export const MainDashboardLayout = async ({
  teamKey,
  silo,
  showAdminMenu,
  children,
  sidebarAction,
}: MainDashboardLayoutProps) => {
  const mainMenuItems: MenuItem[] = [
    {
      name: "Settings",
      href: `/dashboard/${teamKey}/settings`,
      icon: <Cog6ToothIcon />,
      Menu: SettingsMenu,
    },
  ]

  if (showAdminMenu) {
    mainMenuItems.unshift({
      name: "Admin",
      href: `/dashboard/${teamKey}/admin`,
      icon: <AdjustmentsHorizontalIcon />,
      Menu: AdminMenu,
    })
  }

  const siloPrefix = silo ? `/silos/${silo.id}` : ""
  const sidebarMenuItems: SidebarMenuItem[] = [
    {
      name: "Dashboard",
      href: `/dashboard/${teamKey}${siloPrefix}`,
      icon: <HomeIcon />,
    },
  ]

  if (silo) {
    sidebarMenuItems.push({
      name: "Monitoring",
      href: `/dashboard/${teamKey}${siloPrefix}/monitoring`,
      icon: <Monitoring />,
    })
  }

  sidebarMenuItems.push(
    {
      name: "Gas Abstraction",
      href: `/dashboard/${teamKey}${siloPrefix}/gas-abstraction`,
      icon: <GasAbstraction />,
    },
    {
      disabled: true,
      name: "Integrations",
      href: `/dashboard/${teamKey}${siloPrefix}/integrations`,
      icon: <Integrations />,
    },
  )

  return (
    <DashboardLayout
      mainMenuItems={mainMenuItems}
      sidebarMenu={{
        heading: silo?.name ?? "Explore Aurora",
        action: sidebarAction,
        menuItems: sidebarMenuItems,
      }}
    >
      {children}
    </DashboardLayout>
  )
}
