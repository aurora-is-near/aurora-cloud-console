import Card from "@/components/Card"
import { AuroraOracle } from "@/types/oracle"
import { TabCard } from "@/components/TabCard/TabCard"
import CopyButton from "@/components/CopyButton"
import { DeploymentPendingCta } from "@/components/OraclePage/DeploymentPendingCTA"

type OracleDeploymentTabProps = {
  teamKey: string
  oracle: AuroraOracle
}

export const OracleDeploymentTab = ({
  teamKey,
  oracle,
}: OracleDeploymentTabProps) => {
  const { address } = oracle.contract ?? {}

  if (!address) {
    return <DeploymentPendingCta teamKey={teamKey} />
  }

  return (
    <TabCard>
      <Card.Title tag="h3">Oracle contract</Card.Title>
      <div className="flex items-center justify-between m-6 mt-0 p-3 border border-l-4 border-slate-200">
        <span className="text-sm text-slate-900">{address}</span>
        <CopyButton hasBorder value={address} />
      </div>
    </TabCard>
  )
}
