import { notFound } from "next/navigation"
import { getTeamByKey } from "@/actions/teams/get-team-by-key"
import { IntentsPage } from "@/components/IntentsPage/IntentsPage"

const Page = async ({
  params: { teamKey },
}: {
  params: { teamKey: string }
}) => {
  const team = await getTeamByKey(teamKey)

  if (!team) {
    notFound()
  }

  return <IntentsPage team={team} />
}

export default Page
