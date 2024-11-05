import { ReactNode } from "react"
import {
  CubeIcon,
  TicketIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline"
import { redirect } from "next/navigation"
import { DashboardLayout } from "@/components/DashboardLayout"
import { isAdmin } from "@/actions/is-admin"
import { UNAUTHORISED_ROUTE } from "@/constants/routes"
import { Oracle } from "../../../../../public/static/v2/images/menuIcons"

const Layout = async ({
  children,
  params: { teamKey },
}: {
  children: ReactNode
  params: { teamKey: string }
}) => {
  const isAdminUser = await isAdmin()

  if (!isAdminUser) {
    return redirect(UNAUTHORISED_ROUTE)
  }

  return (
    <DashboardLayout
      teamKey={teamKey}
      showAdminMenu={isAdminUser}
      sidebarMenu={{
        heading: "Admin",
        sections: [
          {
            items: [
              {
                name: "Team",
                href: `/dashboard/${teamKey}/admin/team`,
                icon: <UserGroupIcon />,
              },
              {
                name: "Silos",
                href: `/dashboard/${teamKey}/admin/silos`,
                icon: <CubeIcon />,
              },
              {
                name: "Deals",
                href: `/dashboard/${teamKey}/admin/deals`,
                icon: <TicketIcon />,
              },
              {
                name: "Oracle",
                href: `/dashboard/${teamKey}/admin/oracle/tokens`,
                icon: <Oracle />,
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
