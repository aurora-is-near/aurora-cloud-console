import { notFound } from "next/navigation"
import { getTeamSiloByKey } from "@/actions/team-silos/get-team-silo-by-key"
import { IntentsPage } from "@/components/IntentsPage/IntentsPage"
import { getTeamByKey } from "@/actions/teams/get-team-by-key"

const Page = async ({
  params: { id, teamKey },
}: {
  params: { id: string; teamKey: string }
}) => {
  const silo = await getTeamSiloByKey(teamKey, Number(id))
  const team = await getTeamByKey(teamKey)

  if (!silo) {
    notFound()
  }

  return <IntentsPage silo={silo} team={team} />
}

export default Page
