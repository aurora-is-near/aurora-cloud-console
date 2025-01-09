import { ReactNode } from "react"
import {
  CircleStackIcon,
  CubeIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline"
import { redirect } from "next/navigation"
import { DashboardLayout } from "@/components/DashboardLayout"
import { isAdmin } from "@/actions/is-admin"
import { UNAUTHORISED_ROUTE } from "@/constants/routes"
import { Oracle } from "../../../public/static/v2/images/menuIcons"

const Layout = async ({ children }: { children: ReactNode }) => {
  const isAdminUser = await isAdmin()

  if (!isAdminUser) {
    return redirect(UNAUTHORISED_ROUTE)
  }

  return (
    <DashboardLayout
      showAdminMenu={isAdminUser}
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
                name: "Oracle tokens",
                href: "/admin/oracle/tokens",
                icon: <Oracle />,
              },
              {
                name: "Orders",
                href: "/admin/orders",
                icon: <CurrencyDollarIcon />,
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
