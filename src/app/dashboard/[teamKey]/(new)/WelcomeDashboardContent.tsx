"use client"

import { CheckIcon } from "@heroicons/react/24/outline"
import { useState } from "react"

import Hero from "@/components/Hero/Hero"
import {
  OnboardingForm,
  Silo,
  SiloConfigTransactionStatus,
  Team,
} from "@/types/types"
import { FeatureCTA } from "@/components/FeatureCTA"
import { FeatureCTAList } from "@/components/FeatureCTAList"
import { DashboardPage } from "@/components/DashboardPage"
import { DeploymentProgressManual } from "./DeploymentProgressManual"
import { DeploymentProgressAuto } from "./DeploymentProgressAuto"
import { WhatsNext } from "./WhatsNext"
import { HeroImage } from "./HeroImage"

type WelcomeDashboardContentProps = {
  team: Team
  silo?: Silo | null
  onboardingForm: OnboardingForm | null
  isAutomated: boolean
  siloBaseTokenTransactionStatus?: SiloConfigTransactionStatus
}

export const WelcomeDashboardContent = ({
  team,
  silo = null,
  onboardingForm,
  isAutomated,
  siloBaseTokenTransactionStatus,
}: WelcomeDashboardContentProps) => {
  const [isDeploymentComplete, setIsDeploymentComplete] = useState<boolean>(
    !!silo?.is_active,
  )

  return (
    <DashboardPage>
      <Hero
        hasDivider
        title={
          isDeploymentComplete ? (
            <>
              <div className="w-11 h-11 flex items-center justify-center rounded-full bg-green-400">
                <CheckIcon className="w-6 h-6 stroke-2 stroke-slate-900" />
              </div>
              Your chain is live
            </>
          ) : (
            <div className="tracking-normal">
              Your virtual chain,
              <br />
              <span className="text-3xl text-slate-600 tracking-tight">
                ready in minutes
              </span>
            </div>
          )
        }
        description={
          isDeploymentComplete
            ? "Your virtual chain is ready — start building with Aurora Cloud stack."
            : "Welcome to Aurora Cloud! Set up your virtual chain in just a few steps and let the automatic deployment handle the rest."
        }
        image={<HeroImage isSiloReady={!!silo} />}
      >
        {isAutomated && (
          <DeploymentProgressAuto
            team={team}
            silo={silo}
            isDeploymentComplete={isDeploymentComplete}
            setIsDeploymentComplete={setIsDeploymentComplete}
            isOnboardingFormSubmitted={!!onboardingForm}
            siloBaseTokenTransactionStatus={siloBaseTokenTransactionStatus}
          />
        )}
      </Hero>

      <section className="flex flex-col pt-4 gap-14">
        {!isAutomated && (
          <DeploymentProgressManual
            status={team.onboarding_status ?? "REQUEST_RECEIVED"}
          />
        )}

        <WhatsNext team={team} />

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
      </section>
    </DashboardPage>
  )
}
