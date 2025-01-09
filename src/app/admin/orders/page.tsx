import { sentenceCase } from "change-case"
import { formatDate } from "@/utils/helpers"
import Table from "@/components/Table"
import { DashboardPage } from "@/components/DashboardPage"
import { getOrders } from "@/actions/orders/get-orders"

const Page = async ({ searchParams }: { searchParams: { team?: number } }) => {
  const orders = await getOrders({
    team: searchParams.team,
  })

  return (
    <DashboardPage heading="Orders">
      <section>
        <Table>
          <Table.TH>ID</Table.TH>
          <Table.TH>Team</Table.TH>
          <Table.TH align="center">Product Type</Table.TH>
          <Table.TH align="center">Payment Status</Table.TH>
          <Table.TH align="center">Created at</Table.TH>
          <Table.TH hidden>Actions</Table.TH>
          {orders.map((order) => (
            <Table.TR key={order.id}>
              <Table.TD>{order.id}</Table.TD>
              <Table.TD>{order.team?.name}</Table.TD>
              <Table.TD align="center">{sentenceCase(order.type)}</Table.TD>
              <Table.TD align="center">
                {sentenceCase(order.payment_status)}
              </Table.TD>
              <Table.TD align="center">{formatDate(order.created_at)}</Table.TD>
            </Table.TR>
          ))}
        </Table>
      </section>
    </DashboardPage>
  )
}

export default Page
