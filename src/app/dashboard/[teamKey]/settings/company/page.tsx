import { getTeamByKey } from "@/actions/teams/get-team-by-key"
import Card from "@/components/Card"
import { DashboardPage } from "@/components/DashboardPage"

const Page = async ({
  params: { teamKey },
}: {
  params: { teamKey: string }
}) => {
  const team = await getTeamByKey(teamKey)

  return (
    <DashboardPage heading="Company">
      <Card>
        <Card.Title tag="h3">Company information</Card.Title>
        <dl className="px-6 space-y-10 pb-7">
          <div className="sm:grid sm:grid-cols-2">
            <dt className="text-sm font-medium leading-none text-slate-500">
              Company name
            </dt>
            <dd className="mt-2 text-sm leading-none text-slate-900 sm:mt-0">
              {team.name}
            </dd>
          </div>
          <div className="sm:grid sm:grid-cols-2">
            <dt className="text-sm font-medium leading-none text-slate-500">
              Business website
            </dt>
            <dd className="mt-2 text-sm leading-none text-slate-900 sm:mt-0">
              {team.website}
            </dd>
          </div>
          <div className="sm:grid sm:grid-cols-2">
            <dt className="text-sm font-medium leading-none text-slate-500">
              Support email
            </dt>
            <dd className="mt-2 text-sm leading-none text-slate-900 sm:mt-0">
              {team.email}
            </dd>
          </div>
        </dl>
      </Card>
    </DashboardPage>
  )
}

export default Page
