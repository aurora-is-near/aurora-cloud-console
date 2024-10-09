import { notFound } from "next/navigation"
import { getTeamSiloByKey } from "@/actions/team-silos/get-team-silo-by-key"
import { getTeamByKey } from "@/actions/teams/get-team-by-key"
import { GasAbstractionPage } from "@/components/GasAbstractionPage"
import { getTeamDealsByKey } from "@/actions/team-deals/get-team-deals-by-key"
import DealItem from "./DealItem"

const Page = async ({
  params: { id, teamKey },
}: {
  params: { id: number; teamKey: string }
}) => {
  const [team, silo, deals] = await Promise.all([
    getTeamByKey(teamKey),
    getTeamSiloByKey(teamKey, id),
    getTeamDealsByKey(teamKey),
  ])

  if (!silo) {
    notFound()
  }

  return (
    <GasAbstractionPage team={team} silo={silo}>
      {/* TODO: Deals are currently not scoped to a chain, we will need to make them so. */}
      {silo && (
        <ul className="grid gap-5 divide-gray-200">
          {deals.map((deal) => (
            <DealItem
              key={deal.id}
              deal={deal}
              silo={silo}
              teamKey={team.team_key}
            />
          ))}
        </ul>
      )}
    </GasAbstractionPage>
  )
}

export default Page
