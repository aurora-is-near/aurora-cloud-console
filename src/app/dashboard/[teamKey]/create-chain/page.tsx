import Link from "next/link"
import { XMarkIcon } from "@heroicons/react/20/solid"
import OnboardingForm from "@/app/dashboard/[teamKey]/create-chain/OnboardingForm"
import { getTeamByKey } from "@/actions/teams/get-team-by-key"
import { getTeamSilosByKey } from "@/actions/team-silos/get-team-silos-by-key"
import { isDevNet } from "@/utils/is-dev-net"

const Page = async ({
  params: { teamKey },
}: {
  params: { teamKey: string }
}) => {
  const [team, silos] = await Promise.all([
    getTeamByKey(teamKey),
    getTeamSilosByKey(teamKey),
  ])

  const hasDevNet = silos.some(isDevNet)

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-slate-50 flex flex-col">
      <div className="absolute top-6 right-6 w-6 h-6">
        <Link href={`/dashboard/${teamKey}`}>
          <span className="sr-only">Go back</span>
          <XMarkIcon className="w-7 h-7 text-slate-900" />
        </Link>
      </div>
      <OnboardingForm team={team} hasDevNet={hasDevNet} />
    </div>
  )
}

export default Page
