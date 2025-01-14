import { ReactNode } from "react"
import {
  ArrowLeftIcon,
  BuildingLibraryIcon,
  IdentificationIcon,
  KeyIcon,
  UsersIcon,
} from "@heroicons/react/20/solid"
import { DashboardLayout } from "@/components/DashboardLayout"
import { isAdmin } from "@/actions/is-admin"
import { getTeamByKey } from "@/actions/teams/get-team-by-key"
import { LinkButton } from "@/components/LinkButton"

const Layout = async ({
  children,
  params: { teamKey },
}: {
  children: ReactNode
  params: { teamKey: string }
}) => {
  const showAdminMenu = await isAdmin()
  const team = await getTeamByKey(teamKey)

  return (
    <DashboardLayout
      team={team}
      showAdminMenu={showAdminMenu}
      sidebarMenu={{
        heading: "Settings",
        action: (
          <LinkButton
            fullWidth
            size="lg"
            variant="border"
            href={`/dashboard/${teamKey}`}
          >
            <ArrowLeftIcon className="w-6 h-6 absolute left-4" />
            Back to dashboard
          </LinkButton>
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
