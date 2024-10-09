import Image from "next/image"
import { PlusIcon } from "@heroicons/react/20/solid"
import { ReactNode } from "react"
import Hero, { HeroButtonProps } from "@/components/Hero/Hero"
import { Silo, Team } from "@/types/types"
import { isDevNet } from "@/utils/is-dev-net"
import { NetworkType } from "@/types/network-type"
import { LinkButton } from "@/components/LinkButton"
import { ExploreItems } from "@/app/dashboard/[teamKey]/(new)/ExploreItems"
import FeatureList, { FeatureBanner } from "./FeatureList"
import {
  Partner1,
  Partner2,
  Partner3,
} from "../../../../../public/static/v2/images/icons"
import { ExploreItem } from "./ExploreItem"

const meetingLink = "https://calendly.com/d/5f2-77d-766/aurora-cloud-demo"

const features: FeatureBanner[] = [
  {
    icon: <Partner1 />,
    title: "Dedicated integration team",
  },
  {
    icon: <Partner2 />,
    title: "Expert consultancy and guidance",
  },
  {
    icon: <Partner3 />,
    title: "Community marketing",
  },
]

// https://www.figma.com/design/83g9SAME00sIuoOPqd8EYj/Aurora-Cloud?node-id=3775-10045&t=PGhHmzDnXi5hsRI0-0
const Dashboard = ({ team, silo }: { team: Team; silo?: Silo }) => {
  const teamKey = team.team_key

  const getNetworkVariant = <T extends string | HeroButtonProps | ReactNode>({
    none,
    devnet,
    mainnet,
  }: Record<NetworkType, T>): T => {
    if (!silo) {
      return none
    }

    if (isDevNet(silo)) {
      return devnet
    }

    return mainnet
  }

  return (
    <div className="w-full">
      <div className="divide-y flex flex-col gap-y-8 lg:gap-y-10">
        <Hero
          title={!silo ? "Welcome to Aurora Cloud" : `Welcome to ${team.name}`}
          description={getNetworkVariant({
            none: "Get all the infrastructure and integrations needed to start your dApp. Validators, oracles, onramps—all come ready to be pre-configured on your chain, freeing up your time and resources to focus on what really matters: your dApp!",
            devnet:
              "You now have access to a shared Aurora Chain identical to production. Test transactions, explore integrations, and simulate real-world scenarios in a risk-free environment.",
            mainnet:
              "Welcome to your chain’s control center—monitor data, manage gas mechanics, and configure integrations effortlessly. Maintain control as you optimize performance and ensure smooth operations on the live network.",
          })}
          image={
            <Image
              width="180"
              height="180"
              src="/static/v2/images/heroIcons/cloud.png"
              alt="Aurora Cloud"
            />
          }
          button={getNetworkVariant({
            none: {
              text: "Create Aurora Chain",
              icon: <PlusIcon className="h-4 w-4" />,
              path: `/dashboard/${teamKey}/create-chain`,
            },
            devnet: {
              text: "Upgrade to Mainnet",
            },
            mainnet: undefined,
          })}
        />
        <div className="flex flex-col pt-12">
          <h2 className="text-xl text-slate-900 font-bold mb-6">
            Explore what you can do
          </h2>

          {getNetworkVariant({
            none: (
              <ExploreItems>
                <ExploreItem
                  title="Set up your Devnet"
                  description="Get access to a shared Aurora Chain identical to the production
                ones."
                  icon="/static/v2/images/examples/devnet.png"
                  link={`/dashboard/${teamKey}/create-chain`}
                />
                <ExploreItem
                  title="Read documentation"
                  description="Explore our documentation to start developing and deploying on Aurora."
                  icon="/static/v2/images/examples/docs.png"
                  link="https://app.gitbook.com/o/n5HlK4HD4c2SMkTWdXdM/s/s1NkUrRikxqj1akDiExv/"
                />
                <ExploreItem
                  title="Talk to a developer"
                  description="Join our Aurora Cloud developers community on Discord."
                  icon="/static/v2/images/examples/talk.png"
                  link="/"
                />
              </ExploreItems>
            ),
            devnet: (
              <ExploreItems>
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
                <ExploreItem
                  title="Talk to a developer"
                  description="Join our Aurora Cloud developers community on Discord."
                  icon="/static/v2/images/examples/talk.png"
                  link="/"
                />
              </ExploreItems>
            ),
            mainnet: (
              <ExploreItems>
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
              </ExploreItems>
            ),
          })}
        </div>

        <div className="p-10 rounded-2xl border border-slate-200 bg-slate-100 mt-6 lg:mt-9">
          <div className="flex flex-col lg:flex-row justify-between">
            <div className="flex flex-col">
              <span className="text-green-900 text-xs font-bold uppercase tracking-widest">
                Aurora Labs
              </span>
              <span className="font-bold text-slate-900 text-xl tracking-tighter">
                Your dedicated development team
              </span>
            </div>

            <LinkButton
              href={meetingLink}
              target="_blank"
              variant="border"
              size="lg"
              className="mt-4 lg:mt-0"
            >
              Book a call
            </LinkButton>
          </div>

          <FeatureList features={features} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
