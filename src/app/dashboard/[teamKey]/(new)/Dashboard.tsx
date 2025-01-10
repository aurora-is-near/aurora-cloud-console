import Image from "next/image"
import { PlusIcon } from "@heroicons/react/20/solid"
import Hero from "@/components/Hero/Hero"
import { Silo, Team } from "@/types/types"
import { LinkButton } from "@/components/LinkButton"
import { FeatureCTA } from "@/components/FeatureCTA"
import { FeatureCTAList } from "@/components/FeatureCTAList"
import { getNetworkVariant } from "@/utils/get-network-variant"
import { DashboardPage } from "@/components/DashboardPage"

import { notReachable } from "@/utils/notReachable"
import { DeploymentProgress } from "./DeploymentProgress"

type DashboardHomePageProps = {
  team: Team
  silo?: Silo | null
}

// https://www.figma.com/design/83g9SAME00sIuoOPqd8EYj/Aurora-Cloud?node-id=3775-10045&t=PGhHmzDnXi5hsRI0-0
export const DashboardHomePage = ({
  team,
  silo = null,
}: DashboardHomePageProps) => {
  const teamKey = team.team_key
  const siloPrefix = silo ? `/silos/${silo.id}` : ""

  return (
    <DashboardPage>
      <Hero
        hasDivider
        title={!silo ? "Welcome to Aurora Cloud" : `Welcome to ${team.name}`}
        description={getNetworkVariant(silo, {
          none: "Get all the infrastructure and integrations needed to start your dApp. Validators, oracles, onramps—all come ready to be pre-configured on your chain, freeing up your time and resources to focus on what really matters: your dApp!",
          devnet:
            "You now have access to a shared Aurora Chain identical to production. Test transactions, explore integrations, and simulate real-world scenarios in a risk-free environment.",
          mainnet:
            "Welcome to your chain’s control center—monitor data, manage gas mechanics, and configure integrations effortlessly. Maintain control as you optimize performance and ensure smooth operations on the live network.",
        })}
        image={getNetworkVariant(silo, {
          none: (
            <Image
              width="180"
              height="180"
              src="/static/v2/images/heroIcons/cloud.webp"
              alt="Aurora Cloud"
            />
          ),
          mainnet: (
            <Image
              width="180"
              height="180"
              src="/static/v2/images/heroIcons/cloud.webp"
              alt="Aurora Cloud"
              className="mr-16 shadow-xl rounded-[2rem]"
            />
          ),
          devnet: (
            <Image
              width="180"
              height="180"
              src="/static/v2/images/heroIcons/cloud.webp"
              alt="Aurora Cloud"
              className="mr-16 shadow-xl rounded-[2rem]"
            />
          ),
        })}
        actions={getNetworkVariant(silo, {
          none: (
            <LinkButton href={`/dashboard/${teamKey}/create-chain`} size="lg">
              <PlusIcon className="h-4 w-4" />
              <span>Create Aurora Chain</span>
            </LinkButton>
          ),
          devnet: (
            <LinkButton href={`/dashboard/${teamKey}/create-chain`} size="lg">
              Upgrade to Mainnet
            </LinkButton>
          ),
          mainnet: undefined,
        })}
      />

      <section className="flex flex-col gap-14">
        {(() => {
          switch (team.onboarding_status) {
            case "REQUEST_RECEIVED":
            case "DEPLOYMENT_IN_PROGRESS":
              return <DeploymentProgress status={team.onboarding_status} />

            case "DEPLOYMENT_DONE":
            case null:
              return (
                <div className="flex flex-col">
                  <h2 className="text-xl text-slate-900 font-bold tracking-tighter leading-6 mb-6">
                    Explore what you can do
                  </h2>

                  {getNetworkVariant(silo, {
                    none: (
                      <FeatureCTAList>
                        <FeatureCTA
                          title="Launch a Virtual Chain"
                          description="Get a production ready Aurora Chain with all the functionality."
                          icon="/static/v2/images/examples/devnet.png"
                          link={`/dashboard/${teamKey}/create-chain`}
                        />
                        <FeatureCTA
                          title="Read documentation"
                          description="Explore our documentation to start developing and deploying on Aurora."
                          icon="/static/v2/images/examples/docs.png"
                          link="https://app.gitbook.com/o/n5HlK4HD4c2SMkTWdXdM/s/s1NkUrRikxqj1akDiExv/"
                        />
                        <FeatureCTA
                          title="Talk to a developer"
                          description="Join our Aurora Cloud developers community on Discord."
                          icon="/static/v2/images/examples/talk.png"
                          link="/"
                        />
                      </FeatureCTAList>
                    ),
                    devnet: (
                      <FeatureCTAList>
                        <FeatureCTA
                          title="Explore integrations"
                          description="Your chain supports by default a range of integrations."
                          icon="/static/v2/images/examples/integrations.png"
                          link={`/dashboard/${teamKey}${siloPrefix}/integrations`}
                        />
                        <FeatureCTA
                          title="Read documentation"
                          description="Explore our documentation to start developing and deploying on Aurora."
                          icon="/static/v2/images/examples/docs.png"
                          link="https://app.gitbook.com/o/n5HlK4HD4c2SMkTWdXdM/s/s1NkUrRikxqj1akDiExv/"
                        />
                        <FeatureCTA
                          title="Talk to a developer"
                          description="Join our Aurora Cloud developers community on Discord."
                          icon="/static/v2/images/examples/talk.png"
                          link="/"
                        />
                      </FeatureCTAList>
                    ),
                    mainnet: (
                      <FeatureCTAList>
                        <FeatureCTA
                          title="Monitor your chain"
                          description="Keep track of transaction volume,  latency and RPC requests in real-time."
                          icon="/static/v2/images/examples/monitor.png"
                          link={`/dashboard/${teamKey}${siloPrefix}/monitoring`}
                        />
                        <FeatureCTA
                          title="Explore integrations"
                          description="Your chain supports by default a range of integrations."
                          icon="/static/v2/images/examples/integrations.png"
                          link={`/dashboard/${teamKey}${siloPrefix}/integrations`}
                        />
                        <FeatureCTA
                          title="Read documentation"
                          description="Explore our documentation to start developing and deploying on Aurora."
                          icon="/static/v2/images/examples/docs.png"
                          link="https://app.gitbook.com/o/n5HlK4HD4c2SMkTWdXdM/s/s1NkUrRikxqj1akDiExv/"
                        />
                      </FeatureCTAList>
                    ),
                  })}
                </div>
              )

            default:
              return notReachable(team.onboarding_status)
          }
        })()}
      </section>
    </DashboardPage>
  )
}
