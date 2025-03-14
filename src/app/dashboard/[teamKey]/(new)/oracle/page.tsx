import { getTeamByKey } from "@/actions/teams/get-team-by-key"
import OraclePage from "@/components/OraclePage/OraclePage"

const Page = async ({
  params: { teamKey },
}: {
  params: { teamKey: string }
}) => {
  const team = await getTeamByKey(teamKey)

  return <OraclePage team={team} />
}

export default Page
