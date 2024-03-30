import { ReactNode } from "react"
import { notFound } from "next/navigation"
import { isAdmin } from "@/actions/is-admin"
import { DashboardLayout } from "@/components/DashboardLayout"
import { ToastSettingsProvider } from "@/providers/ToastSettingsProvider"
import {
  ArrowRightOnRectangleIcon,
  CurrencyDollarIcon,
  TicketIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline"
import { AdminTeamsMenu } from "@/components/navigation/admin/AdminTeamsMenu"
import { AdminTokensMenu } from "@/components/navigation/admin/AdminTokensMenu"
import { Silos } from "@/components/icons"
import { AdminSilosMenu } from "@/components/navigation/admin/AdminSilosMenu"
import { AdminDealsMenu } from "@/components/navigation/admin/AdminDealsMenu"
import { LOGOUT_ROUTE } from "@/constants/routes"

// Opt out of caching for all admin routes.
// https://nextjs.org/docs/app/building-your-application/caching#opting-out-1
export const dynamic = "force-dynamic"

export default async function Layout({ children }: { children: ReactNode }) {
  if (!(await isAdmin())) {
    notFound()
  }

  return (
    <ToastSettingsProvider position="bottom-right">
      <DashboardLayout
        mainMenuItems={[
          {
            name: "Teams",
            href: "/admin/teams",
            icon: <UserGroupIcon />,
            SubMenu: AdminTeamsMenu,
          },
          {
            name: "Tokens",
            href: "/admin/tokens",
            icon: <CurrencyDollarIcon />,
            SubMenu: AdminTokensMenu,
          },
          {
            name: "Silos",
            href: "/admin/silos",
            icon: <Silos />,
            SubMenu: AdminSilosMenu,
          },
          {
            name: "Deals",
            href: "/admin/deals",
            icon: <TicketIcon />,
            SubMenu: AdminDealsMenu,
          },
        ]}
        extraMenuItems={[
          {
            name: "Log out",
            href: LOGOUT_ROUTE,
            icon: <ArrowRightOnRectangleIcon />,
          },
        ]}
      >
        {children}
      </DashboardLayout>
    </ToastSettingsProvider>
  )
}
