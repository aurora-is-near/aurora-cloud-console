import CopyButton from "@/components/CopyButton"
import Table from "@/components/Table"
import { getSiloById } from "@/mockApi"
import { notFound } from "next/navigation"

const TokensTable = async ({ siloId }: { siloId: string }) => {
  const silo = await getSiloById(siloId)

  if (!silo) notFound()

  return (
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
  )
}

export default TokensTable
