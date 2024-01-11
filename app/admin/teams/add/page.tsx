import { AdminPage } from "@/components/AdminPage"
import { TeamDetailsCard } from "@/app/admin/teams/TeamDetailsCard"

const Page = async () => {
  return (
    <AdminPage title="Add team">
      <TeamDetailsCard />
    </AdminPage>
  )
}

export default Page
