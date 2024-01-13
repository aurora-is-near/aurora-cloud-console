import { AdminPage } from "@/components/AdminPage"
import { TeamDetailsCard } from "@/app/admin/teams/TeamDetailsCard"
import { getSilos } from "@/actions/admin/silos/get-silos"

const Page = async () => {
  const allSilos = await getSilos()

  return (
    <AdminPage title="Add team">
      <TeamDetailsCard allSilos={allSilos} />
    </AdminPage>
  )
}

export default Page
