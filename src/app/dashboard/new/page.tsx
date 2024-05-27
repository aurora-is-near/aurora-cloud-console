import { DashboardPage } from "@/components/DashboardPage"
import { TeamDetailsCard } from "@/components/admin/TeamDetailsCard"
import { DashboardLayout } from "@/components/DashboardLayout"

const Page = async () => {
  return (
    <DashboardLayout>
      <DashboardPage heading="Create a team">
        <TeamDetailsCard />
      </DashboardPage>
    </DashboardLayout>
  )
}

export default Page
