"use client"

import CopyButton from "@/components/CopyButton"
import Table from "@/components/Table"
import { useNotFoundError } from "@/hooks/useNotFoundError"
import { getQueryFnAndKey } from "@/utils/api/queries"
import { useQuery } from "@tanstack/react-query"

const TokensTable = ({ siloId }: { siloId: number }) => {
  const { data: tokens, error } = useQuery(
    getQueryFnAndKey("getSiloTokens", {
      id: siloId,
    }),
  )

  useNotFoundError(error)

  return (
    <Table>
      <Table.TH>Token</Table.TH>
      <Table.TH>Address</Table.TH>
      <Table.TH>Decimals</Table.TH>
      {tokens?.items.map((token) => (
        <Table.TR key={token.address}>
          <Table.TD dark>{token.symbol}</Table.TD>
          <Table.TD>
            {token.address} <CopyButton value={token.address} />
          </Table.TD>
          <Table.TD>{token.decimals}</Table.TD>
        </Table.TR>
      ))}
    </Table>
  )
}

export default TokensTable
