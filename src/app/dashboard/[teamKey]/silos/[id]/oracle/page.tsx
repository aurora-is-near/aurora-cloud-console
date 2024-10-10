import { notFound } from "next/navigation"
import { OraclePage } from "@/components/OraclePage/OraclePage"
import { getTeamSiloByKey } from "@/actions/team-silos/get-team-silo-by-key"

const Page = async ({
  params: { id, teamKey },
}: {
  params: { id: string; teamKey: string }
}) => {
  const silo = await getTeamSiloByKey(teamKey, Number(id))

  if (!silo) {
    notFound()
  }

  return <OraclePage silo={silo} />
}

export default Page
