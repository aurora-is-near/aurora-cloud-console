import Link from "next/link"
import { redirect } from "next/navigation"
import { getTeamByKey } from "@/actions/teams/get-team-by-key"

const Page = async ({
  params: { teamKey },
}: {
  params: { teamKey: string }
}) => {
  if (!teamKey) {
    redirect("/dashboard_v1")
  }

  const team = await getTeamByKey(teamKey)

  return (
    <div className="full-w full-h flex flex-col">
      <div className="flex justify-between bg-white full-w border-b-2 border-slate-100 p-6">
        <div />
        <span>Set up your Aurora Chain</span>
        <Link href={`/dashboard/${team.team_key}`}>
          <span>+</span>
        </Link>
      </div>
      Create
    </div>
  )
}

export default Page
