import { ReactNode } from "react"
import { PlusIcon } from "@heroicons/react/20/solid"

import { isAdmin } from "@/actions/is-admin"
import { getTeamByKey } from "@/actions/teams/get-team-by-key"
import { MainDashboardLayout } from "@/components/MainDashboardLayout"
import { LinkButton } from "@/components/LinkButton"

const Layout = async ({
  children,
  params: { teamKey },
}: {
  children: ReactNode
  params: { teamKey: string }
}) => {
  const isAdminUser = await isAdmin()
  const team = await getTeamByKey(teamKey)

  return (
    <MainDashboardLayout
      team={team}
      showAdminMenu={isAdminUser}
      sidebarAction={
        !team.onboarding_status ? (
          <LinkButton
            href={`/dashboard/${teamKey}/create-chain`}
            variant="dark"
            size="lg"
            className="justify-start"
            fullWidth
          >
            <div className="flex w-full items-center gap-x-2">
              <PlusIcon className="w-6 h-6" />
              Launch a Virtual Chain
            </div>
          </LinkButton>
        ) : undefined
      }
    >
      {children}
    </MainDashboardLayout>
  )
}

export default Layout
