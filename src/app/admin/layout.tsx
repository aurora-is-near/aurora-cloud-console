import { ReactNode } from "react"
import {
  BellAlertIcon,
  CircleStackIcon,
  CubeIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  FlagIcon,
  LinkIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline"
import { redirect } from "next/navigation"
import { DashboardLayout } from "@/components/DashboardLayout"
import { UNAUTHORISED_ROUTE } from "@/constants/routes"
import { getAuthUser } from "@/actions/auth-user/get-auth-user"
import { isAdminUser } from "@/utils/admin"
import { Oracle } from "../../../public/static/v2/images/menuIcons"

const Layout = async ({ children }: { children: ReactNode }) => {
  const authUser = await getAuthUser()

  if (!isAdminUser(authUser?.email)) {
    return redirect(UNAUTHORISED_ROUTE)
  }

  return (
    <DashboardLayout
      authUser={authUser}
      sidebarMenu={{
        heading: "Admin",
        sections: [
          {
            items: [
              {
                name: "Teams",
                href: "/admin/teams",
                icon: <UserGroupIcon />,
              },
              {
                name: "Silos",
                href: "/admin/silos",
                icon: <CubeIcon />,
              },
              {
                name: "Blockscout",
                href: "/admin/blockscout",
                icon: <CircleStackIcon />,
              },
              {
                name: "Bridged tokens",
                href: "/admin/bridged-tokens",
                icon: <LinkIcon />,
              },
              {
                name: "Oracle tokens",
                href: "/admin/oracle/tokens",
                icon: <Oracle />,
              },
              {
                name: "Orders",
                href: "/admin/orders",
                icon: <CurrencyDollarIcon />,
              },
              {
                name: "Feature flags",
                href: "/admin/feature-flags",
                icon: <FlagIcon />,
              },
              {
                name: "Reports",
                href: "/admin/reports",
                icon: <DocumentTextIcon />,
              },
              {
                name: "Notifications",
                href: "/admin/notifications",
                icon: <BellAlertIcon />,
              },
            ],
          },
        ],
      }}
    >
      {children}
    </DashboardLayout>
  )
}

export default Layout
