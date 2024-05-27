import Table from "@/components/Table"
import { formatDate } from "@/utils/helpers"
import { getDeals } from "@/actions/deals/get-deals"
import TableButton from "@/components/TableButton"
import { PencilSquareIcon, PlusCircleIcon } from "@heroicons/react/24/outline"
import { RemoveDealButton } from "./RemoveDealButton"
import { DashboardPage } from "@/components/DashboardPage"
import { AdminToast } from "@/components/AdminToast"
import { getTeams } from "@/actions/teams/get-teams"
import { TeamFilter } from "./TeamFilter"
import { getTeamDeals } from "@/actions/team-deals/get-team-deals"
import { LinkButton } from "@/components/LinkButton"

const Page = async ({
  searchParams: { team },
}: {
  searchParams: { team?: number }
}) => {
  const [deals, teams] = await Promise.all([
    team ? getTeamDeals(team) : getDeals(),
    getTeams(),
  ])

  return (
    <>
      <DashboardPage
        heading="Deals"
        actions={
          <div className="flex flex-row space-x-3 items-center">
            <TeamFilter teams={teams} />
            <LinkButton href="/admin/deals/add">
              <PlusCircleIcon className="w-5 h-5" />
              <span>Add deal</span>
            </LinkButton>
          </div>
        }
      >
        <section>
          {
            <Table>
              <Table.TH>ID</Table.TH>
              <Table.TH>Name</Table.TH>
              <Table.TH align="center">Team ID</Table.TH>
              <Table.TH align="center">Created at</Table.TH>
              <Table.TH align="center">Updated at</Table.TH>
              <Table.TH hidden>Actions</Table.TH>
              {deals.map((deal) => (
                <Table.TR key={deal.id}>
                  <Table.TD>{deal.id}</Table.TD>
                  <Table.TD>{deal.name}</Table.TD>
                  <Table.TD align="center">{deal.team_id}</Table.TD>
                  <Table.TD align="center">
                    {formatDate(deal.created_at)}
                  </Table.TD>
                  <Table.TD align="center">
                    {formatDate(deal.updated_at)}
                  </Table.TD>
                  <Table.TD align="right">
                    <div className="flex gap-x-3">
                      <TableButton
                        Icon={PencilSquareIcon}
                        srOnlyText={`Edit ${deal.name}`}
                        href={`/admin/deals/edit/${deal.id}`}
                      />
                      <RemoveDealButton deal={deal} />
                    </div>
                  </Table.TD>
                </Table.TR>
              ))}
            </Table>
          }
        </section>
      </DashboardPage>
      <AdminToast itemName="Deal" />
    </>
  )
}

export default Page
