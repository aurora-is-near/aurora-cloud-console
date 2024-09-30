import Link from "next/link"
import Image from "next/image"
import EmptyState, {
  ExploreItem,
  meetingLink,
} from "@/app/dashboard/[teamKey]/EmptyState"
import Hero from "@/components/dashboard/Hero"
import { getTeamByKey } from "@/actions/teams/get-team-by-key"
import { getTeamSilos } from "@/actions/team-silos/get-team-silos"
import FeatureList from "@/app/dashboard/[teamKey]/FeatureList"

const Page = async ({
  params: { teamKey },
}: {
  params: { teamKey: string }
}) => {
  const team = await getTeamByKey(teamKey)
  const silos = await getTeamSilos(team.id)

  return silos.length === 0 ? (
    <EmptyState />
  ) : (
    <div className="w-full">
      <div className="divide-y flex flex-col gap-10">
        <Hero
          title={`Welcome to ${team.name}`}
          description="Welcome to your chain’s control center—monitor data,
manage gas mechanics, and configure integrations effortlessly. Maintain control as you optimize performance and ensure smooth operations on the live network."
          image={
            <Image
              width="180"
              height="180"
              src="/static/v2/images/heroIcons/cloud.png"
              alt="Aurora Cloud"
            />
          }
        />
        <div className="flex flex-col pt-10 gap-10">
          <span className="text-xl text-slate-900 font-bold">
            Expore what you can do
          </span>

          <div className="flex flex-row gap-10">
            <ExploreItem
              title="Monitor your chain"
              description="Keep track of transaction volume,  latency and RPC requests in real-time."
              icon="/static/v2/images/examples/monitor.png"
              link={`/dashboard_v2/${team.team_key}/monitoring`}
            />
            <ExploreItem
              title="Explore integrations"
              description="Your chain supports by default a range of integrations."
              icon="/static/v2/images/examples/integrations.png"
              link={`/dashboard_v2/${team.team_key}/integrations`}
            />
            <ExploreItem
              title="Read documentation"
              description="Explore our documentation to start developing and deploying on Aurora."
              icon="/static/v2/images/examples/docs.png"
              link="https://app.gitbook.com/o/n5HlK4HD4c2SMkTWdXdM/s/s1NkUrRikxqj1akDiExv/"
            />
          </div>
        </div>

        <div className="p-10 rounded-2xl border border-slate-200 bg-slate-100">
          <div className="flex flex-row justify-between">
            <div className="flex flex-col">
              <span className="text-green-900 text-xs font-bold uppercase tracking-widest">
                Aurora Labs
              </span>
              <span className="font-bold text-slate-900 text-xl tracking-tighter">
                Your dedicated development team
              </span>
            </div>

            <Link href={meetingLink} target="_blank">
              <button
                type="button"
                className="border border-slate-400 rounded-lg p-3"
              >
                Book a call
              </button>
            </Link>
          </div>

          <FeatureList />
        </div>
      </div>
    </div>
  )
}

export default Page
