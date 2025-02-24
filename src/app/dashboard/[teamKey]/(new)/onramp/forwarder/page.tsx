import { getTeamByKey } from "@/actions/teams/get-team-by-key"
import { ForwarderPage } from "@/components/ForwarderPage/ForwarderPage"

const Page = async ({
  params: { teamKey },
}: {
  params: { teamKey: string }
}) => {
  const team = await getTeamByKey(teamKey)

  return <ForwarderPage team={team} />
}

export default Page
