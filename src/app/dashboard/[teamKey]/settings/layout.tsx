import { ReactNode } from "react"
import {
  ArrowLeftIcon,
  BuildingLibraryIcon,
  IdentificationIcon,
  KeyIcon,
  UsersIcon,
} from "@heroicons/react/20/solid"
import { DashboardLayout } from "@/components/DashboardLayout"
import { LinkButton } from "@/components/LinkButton"
import { getAuthUser } from "@/actions/auth-user/get-auth-user"

const Layout = async ({
  children,
  params: { teamKey },
}: {
  children: ReactNode
  params: { teamKey: string }
}) => {
  const authUser = await getAuthUser()

  return (
    <DashboardLayout
      teamKey={teamKey}
      authUser={authUser}
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
