import { PlusIcon } from "@heroicons/react/24/outline"
import { redirect } from "next/navigation"
import { NotAllowed } from "@/components/NotAllowed"
import { DashboardLayout } from "@/components/DashboardLayout"
import { DashboardPage } from "@/components/DashboardPage"
import { FullScreenPage } from "@/components/FullScreenPage"
import { LinkButton } from "@/components/LinkButton"
import { TeamsList } from "@/app/dashboard/TeamsList"
import { getAuthUser } from "@/actions/auth-user/get-auth-user"
import { isAdminUser } from "@/utils/admin"

const Page = async () => {
  const authUser = await getAuthUser()
  const isAdmin = isAdminUser(authUser?.email)

  // Team keys are added to the user metadata via database triggers
  // (see manage-user-teams.md). This means we can access data about the user's
  // teams here without requiring an additional database query.
  const userTeams: string[] = authUser?.user_metadata.teams || []

  if (userTeams.length === 0 && !isAdmin) {
    return (
      <FullScreenPage>
        <NotAllowed
          showLogoutButton
          title="No teams found"
          description="You are not currently a member of any teams. Please contact your team administrator for an invite."
        />
      </FullScreenPage>
    )
  }

  if (userTeams.length === 1 && !isAdmin) {
    return redirect(`/dashboard/${userTeams[0]}`)
  }

  return (
    <DashboardLayout authUser={authUser}>
      <DashboardPage
        heading="Your teams"
        headingSize="lg"
        className="pt-12"
        actions={
          isAdmin && (
            <LinkButton href="/dashboard/new">
              <PlusIcon className="w-5 h-5" />
              <span>New team</span>
            </LinkButton>
          )
        }
      >
        <TeamsList />
      </DashboardPage>
    </DashboardLayout>
  )
}

export default Page
