import Link from "next/link"
import { XMarkIcon } from "@heroicons/react/20/solid"
import OnboardingForm from "@/app/dashboard/[teamKey]/create-chain/OnboardingForm"
import { getTeamByKey } from "@/actions/teams/get-team-by-key"
import { trackEvent } from "@/components/Mixpanel/ServerTracker"

const Page = async ({
  params: { teamKey },
}: {
  params: { teamKey: string }
}) => {
  const team = await getTeamByKey(teamKey)

  await trackEvent("onboarding_started", {
    team_id: team.id,
  })

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-slate-50 flex flex-col">
      <div className="absolute top-6 right-6 w-6 h-6">
        <Link href={`/dashboard/${teamKey}`}>
          <span className="sr-only">Go back</span>
          <XMarkIcon className="w-7 h-7 text-slate-900" />
        </Link>
      </div>
      <OnboardingForm team={team} />
    </div>
  )
}

export default Page
