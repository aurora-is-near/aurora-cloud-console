import { notFound } from "next/navigation"
import { getTeamSiloByKey } from "@/actions/team-silos/get-team-silo-by-key"
import { ForwarderPage } from "@/components/ForwarderPage/ForwarderPage"
import { getTeamByKey } from "@/actions/teams/get-team-by-key"

const Page = async ({
  params: { id, teamKey },
}: {
  params: { id: string; teamKey: string }
}) => {
  const [silo, team] = await Promise.all([
    getTeamSiloByKey(teamKey, Number(id)),
    getTeamByKey(teamKey),
  ])

  if (!silo) {
    notFound()
  }

  return <ForwarderPage team={team} silo={silo} />
}

export default Page
