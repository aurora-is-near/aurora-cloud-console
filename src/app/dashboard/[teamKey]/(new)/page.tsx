import { redirect } from "next/navigation"
import { getTeamByKey } from "@/actions/teams/get-team-by-key"
import { getTeamSilos } from "@/actions/team-silos/get-team-silos"
import { DashboardHomePage } from "@/app/dashboard/[teamKey]/(new)/Dashboard"
import { getTeamOnboardingFormByKey } from "@/actions/onboarding/get-team-onboarding-form-by-key"
import { getUnassignedSiloId } from "@/actions/silos/get-unassigned-silo-id"

const Page = async ({
  params: { teamKey },
}: {
  params: { teamKey: string }
}) => {
  const [team, onboardingForm, unassignedSiloId] = await Promise.all([
    getTeamByKey(teamKey),
    getTeamOnboardingFormByKey(teamKey),
    getUnassignedSiloId(),
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
      hasUnassignedSilo={!!unassignedSiloId}
    />
  )
}

export default Page
