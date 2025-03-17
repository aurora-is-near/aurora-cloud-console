import { redirect } from "next/navigation"
import { getTeamSilosByKey } from "@/actions/team-silos/get-team-silos-by-key"

const Page = async ({
  params: { teamKey },
}: {
  params: { teamKey: string }
}) => {
  const [firstSilo] = await getTeamSilosByKey(teamKey)

  if (!firstSilo) {
    return redirect(`/dashboard/${teamKey}`)
  }

  return redirect(`/dashboard/${teamKey}/silos/${firstSilo.id}/monitoring`)
}

export default Page
