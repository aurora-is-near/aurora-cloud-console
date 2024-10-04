import Image from "next/image"
import { getTeamByKey } from "@/actions/teams/get-team-by-key"
import Hero from "@/components/Hero/Hero"
import { DashboardPage } from "@/components/DashboardPage"
import { LinkButton } from "@/components/LinkButton"

const Page = async ({
  params: { teamKey },
}: {
  params: { teamKey: string }
}) => {
  const team = await getTeamByKey(teamKey)

  return (
    <DashboardPage>
      <div className="flex flex-col">
        <Hero
          title="Gas Abstraction"
          description="Boost user experience by covering gas fees and creating custom plans as part of your engagement strategy."
          image={
            <Image
              width="180"
              height="180"
              src="/static/v2/images/heroIcons/onramp.png"
              alt=""
            />
          }
        />
        <div className="border-b border-slate-200 my-12" />
        <div className="flex flex-col gap-5">
          <h2 className="text-2xl text-slate-900 font-bold">Your gas plans</h2>

          <div className="flex flex-row justify-between rounded-xl bg-slate-100 py-5 px-6">
            <div className="flex flex-col gap-2">
              <span className="text-slate-900 font-semibold">
                Want to create your own plan?
              </span>
              <span className="text-sm text-slate-500">
                Set up devnet or mainnet chain on Aurora Cloud.
              </span>
            </div>
            <div className="self-center">
              <LinkButton
                variant="border"
                href={`/dashboard_v2/${team.team_key}/create-chain`}
              >
                Create chain
              </LinkButton>
            </div>
          </div>
        </div>
      </div>
    </DashboardPage>
  )
}

export default Page
