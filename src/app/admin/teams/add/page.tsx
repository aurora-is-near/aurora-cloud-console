import { DashboardPage } from "@/components/DashboardPage"
import { TeamDetailsCard } from "@/app/admin/teams/TeamDetailsCard"
import { getSilos } from "@/actions/silos/get-silos"

const Page = async () => {
  const allSilos = await getSilos()

  return (
    <DashboardPage heading="Add team">
      <TeamDetailsCard allSilos={allSilos} />
    </DashboardPage>
  )
}

export default Page
