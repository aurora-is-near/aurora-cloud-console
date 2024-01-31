import Table from "@/components/Table"
import { formatDate } from "@/utils/helpers"
import { getDeals } from "@/actions/admin/deals/get-deals"
import TableButton from "@/components/TableButton"
import { PencilSquareIcon, PlusCircleIcon } from "@heroicons/react/24/outline"
import Button from "@/components/Button"
import { RemoveDealButton } from "@/app/admin/deals/RemoveDealButton"
import { AdminPage } from "@/components/AdminPage"
import { AdminToast } from "@/components/AdminToast"

const Page = async () => {
  const deals = await getDeals()

  return (
    <>
      <AdminPage
        title="Deals"
        actions={
          <Button href="/admin/deals/add">
            <PlusCircleIcon className="w-5 h-5" />
            <span>Add deal</span>
          </Button>
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
      </AdminPage>
      <AdminToast itemName="Deal" />
    </>
  )
}

export default Page
