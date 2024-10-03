import Image from "next/image"
import Link from "next/link"
import { PlusIcon } from "@heroicons/react/20/solid"
import { ReactNode } from "react"
import Hero, { HeroButtonProps } from "@/components/Hero/Hero"
import { Silo, Team } from "@/types/types"
import FeatureList, {
  FeatureBanner,
} from "@/app/dashboard/[teamKey]/(new)/FeatureList"
import { Button } from "@/components/Button"
import { isDevNet } from "@/utils/is-dev-net"
import { NetworkType } from "@/types/network-type"
import {
  Partner1,
  Partner2,
  Partner3,
} from "../../../../../public/static/v2/images/icons"

const meetingLink = "https://calendly.com/d/5f2-77d-766/aurora-cloud-demo"

interface ExploreItemProps {
  title: string
  description: string
  icon: string
  link: string
}

const ExploreItem = ({ title, description, icon, link }: ExploreItemProps) => {
  const isExternalLink = link.startsWith("http")

  return (
    <Link
      href={link}
      target={isExternalLink ? "_blank" : undefined}
      rel={isExternalLink ? "noopener noreferrer" : undefined}
    >
      <div className="rounded-xl border border-slate-200 w-full max-w-[310px]">
        <div className="rounded-t-xl overflow-hidden">
          <Image src={icon} width="310" height="170" alt="Example" />
        </div>
        <div className="rounded-b-xl bg-white p-5">
          <div className="flex flex-col justify-center items-center">
            <h3 className="text-slate-900 font-bold text-md">{title}</h3>
            <p className="text-center text-slate-500 text-sm">{description}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}

const features: FeatureBanner[] = [
  {
    icon: <Partner1 />,
    title: "Dedicated integration team",
  } as FeatureBanner,
  {
    icon: <Partner2 />,
    title: "Expert consultancy and guidance",
  } as FeatureBanner,
  {
    icon: <Partner3 />,
    title: "Community marketing",
  } as FeatureBanner,
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
      <div className="divide-y flex flex-col gap-10">
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
            },
            devnet: {
              text: "Upgrade to Mainnet",
            },
            mainnet: undefined,
          })}
        />
        <div className="flex flex-col pt-10 gap-10">
          <h2 className="text-xl text-slate-900 font-bold">
            Explore what you can do
          </h2>

          {getNetworkVariant({
            none: (
              <div className="flex flex-row gap-10">
                <ExploreItem
                  title="Set up your Devnet"
                  description="Get access to a shared Aurora Chain identical to the production
                ones."
                  icon="/static/v2/images/examples/devnet.png"
                  link={`/dashboard/${teamKey}/create_chain`}
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
              </div>
            ),
            devnet: (
              <div className="flex flex-row gap-10">
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
              </div>
            ),
            mainnet: (
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
            ),
          })}
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
              <Button variant="border" size="lg">
                Book a call
              </Button>
            </Link>
          </div>

          <FeatureList features={features} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
