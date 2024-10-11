import { RocketLaunchIcon } from "@heroicons/react/24/outline"
import { NoDataCta } from "@/components/NoDataCta"
import { ContactButton } from "@/components/ContactButton"
import Card from "@/components/Card"
import { AuroraOracle } from "@/types/oracle"
import { Input } from "@/components/Input"
import { OracleCopyAddressButton } from "@/components/OraclePage/OracleCopyAddressButton"

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
      <Card className="w-full">
        <NoDataCta
          title="Deployment pending"
          description="Your Oracle is being deployed. Please check back later, or contact support if you have any questions."
          Icon={RocketLaunchIcon}
          className="mx-auto max-w-[320px] py-6"
        >
          <ContactButton teamKey={teamKey} />
        </NoDataCta>
      </Card>
    )
  }

  return (
    <Card className="w-full">
      <Card.Title tag="h3">Oracle contract</Card.Title>
      <Card.Body>
        <label htmlFor="oracle-address" className="sr-only">
          Oracle contract address
        </label>
        <Input
          name="oracle-address"
          id="oracle-address"
          value={address}
          className="mb-4"
          readOnly
        />
        <OracleCopyAddressButton address={address} />
      </Card.Body>
    </Card>
  )
}
