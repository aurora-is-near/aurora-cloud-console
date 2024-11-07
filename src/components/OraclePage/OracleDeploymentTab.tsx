import { RocketLaunchIcon } from "@heroicons/react/24/outline"
import { NoDataCta } from "@/components/NoDataCta"
import { ContactButton } from "@/components/ContactButton"
import Card from "@/components/Card"
import { AuroraOracle } from "@/types/oracle"
import { TabCard } from "@/components/TabCard/TabCard"
import CopyButton from "@/components/CopyButton"

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
    return (
      <TabCard>
        <NoDataCta
          title="Deployment pending"
          description="Your Oracle is being deployed. Please check back later, or contact support if you have any questions."
          Icon={RocketLaunchIcon}
          className="mx-auto max-w-[320px] py-6"
        >
          <ContactButton teamKey={teamKey} />
        </NoDataCta>
      </TabCard>
    )
  }

  return (
    <TabCard>
      <Card.Title tag="h3">Oracle contract</Card.Title>
      <div className="flex items-center justify-between m-6 mt-0 p-3 border border-l-4 border-slate-200">
        <span className="text-sm text-slate-900">{address}</span>
        <CopyButton value={address} />
      </div>
    </TabCard>
  )
}
