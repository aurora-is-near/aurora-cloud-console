import { getTeamByKey } from "@/actions/teams/get-team-by-key"
import CompanyForm from "@/app/dashboard/[teamKey]/settings/company/CompanyForm"
import { DashboardPage } from "@/components/DashboardPage"

const Page = async ({
  params: { teamKey },
}: {
  params: { teamKey: string }
}) => {
  const team = await getTeamByKey(teamKey)

  return (
    <DashboardPage heading="Company">
      <CompanyForm team={team} />
    </DashboardPage>
  )
}

export default Page
