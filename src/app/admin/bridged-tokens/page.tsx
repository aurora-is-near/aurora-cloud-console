import { PencilSquareIcon, PlusCircleIcon } from "@heroicons/react/24/outline"
import { formatDate } from "@/utils/helpers"
import Table from "@/components/Table"
import TableButton from "@/components/TableButton"
import { DashboardPage } from "@/components/DashboardPage"
import { LinkButton } from "@/components/LinkButton"
import { getBridgedTokens } from "@/actions/bridged-tokens/get-bridged-tokens"
import { DeleteBridgedTokenTableButton } from "./DeleteBridgedTokenTableButton"

const Page = async () => {
  const tokens = await getBridgedTokens()

  return (
    <DashboardPage
      heading="Bridged tokens"
      actions={
        <LinkButton href="/admin/bridged-tokens/add">
          <PlusCircleIcon className="w-5 h-5" />
          <span>Add token</span>
        </LinkButton>
      }
    >
      <section>
        <Table>
          <Table.TH>ID</Table.TH>
          <Table.TH>Name</Table.TH>
          <Table.TH>Symbol</Table.TH>
          <Table.TH align="center">Created at</Table.TH>
          <Table.TH hidden>Actions</Table.TH>
          {tokens.map((token) => (
            <Table.TR key={token.id}>
              <Table.TD>{token.id}</Table.TD>
              <Table.TD>{token.name}</Table.TD>
              <Table.TD>{token.symbol}</Table.TD>
              <Table.TD align="center">{formatDate(token.created_at)}</Table.TD>
              <Table.TD align="right">
                <div className="flex gap-x-3">
                  <TableButton
                    Icon={PencilSquareIcon}
                    srOnlyText={`Edit ${token.name}`}
                    href={`/admin/bridged-tokens/edit/${token.id}`}
                  />
                  <DeleteBridgedTokenTableButton token={token} />
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
