import { DashboardPage } from "@/components/DashboardPage"
import { TeamDetailsCard } from "@/components/admin/TeamDetailsCard"
import { DashboardLayout } from "@/components/DashboardLayout"
import { getAuthUser } from "@/actions/auth-user/get-auth-user"

const Page = async () => {
  const authUser = await getAuthUser()

  return (
    <DashboardLayout authUser={authUser}>
      <DashboardPage heading="Create a team">
        <TeamDetailsCard />
      </DashboardPage>
    </DashboardLayout>
  )
}

export default Page
