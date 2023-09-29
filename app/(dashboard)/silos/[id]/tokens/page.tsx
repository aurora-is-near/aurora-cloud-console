import BreadcrumbHeading from "@/components/BreadcrumbHeading"
import Button from "@/components/Button"
import CopyButton from "@/components/CopyButton"
import Table from "@/components/Table"
import { getSiloById } from "@/mockApi"
import { PlusIcon } from "@heroicons/react/20/solid"
import { notFound } from "next/navigation"

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  const silo = await getSiloById(id)

  if (!silo) notFound()

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <BreadcrumbHeading titles={[silo.name, "Tokens"]} />
        <Button>
          <PlusIcon className="h-5 w-5" />
          <span>Deploy token</span>
        </Button>
      </div>

      <Table className="mt-7">
        <Table.TH>Token</Table.TH>
        <Table.TH>Address</Table.TH>
        <Table.TH>Type</Table.TH>
        {silo.tokens.map((token) => (
          <Table.TR key={token.address}>
            <Table.TD dark>{token.name}</Table.TD>
            <Table.TD>
              {token.address} <CopyButton value={token.address} />
            </Table.TD>
            <Table.TD>{token.type}</Table.TD>
          </Table.TR>
        ))}
      </Table>
    </div>
  )
}

export default Page
