"use client"

import CopyButton from "@/components/CopyButton"
import { ErrorCard } from "@/components/ErrorCard"
import Table from "@/components/Table"
import { getQueryFnAndKey } from "@/utils/api/queries"
import { useQuery } from "@tanstack/react-query"

const TokensTable = ({ siloId }: { siloId: number }) => {
  const { data: tokens, error } = useQuery(
    getQueryFnAndKey("getSiloTokens", {
      id: siloId,
    }),
  )

  if (error) {
    return <ErrorCard error={error} />
  }

  return (
    <Table>
      <Table.TH>Token</Table.TH>
      <Table.TH>Address</Table.TH>
      <Table.TH>Token type</Table.TH>
      {tokens?.items.map((token) => (
        <Table.TR key={token.address}>
          <Table.TD dark>
            {token.iconUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={token.iconUrl}
                alt={`${token.name} icon`}
                className="w-6 h-6 inline-block"
              />
            )}
            {token.symbol}
          </Table.TD>
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
