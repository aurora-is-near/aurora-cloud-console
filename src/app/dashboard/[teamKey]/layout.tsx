import { ReactNode } from "react"
import {
  AdjustmentsHorizontalIcon,
  Cog6ToothIcon,
  CubeIcon,
  ListBulletIcon,
  SquaresPlusIcon,
} from "@heroicons/react/24/outline"
import { HomeIcon } from "@heroicons/react/20/solid"
import { DashboardLayout } from "@/components/DashboardLayout"
import { Borealis } from "@/components/icons"
import { ServicesMenu } from "@/components/navigation/dashboard/ServicesMenu"
import { ListsMenu } from "@/components/navigation/dashboard/ListsMenu"
import { SilosMenu } from "@/components/navigation/dashboard/SilosMenu"
import { DealsMenu } from "@/components/navigation/dashboard/DealsMenu"
import { SettingsMenu } from "@/components/navigation/dashboard/SettingsMenu"
import { AdminMenu } from "@/components/navigation/admin/AdminMenu"
import { isAdmin } from "@/actions/is-admin"
import { MenuItem } from "@/types/menu"
import { DashboardMenu } from "@/components/navigation/dashboard/DashboardMenu"

const Layout = async ({
  children,
  params: { teamKey },
}: {
  children: ReactNode
  params: { teamKey: string }
}) => {
  const isAdminUser = await isAdmin()

  const mainMenuItems: MenuItem[] = [
    {
      name: "Settings",
      href: `/dashboard/${teamKey}/settings`,
      icon: <Cog6ToothIcon />,
      Menu: SettingsMenu,
    },
  ]

  if (isAdminUser) {
    mainMenuItems.unshift({
      name: "Admin",
      href: `/dashboard/${teamKey}/admin`,
      icon: <AdjustmentsHorizontalIcon />,
      Menu: AdminMenu,
    })
  }

  return (
    <DashboardLayout
      fallbackMenu={{
        name: "Explore Aurora",
        href: `/dashboard/${teamKey}`,
        icon: <HomeIcon />,
        Menu: DashboardMenu,
      }}
      sidebarMenuItems={[
        {
          name: "Borealis",
          href: `/dashboard/${teamKey}/borealis/deals`,
          icon: <Borealis />,
          Menu: DealsMenu,
        },
        {
          name: "Silos",
          href: `/dashboard/${teamKey}/silos`,
          icon: <CubeIcon />,
          Menu: SilosMenu,
        },
        {
          name: "Lists",
          href: `/dashboard/${teamKey}/lists`,
          icon: <ListBulletIcon />,
          Menu: ListsMenu,
        },
        {
          name: "Services",
          href: `/dashboard/${teamKey}/services`,
          icon: <SquaresPlusIcon />,
          Menu: ServicesMenu,
        },
      ]}
      mainMenuItems={mainMenuItems}
    >
      {children}
    </DashboardLayout>
  )
}

export default Layout
