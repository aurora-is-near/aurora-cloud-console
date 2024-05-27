import Table from "@/components/Table"
import { formatDate } from "@/utils/helpers"
import { getTokens } from "@/actions/tokens/get-tokens"
import TableButton from "@/components/TableButton"
import { PencilSquareIcon, PlusCircleIcon } from "@heroicons/react/24/outline"
import { RemoveTokenButton } from "./RemoveTokenButton"
import { DashboardPage } from "@/components/DashboardPage"
import { LinkButton } from "@/components/LinkButton"

const Page = async () => {
  const tokens = await getTokens()

  return (
    <>
      <DashboardPage
        heading="Tokens"
        actions={
          <LinkButton href="/admin/tokens/add">
            <PlusCircleIcon className="w-5 h-5" />
            <span>Add token</span>
          </LinkButton>
        }
      >
        <section>
          {
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
                        href={`/admin/tokens/edit/${token.id}`}
                      />
                      <RemoveTokenButton token={token} />
                    </div>
                  </Table.TD>
                </Table.TR>
              ))}
            </Table>
          }
        </section>
      </DashboardPage>
    </>
  )
}

export default Page
