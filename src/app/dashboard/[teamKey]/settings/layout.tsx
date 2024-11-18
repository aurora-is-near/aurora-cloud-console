import { ReactNode } from "react"
import Link from "next/link"
import {
  ArrowLeftIcon,
  BuildingLibraryIcon,
  IdentificationIcon,
  KeyIcon,
  UsersIcon,
} from "@heroicons/react/20/solid"
import { DashboardLayout } from "@/components/DashboardLayout"
import { isAdmin } from "@/actions/is-admin"
import { Button } from "@/components/Button"

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
        action: (
          <Link href={`/dashboard/${teamKey}`}>
            <Button fullWidth variant="border" size="lg">
              <ArrowLeftIcon className="w-6 h-6 absolute left-4" />
              Back to dashboard
            </Button>
          </Link>
        ),
        sections: [
          {
            items: [
              {
                name: "Team",
                href: `/dashboard/${teamKey}/settings/team`,
                icon: <UsersIcon />,
              },
              {
                name: "API Keys",
                href: `/dashboard/${teamKey}/settings/api-keys`,
                icon: <KeyIcon />,
              },
              {
                name: "Account",
                href: `/dashboard/${teamKey}/settings/account`,
                icon: <IdentificationIcon />,
              },
              {
                name: "Company",
                href: `/dashboard/${teamKey}/settings/company`,
                icon: <BuildingLibraryIcon />,
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
