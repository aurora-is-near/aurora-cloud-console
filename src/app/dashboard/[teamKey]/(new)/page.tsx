import { redirect } from "next/navigation"
import { getTeamByKey } from "@/actions/teams/get-team-by-key"
import { getTeamSilos } from "@/actions/team-silos/get-team-silos"
import { DashboardHomePage } from "@/app/dashboard/[teamKey]/(new)/Dashboard"
import { getTeamOnboardingFormByKey } from "@/actions/onboarding/get-team-onboarding-form-by-key"
import { featureFlags } from "@/feature-flags/server"

const Page = async ({
  params: { teamKey },
}: {
  params: { teamKey: string }
}) => {
  const isAutomated = featureFlags.get("automate_silo_configuration")
  const [team, onboardingForm] = await Promise.all([
    getTeamByKey(teamKey),
    getTeamOnboardingFormByKey(teamKey),
  ])

  const [silo] = await getTeamSilos(team.id)

  if (silo) {
    redirect(`/dashboard/${teamKey}/silos/${silo.id}`)
  }

  // If the team has no silos return the "empty" state
  return (
    <DashboardHomePage
      team={team}
      onboardingForm={onboardingForm}
      isAutomated={isAutomated}
    />
  )
}

export default Page
