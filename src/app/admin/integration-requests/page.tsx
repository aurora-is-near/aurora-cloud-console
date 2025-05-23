import { PencilSquareIcon } from "@heroicons/react/24/outline"
import Table from "@/components/Table"
import { DashboardPage } from "@/components/DashboardPage"
import { formatDate } from "@/utils/helpers"
import TableButton from "@/components/TableButton"
import { getIntegrationRequests } from "@/actions/integration-requests/get-integration-requests"

const Page = async () => {
  const integrationRequests = await getIntegrationRequests()

  return (
    <DashboardPage heading="Integration Requests">
      <section>
        <Table>
          <Table.TH>ID</Table.TH>
          <Table.TH>Silo ID</Table.TH>
          <Table.TH>Silo Name</Table.TH>
          <Table.TH>Type</Table.TH>
          <Table.TH>Status</Table.TH>
          <Table.TH align="center">Created at</Table.TH>
          <Table.TH hidden>Actions</Table.TH>
          {integrationRequests.map((integrationRequest) => (
            <Table.TR key={integrationRequest.id}>
              <Table.TD>{integrationRequest.id}</Table.TD>
              <Table.TD>{integrationRequest.silo.id}</Table.TD>
              <Table.TD>{integrationRequest.silo.name}</Table.TD>
              <Table.TD>{integrationRequest.type}</Table.TD>
              <Table.TD>{integrationRequest.status}</Table.TD>
              <Table.TD align="center">
                {formatDate(integrationRequest.created_at)}
              </Table.TD>
              <Table.TD align="right">
                <div className="flex gap-x-3">
                  <TableButton
                    Icon={PencilSquareIcon}
                    srOnlyText={`Edit ${integrationRequest.type} request`}
                    href={`/admin/integration-requests/edit/${integrationRequest.id}`}
                  />
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
