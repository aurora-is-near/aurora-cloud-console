import { DashboardPage } from "@/components/DashboardPage"
import { TeamDetailsCard } from "@/components/admin/TeamDetailsCard"
import { DashboardLayout } from "@/components/DashboardLayout"
import { isAdmin } from "@/actions/is-admin"

const Page = async () => {
  const isAdminUser = await isAdmin()

  return (
    <DashboardLayout showAdminMenu={isAdminUser}>
      <DashboardPage heading="Create a team">
        <TeamDetailsCard />
      </DashboardPage>
    </DashboardLayout>
  )
}

export default Page
