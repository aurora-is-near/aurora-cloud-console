import Image from "next/image"
import Hero from "@/components/Hero/Hero"
import { Silo, Team } from "@/types/types"
import { LinkButton } from "@/components/LinkButton"
import { FeatureCTA } from "@/components/FeatureCTA"
import { FeatureCTAList } from "@/components/FeatureCTAList"
import { getNetworkVariant } from "@/utils/get-network-variant"
import { getTeamOnboardingForm } from "@/actions/onboarding/get-onboarding-form"
import { DashboardPage } from "@/components/DashboardPage"
import { Typography } from "@/uikit"

import { StepCard } from "./StepCard"
import { TopupStep } from "./TopupStep"
import { WhatsNext } from "./WhatsNext"
import { LiveBadge } from "./LiveBadge"
import { HomeHeroAction } from "./HomeHeroAction"
import { DeploymentProgress } from "./DeploymentProgress"

type DashboardHomePageProps = {
  team: Team
  silo?: Silo | null
}

// https://www.figma.com/design/83g9SAME00sIuoOPqd8EYj/Aurora-Cloud?node-id=3775-10045&t=PGhHmzDnXi5hsRI0-0
export const DashboardHomePage = async ({
  team,
  silo = null,
}: DashboardHomePageProps) => {
  const teamKey = team.team_key
  const siloPrefix = silo ? `/silos/${silo.id}` : ""

  const isOnboardingFormSubmitted = !!(await getTeamOnboardingForm(team.id))

  return (
    <DashboardPage>
      <Hero
        hasDivider
        title={!silo ? "Welcome to Aurora Cloud" : `Welcome to ${team.name}`}
        description={getNetworkVariant(silo, {
          none: "Get started with your own Virtual Chain and start building! Configure your chain, set up on-ramps, bridges, and manage gas abstraction — all within the Aurora Cloud Console.",
          devnet:
            "Get started with your own Virtual Chain and start building! Configure your chain, set up on-ramps, bridges, and manage gas abstraction — all within the Aurora Cloud Console.",
          mainnet:
            "Get started with your own Virtual Chain and start building! Configure your chain, set up on-ramps, bridges, and manage gas abstraction — all within the Aurora Cloud Console.",
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
            <HomeHeroAction
              team={team}
              isOnboardingFormSubmitted={isOnboardingFormSubmitted}
            />
          ),
          devnet: (
            <LinkButton href={`/dashboard/${teamKey}/create-chain`} size="lg">
              Upgrade to Mainnet
            </LinkButton>
          ),
          mainnet: <LiveBadge />,
        })}
      />

      <section className="flex flex-col gap-14">
        {silo || team.onboarding_status === "DEPLOYMENT_DONE" ? (
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
                    link="https://doc.aurora.dev/aurora-cloud/welcome/about-virtual-chains"
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
                    link="https://doc.aurora.dev/aurora-cloud/welcome/about-virtual-chains"
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
                    link="https://doc.aurora.dev/aurora-cloud/welcome/about-virtual-chains"
                  />
                </FeatureCTAList>
              ),
            })}
          </div>
        ) : !team.onboarding_status ? (
          <section className="flex flex-col gap-5">
            <Typography variant="heading" size={3}>
              Start here
            </Typography>
            <div className="flex flex-col gap-4">
              <StepCard
                index={1}
                state={isOnboardingFormSubmitted ? "completed" : "active"}
                title="Configure your Virtual Chain"
                description="Select the chain parameters that fit your needs — base token, gas costs, permissions, and more — to create a fully production-ready environment."
                link={{
                  isDisabled: false,
                  label: "Get started",
                  url: `/dashboard/${teamKey}/create-chain`,
                }}
              />
              <TopupStep
                index={2}
                team={team}
                state={isOnboardingFormSubmitted ? "active" : "upcoming"}
              />
            </div>
            <WhatsNext className="mt-10" />
          </section>
        ) : (
          <>
            <DeploymentProgress status={team.onboarding_status} />
            <hr className="w-full h-[1px] bg-slate-200" />
            <WhatsNext />
          </>
        )}
      </section>
    </DashboardPage>
  )
}
