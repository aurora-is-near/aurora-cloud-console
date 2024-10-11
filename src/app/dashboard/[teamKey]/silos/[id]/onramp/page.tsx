import { notFound } from "next/navigation"
import { getTeamSiloByKey } from "@/actions/team-silos/get-team-silo-by-key"
import { OnrampHomePage } from "@/components/OnrampHomePage/OnrampHomePage"

const Page = async ({
  params: { id, teamKey },
}: {
  params: { id: string; teamKey: string }
}) => {
  const silo = await getTeamSiloByKey(teamKey, Number(id))

  if (!silo) {
    notFound()
  }

  return <OnrampHomePage teamKey={teamKey} silo={silo} />
}

export default Page
