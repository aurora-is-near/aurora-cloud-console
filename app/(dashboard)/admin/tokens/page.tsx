import Table from "@/components/Table"
import Heading from "@/components/Heading"
import { formatDate } from "@/utils/helpers"
import { getTokens } from "@/actions/admin/get-tokens"
import TableButton from "@/components/TableButton"
import { PencilSquareIcon, PlusCircleIcon } from "@heroicons/react/24/outline"
import Button from "@/components/Button"
import { RemoveTokenButton } from "@/app/(dashboard)/admin/tokens/RemoveTokenButton"
import { Alert } from "@/components/Alert"

const Page = async ({
  searchParams,
}: {
  searchParams: { new_token?: string }
}) => {
  const tokens = await getTokens()
  const newToken = tokens.find(
    (token) => token.id === Number(searchParams["new_token"]),
  )

  return (
    <div className="space-y-6">
      <header className="flex space-y-3 md:space-y-0 md:flex-row flex-col md:items-center md:justify-between lg:flex-col lg:space-y-3 xl:flex-row xl:space-y-0 lg:items-start xl:items-center xl:justify-between">
        <div className="flex space-x-3.5">
          <Heading tag="h2">Tokens</Heading>
        </div>
        <div className="flex items-start sm:flex-row flex-col-reverse gap-3">
          <Button href="/admin/tokens/add">
            <PlusCircleIcon className="w-5 h-5" />
            <span>Add token</span>
          </Button>
        </div>
      </header>

      {newToken && (
        <Alert dismissable type="success" className="mb-6">
          Token created: {newToken.name}
        </Alert>
      )}

      <section>
        {
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
        }
      </section>
    </div>
  )
}

export default Page
