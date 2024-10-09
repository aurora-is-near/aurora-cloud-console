import { notFound } from "next/navigation"
import { BlockExplorerPage } from "@/components/BlockExplorerPage/BlockExplorerPage"
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

  return <BlockExplorerPage silo={silo} />
}

export default Page
