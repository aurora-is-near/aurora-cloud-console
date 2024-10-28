import { getTeamByKey } from "@/actions/teams/get-team-by-key"
import CompanyForm from "@/app/dashboard/[teamKey]/settings/company/CompanyForm"

const Page = async ({
  params: { teamKey },
}: {
  params: { teamKey: string }
}) => {
  const team = await getTeamByKey(teamKey)

  return <CompanyForm team={team} />
}

export default Page
