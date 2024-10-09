import { ReactNode } from "react"
import {
  CreditCardIcon,
  InformationCircleIcon,
  KeyIcon,
  UserIcon,
  UsersIcon,
} from "@heroicons/react/24/outline"
import { DashboardLayout } from "@/components/DashboardLayout"
import { isAdmin } from "@/actions/is-admin"

const Layout = async ({
  children,
  params: { teamKey },
}: {
  children: ReactNode
  params: { teamKey: string }
}) => {
  const showAdminMenu = await isAdmin()

  return (
    <DashboardLayout
      teamKey={teamKey}
      showAdminMenu={showAdminMenu}
      sidebarMenu={{
        heading: "Settings",
        sections: [
          {
            items: [
              {
                name: "Billing",
                href: `/dashboard/${teamKey}/settings/billing`,
                icon: <CreditCardIcon />,
              },
              {
                name: "Team",
                href: `/dashboard/${teamKey}/settings/team`,
                icon: <UsersIcon />,
              },
              {
                name: "Company",
                href: `/dashboard/${teamKey}/settings/company`,
                icon: <InformationCircleIcon />,
              },
              {
                name: "Account",
                href: `/dashboard/${teamKey}/settings/account`,
                icon: <UserIcon />,
              },
              {
                name: "API Keys",
                href: `/dashboard/${teamKey}/settings/api-keys`,
                icon: <KeyIcon />,
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
