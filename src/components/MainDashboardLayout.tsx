import { ReactNode } from "react"
import { HomeIcon } from "@heroicons/react/20/solid"
import { DashboardLayout } from "@/components/DashboardLayout"
import { MenuItem } from "@/types/menu"
import { Silo } from "@/types/types"
import {
  Configuration,
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
  const siloPrefix = silo ? `/silos/${silo.id}` : ""
  const sidebarMenuItems: MenuItem[] = [
    {
      name: "Dashboard",
      href: `/dashboard/${teamKey}${siloPrefix}`,
      icon: <HomeIcon />,
    },
  ]

  if (silo) {
    sidebarMenuItems.push(
      {
        name: "Monitoring",
        href: `/dashboard/${teamKey}${siloPrefix}/monitoring`,
        icon: <Monitoring />,
      },
      {
        name: "Configuration",
        href: `/dashboard/${teamKey}${siloPrefix}/configuration`,
        icon: <Configuration />,
      },
    )
  }

  sidebarMenuItems.push(
    {
      name: "Gas Abstraction",
      href: `/dashboard/${teamKey}${siloPrefix}/gas-abstraction`,
      icon: <GasAbstraction />,
    },
    {
      name: "Integrations",
      href: `/dashboard/${teamKey}${siloPrefix}/integrations`,
      icon: <Integrations />,
    },
  )

  return (
    <DashboardLayout
      teamKey={teamKey}
      showAdminMenu={showAdminMenu}
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
