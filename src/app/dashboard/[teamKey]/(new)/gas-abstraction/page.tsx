import { getTeamByKey } from "@/actions/teams/get-team-by-key"
import { GasAbstractionPage } from "@/components/GasAbstractionPage"

const Page = async ({
  params: { teamKey },
}: {
  params: { teamKey: string }
}) => {
  const team = await getTeamByKey(teamKey)

  return <GasAbstractionPage team={team} />
}

export default Page
