import { ReactNode } from "react"
import {
  Cog6ToothIcon,
  SquaresPlusIcon,
  ListBulletIcon,
} from "@heroicons/react/24/outline"
import { DashboardLayout } from "@/components/DashboardLayout"
import { Borealis, Silos } from "@/components/icons"
import { ServicesMenu } from "@/components/navigation/dashboard/ServicesMenu"
import { ListsMenu } from "@/components/navigation/dashboard/ListsMenu"
import { SilosMenu } from "@/components/navigation/dashboard/SilosMenu"
import { DealsMenu } from "@/components/navigation/dashboard/DealsMenu"
import { SettingsMenu } from "@/components/navigation/dashboard/SettingsMenu"
import { MobileDealsMenu } from "@/components/navigation/dashboard/mobile/MobileDealsMenu"
import { MobileListsMenu } from "@/components/navigation/dashboard/mobile/MobileListsMenu"
import { MobileSettingsMenu } from "@/components/navigation/dashboard/mobile/MobileSettingsMenu"

export default async function Layout({
  children,
  params: { teamKey },
}: {
  children: ReactNode
  params: { teamKey: string }
}) {
  return (
    <DashboardLayout
      mainMenuItems={[
        {
          name: "Borealis",
          href: `/dashboard/${teamKey}/borealis/deals`,
          icon: <Borealis />,
          SubMenu: DealsMenu,
          MobileSubMenu: MobileDealsMenu,
        },
        {
          name: "Silos",
          href: `/dashboard/${teamKey}/silos`,
          icon: <Silos />,
          SubMenu: SilosMenu,
        },
        {
          name: "Lists",
          href: `/dashboard/${teamKey}/lists`,
          icon: <ListBulletIcon />,
          SubMenu: ListsMenu,
          MobileSubMenu: MobileListsMenu,
        },
        {
          name: "Services",
          href: `/dashboard/${teamKey}/services`,
          icon: <SquaresPlusIcon />,
          SubMenu: ServicesMenu,
        },
      ]}
      extraMenuItems={[
        {
          name: "Settings",
          href: `/dashboard/${teamKey}/settings`,
          icon: <Cog6ToothIcon />,
          SubMenu: SettingsMenu,
          MobileSubMenu: MobileSettingsMenu,
        },
      ]}
    >
      {children}
    </DashboardLayout>
  )
}
