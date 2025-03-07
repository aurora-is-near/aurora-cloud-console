import { PencilSquareIcon } from "@heroicons/react/24/outline"
import { notFound } from "next/navigation"
import Table from "@/components/Table"
import { formatDate } from "@/utils/helpers"
import TableButton from "@/components/TableButton"
import { DashboardPage } from "@/components/DashboardPage"
import { getSiloTokens } from "@/actions/silo-bridged-tokens/get-silo-bridged-tokens"
import { getSilo } from "@/actions/silos/get-silo"
import { DeleteTokenTableButton } from "./DeleteTokenTableButton"
import { AddTokenButton } from "../AddTokenButton"

const Page = async ({ params: { id } }: { params: { id: number } }) => {
  const [tokens, silo] = await Promise.all([getSiloTokens(id), getSilo(id)])

  if (!silo) {
    notFound()
  }

  return (
    <DashboardPage
      heading={["Silos", silo.name, "Tokens"]}
      actions={<AddTokenButton silo={silo} />}
    >
      <section>
        <Table>
          <Table.TH>ID</Table.TH>
          <Table.TH>Name</Table.TH>
          <Table.TH>Address</Table.TH>
          <Table.TH>Type</Table.TH>
          <Table.TH>Created</Table.TH>
          <Table.TH hidden>Actions</Table.TH>
          {tokens.map((token) => (
            <Table.TR key={token.id}>
              <Table.TD>{token.id}</Table.TD>
              <Table.TD>{token.symbol}</Table.TD>
              <Table.TD>{token.address}</Table.TD>
              <Table.TD>{token.type}</Table.TD>
              <Table.TD>{formatDate(token.created_at)}</Table.TD>
              <Table.TD align="right">
                <div className="flex gap-x-3">
                  <TableButton
                    Icon={PencilSquareIcon}
                    srOnlyText={`Edit ${token.symbol}`}
                    href={`/admin/silos/edit/${silo.id}/tokens/edit/${token.id}`}
                  />
                  <DeleteTokenTableButton token={token} />
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
