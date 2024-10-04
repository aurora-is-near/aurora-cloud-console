import { redirect } from "next/navigation"
import { getTeamByKey } from "@/actions/teams/get-team-by-key"
import { getTeamSilos } from "@/actions/team-silos/get-team-silos"

const Page = async ({
  params: { teamKey },
}: {
  params: { teamKey: string }
}) => {
  const team = await getTeamByKey(teamKey)
  const [firstSilo] = await getTeamSilos(team.id)

  if (!firstSilo) {
    return redirect(`/dashboard/${teamKey}`)
  }

  return redirect(`/dashboard/${teamKey}/silos/${firstSilo.id}/monitoring`)
}

export default Page
