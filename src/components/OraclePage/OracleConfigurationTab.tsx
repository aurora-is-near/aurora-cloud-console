import { AuroraOracle } from "@/types/oracle"
import { Token } from "@/types/types"
import { DeploymentPendingCta } from "@/components/OraclePage/DeploymentPendingCTA"
import ConfigurationPanel from "@/components/FiatOnrampPage/ConfigurationPanel"
import { Button } from "@/components/Button"

type OracleConfigurationTabProps = {
  teamKey: string
  oracle: AuroraOracle
  tokens?: Token[]
}

export const OracleConfigurationTab = ({
  teamKey,
  oracle,
  tokens,
}: OracleConfigurationTabProps) => {
  const { address } = oracle.contract ?? {}

  const tokenCombinations =
    tokens
      ?.filter((token) => token.deployment_status === "DEPLOYED")
      .flatMap((tokenA, index, filteredTokens) =>
        filteredTokens
          .filter((_, i) => i !== index)
          .map((tokenB) => ({ tokenA, tokenB })),
      ) ?? []

  if (!address) {
    return <DeploymentPendingCta teamKey={teamKey} />
  }

  return (
    <ConfigurationPanel>
      <div className="flex flex-col gap-2">
        <h3 className="text-lg text-slate-900 tracking-tighter font-semibold">
          Test price feeds
        </h3>
        <p className="text-sm text-slate-500 max-w-sm">
          Test a price feed pair and receive real-time market data.
        </p>
      </div>
      <div className="flex flex-row justify-start gap-2 items-center">
        <select className="text-sm border-slate-300 rounded">
          {tokenCombinations.map(({ tokenA, tokenB }) => (
            <option
              key={tokenA.symbol + tokenB.symbol}
              value={`${tokenA.symbol}-${tokenB.symbol}`}
            >
              {tokenA.symbol} / {tokenB.symbol}
            </option>
          ))}
        </select>
        <Button>Check</Button>
      </div>
    </ConfigurationPanel>
  )
}
