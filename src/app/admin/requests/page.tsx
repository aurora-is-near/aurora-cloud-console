import { EyeIcon } from "@heroicons/react/24/outline"
import { formatDate } from "@/utils/helpers"
import Table from "@/components/Table"
import { DashboardPage } from "@/components/DashboardPage"
import { getBridgedTokenRequests } from "@/actions/bridged-tokens/get-bridged-token-requests"
import { ResolveButton } from "@/app/admin/requests/ResolveButton"
import { resolveBridgedTokenRequest } from "@/actions/bridged-tokens/resolve-bridged-token-request"
import TableButton from "@/components/TableButton"

const Page = async () => {
  const bridgedTokenRequests = await getBridgedTokenRequests()

  return (
    <DashboardPage heading="Requests">
      <section>
        <Table>
          <Table.TH>ID</Table.TH>
          <Table.TH>Type</Table.TH>
          <Table.TH align="center">Created at</Table.TH>
          <Table.TH hidden>Actions</Table.TH>
          {bridgedTokenRequests.map((request) => (
            <Table.TR key={request.id}>
              <Table.TD>{request.id}</Table.TD>
              <Table.TD>Bridged token</Table.TD>
              <Table.TD align="center">
                {formatDate(request.created_at)}
              </Table.TD>
              <Table.TD align="right">
                <div className="flex gap-x-3">
                  <TableButton
                    Icon={EyeIcon}
                    srOnlyText="View request"
                    href={`/admin/requests/bridged-tokens/${request.id}`}
                  />
                  <ResolveButton
                    isTableButton
                    id={request.id}
                    onResolved={resolveBridgedTokenRequest}
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
