import { PlusCircleIcon } from "@heroicons/react/24/outline"

import { DashboardPage } from "@/components/DashboardPage"
import { LinkButton } from "@/components/LinkButton"
import { getTeams } from "@/actions/teams/get-teams"
import { getOnboardingForms } from "@/actions/onboarding/get-onboarding-forms"
import TeamsTable from "./TeamsTable"

const Page = async () => {
  const [teams, onboardingForms] = await Promise.all([
    getTeams(),
    getOnboardingForms(),
  ])

  return (
    <DashboardPage
      heading="Teams"
      actions={
        <LinkButton href="/admin/teams/add">
          <PlusCircleIcon className="w-5 h-5" />
          <span>Add team</span>
        </LinkButton>
      }
    >
      <TeamsTable teams={teams} onboardingForms={onboardingForms} />
    </DashboardPage>
  )
}

export default Page
