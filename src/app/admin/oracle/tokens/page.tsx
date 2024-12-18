import { PlusCircleIcon } from "@heroicons/react/24/outline"
import Table from "@/components/Table"
import { DashboardPage } from "@/components/DashboardPage"
import { LinkButton } from "@/components/LinkButton"
import { auroraOracleApiClient } from "@/utils/aurora-oracle-api/client"

const Page = async () => {
  const { items: tokens } = await auroraOracleApiClient.getTokens()

  return (
    <DashboardPage
      heading="Oracle tokens"
      actions={
        <div className="flex flex-row space-x-3 items-center">
          <LinkButton href="/admin/oracle/tokens/add">
            <PlusCircleIcon className="w-5 h-5" />
            <span>Add token</span>
          </LinkButton>
        </div>
      }
    >
      <section>
        <Table>
          <Table.TH>ID</Table.TH>
          <Table.TH>Symbol</Table.TH>
          <Table.TH>CoinGecko Alias</Table.TH>
          {tokens.map((token) => (
            <Table.TR key={token.id}>
              <Table.TD>{token.id}</Table.TD>
              <Table.TD>{token.symbol}</Table.TD>
              <Table.TD>{token.coinGeckoAlias}</Table.TD>
            </Table.TR>
          ))}
        </Table>
      </section>
    </DashboardPage>
  )
}

export default Page
