import Link from "next/link"
import { XMarkIcon } from "@heroicons/react/20/solid"
import OnboardingForm from "@/app/dashboard/[teamKey]/create-chain/OnboardingForm"
import { getTeamByKey } from "@/actions/teams/get-team-by-key"

const Page = async ({
  params: { teamKey },
}: {
  params: { teamKey: string }
}) => {
  const team = await getTeamByKey(teamKey)

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-slate-50 flex flex-col">
      <div className="flex justify-between bg-white full-w border-b-2 border-slate-200 p-6">
        <div />
        <span>Set up your Aurora Chain</span>
        <Link href={`/dashboard/${teamKey}`}>
          <span className="sr-only">Go back</span>
          <XMarkIcon className="w-6 h-6" />
        </Link>
      </div>
      <OnboardingForm team={team} />
    </div>
  )
}

export default Page
