import Image from "next/image"
import { ArrowRightIcon } from "@heroicons/react/24/solid"

import Hero from "@/components/Hero/Hero"
import { Silo, Team } from "@/types/types"
import { FeatureCTA } from "@/components/FeatureCTA"
import { FeatureCTAList } from "@/components/FeatureCTAList"
import { getTeamOnboardingForm } from "@/actions/onboarding/get-onboarding-form"
import { DashboardPage } from "@/components/DashboardPage"
import { Typography } from "@/uikit"

import { Banner } from "./Banner"
import { WhatsNext } from "./WhatsNext"
import { HeroBadge } from "./HeroBadge"
import { DeploymentProgress } from "./DeploymentProgress"

type DashboardHomePageProps = {
  team: Team
  silo?: Silo | null
}

export const DashboardHomePage = async ({
  team,
  silo = null,
}: DashboardHomePageProps) => {
  const isOnboardingFormSubmitted = !!(await getTeamOnboardingForm(team.id))

  return (
    <DashboardPage>
      <Hero
        hasDivider
        title={!silo ? "Welcome to Aurora Cloud" : `Welcome to ${team.name}`}
        description="Get started with your own Virtual Chain and start building! Configure your chain, set up on-ramps, bridges, and manage gas abstraction — all within the Aurora Cloud Console."
        image={
          <Image
            width="180"
            height="180"
            src="/static/v2/images/heroIcons/cloud.webp"
            alt="Aurora Cloud"
            className="mr-16 shadow-xl rounded-[2rem]"
          />
        }
        actions={
          <HeroBadge
            hasSilo={!!silo}
            isOnboardingFormSubmitted={isOnboardingFormSubmitted}
          />
        }
      />

      <section className="flex flex-col gap-14">
        {!silo && !isOnboardingFormSubmitted && (
          <section className="flex flex-col gap-5">
            <Typography variant="heading" size={3}>
              Start here
            </Typography>
            <div className="flex flex-col gap-4">
              <Banner
                variant="cta"
                title="Configure your Virtual Chain"
                description="Select the chain parameters that fit your needs — base token, gas costs, permissions, and more — to create a fully production-ready environment."
                Icon={
                  <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center">
                    <ArrowRightIcon className="w-6 h-6 text-white" />
                  </div>
                }
                link={{
                  isDisabled: false,
                  trackEventName: "get_started_click",
                  label: "Get started",
                  url: `/dashboard/${team.team_key}/create-chain`,
                }}
              />
            </div>
          </section>
        )}

        {!silo && (isOnboardingFormSubmitted || team.onboarding_status) ? (
          <DeploymentProgress
            status={team.onboarding_status ?? "REQUEST_RECEIVED"}
          />
        ) : null}

        <div className="flex flex-col">
          <h2 className="text-xl text-slate-900 font-bold tracking-tighter leading-6 mb-6">
            Get involved
          </h2>
          <FeatureCTAList>
            <FeatureCTA
              title="Share your feedback"
              description="Get 300 AURORA for sharing feedback about your Aurora Cloud experience."
              icon="/static/v2/images/examples/share-feedback.png"
              link="https://forms.gle/dqkE3aFxGwEaP3oJ7"
            />
            <FeatureCTA
              title="Join our Discord"
              description="Join the thriving Aurora community and get support on Discord."
              icon="/static/v2/images/examples/join-discord.png"
              link="https://discord.com/invite/auroralabs"
            />
            <FeatureCTA
              title="Join our Telegram"
              description="Get technical support and interact with other developers."
              icon="/static/v2/images/examples/join-telegram.png"
              link="https://t.me/aurorasupportteam"
            />
          </FeatureCTAList>
        </div>

        <WhatsNext team={team} />
      </section>
    </DashboardPage>
  )
}
