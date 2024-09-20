import { getTeamByKey } from "@/actions/teams/get-team-by-key"
import Card from "@/components/Card"
import SubTitle from "@/components/v2/dashboard/SubTitle"

const Page = async ({
  params: { teamKey },
}: {
  params: { teamKey: string }
}) => {
  const team = await getTeamByKey(teamKey)

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-row justify-between">
        <SubTitle>Company</SubTitle>
      </div>
      <Card className="pt-6">
        <dl className="px-6 space-y-10 pb-7">
          <div className="sm:grid sm:grid-cols-2 pt-6">
            <dt className="text-sm font-medium leading-none text-gray-500">
              Company name
            </dt>
            <dd className="mt-2 text-sm leading-none text-gray-900 sm:mt-0">
              {team.name}
            </dd>
          </div>
          <div className="sm:grid sm:grid-cols-2">
            <dt className="text-sm font-medium leading-none text-gray-500">
              Business website
            </dt>
            <dd className="mt-2 text-sm leading-none text-gray-900 sm:mt-0">
              {team.website}
            </dd>
          </div>
          <div className="sm:grid sm:grid-cols-2">
            <dt className="text-sm font-medium leading-none text-gray-500">
              Support email
            </dt>
            <dd className="mt-2 text-sm leading-none text-gray-900 sm:mt-0">
              {team.email}
            </dd>
          </div>
        </dl>
      </Card>
    </div>
  )
}

export default Page
