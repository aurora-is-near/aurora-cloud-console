import { PencilSquareIcon, PlusCircleIcon } from "@heroicons/react/24/outline"
import Table from "@/components/Table"
import { formatDate } from "@/utils/helpers"
import TableButton from "@/components/TableButton"
import { DashboardPage } from "@/components/DashboardPage"
import { LinkButton } from "@/components/LinkButton"
import { getTeamDealsByKey } from "@/actions/team-deals/get-team-deals-by-key"
import { DeleteDealTableButton } from "./DeleteDealTableButton"

const Page = async ({
  params: { teamKey },
}: {
  params: { teamKey: string }
}) => {
  const deals = await getTeamDealsByKey(teamKey)

  return (
    <DashboardPage
      heading="Deals"
      actions={
        <div className="flex flex-row space-x-3 items-center">
          <LinkButton href={`/dashboard/${teamKey}/admin/deals/add`}>
            <PlusCircleIcon className="w-5 h-5" />
            <span>Add deal</span>
          </LinkButton>
        </div>
      }
    >
      <section>
        <Table>
          <Table.TH>ID</Table.TH>
          <Table.TH>Name</Table.TH>
          <Table.TH align="center">Created at</Table.TH>
          <Table.TH align="center">Updated at</Table.TH>
          <Table.TH hidden>Actions</Table.TH>
          {deals.map((deal) => (
            <Table.TR key={deal.id}>
              <Table.TD>{deal.id}</Table.TD>
              <Table.TD>{deal.name}</Table.TD>
              <Table.TD align="center">{formatDate(deal.created_at)}</Table.TD>
              <Table.TD align="center">{formatDate(deal.updated_at)}</Table.TD>
              <Table.TD align="right">
                <div className="flex gap-x-3">
                  <TableButton
                    Icon={PencilSquareIcon}
                    srOnlyText={`Edit ${deal.name}`}
                    href={`/dashboard/${teamKey}/admin/deals/edit/${deal.id}`}
                  />
                  <DeleteDealTableButton deal={deal} />
                </div>
              </Table.TD>
            </Table.TR>
          ))}
        </Table>
      </section>
    </DashboardPage>
  )
}

export default Page
