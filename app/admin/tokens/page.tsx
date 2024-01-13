import { PencilSquareIcon, PlusCircleIcon } from "@heroicons/react/24/outline"
import Table from "@/components/Table"
import { formatDate } from "@/utils/helpers"
import { getTokens } from "@/actions/admin/tokens/get-tokens"
import TableButton from "@/components/TableButton"
import Button from "@/components/Button"
import { RemoveTokenButton } from "@/app/admin/tokens/RemoveTokenButton"
import { AdminPage } from "@/components/AdminPage"
import { AdminToast } from "@/components/AdminToast"

const Page = async () => {
  const tokens = await getTokens()

  return (
    <>
      <AdminPage
        title="Tokens"
        actions={
          <Button href="/admin/tokens/add">
            <PlusCircleIcon className="w-5 h-5" />
            <span>Add token</span>
          </Button>
        }
      >
        <section>
          <Table>
            <Table.TH>Name</Table.TH>
            <Table.TH>Address</Table.TH>
            <Table.TH>Type</Table.TH>
            <Table.TH>Created</Table.TH>
            <Table.TH hidden>Actions</Table.TH>
            {tokens.map((token) => (
              <Table.TR key={token.id}>
                <Table.TD>{token.name}</Table.TD>
                <Table.TD>{token.address}</Table.TD>
                <Table.TD>{token.type}</Table.TD>
                <Table.TD>{formatDate(new Date(token.created_at))}</Table.TD>
                <Table.TD align="right">
                  <div className="flex gap-x-3">
                    <TableButton
                      Icon={PencilSquareIcon}
                      srOnlyText={`Edit ${token.name}`}
                      href={`/admin/tokens/edit/${token.id}`}
                    />
                    <RemoveTokenButton token={token} />
                  </div>
                </Table.TD>
              </Table.TR>
            ))}
          </Table>
        </section>
      </AdminPage>
      <AdminToast itemName="Token" />
    </>
  )
}

export default Page
