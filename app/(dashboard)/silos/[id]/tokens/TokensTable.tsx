"use client"

import CopyButton from "@/components/CopyButton"
import Table from "@/components/Table"
import { useNotFoundError } from "@/hooks/useNotFoundError"
import { useSiloTokens } from "@/utils/api/queries"

const TokensTable = ({ siloId }: { siloId: string }) => {
  const { data: tokens, error } = useSiloTokens({ id: siloId })

  useNotFoundError(error)

  return (
    <Table className="mt-7">
      <Table.TH>Token</Table.TH>
      <Table.TH>Address</Table.TH>
      <Table.TH>Type</Table.TH>
      {tokens?.map((token) => (
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
