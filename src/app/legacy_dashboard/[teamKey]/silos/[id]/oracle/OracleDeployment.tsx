import { RocketLaunchIcon } from "@heroicons/react/24/outline"
import { OracleSchema } from "@/types/api-schemas"
import { NoDataCta } from "@/components/NoDataCta"
import { ContactButton } from "@/components/ContactButton"
import Card from "@/components/Card"
import CopyButton from "@/components/CopyButton"

type OracleDeploymentProps = {
  teamKey: string
  oracle: OracleSchema
}

export const OracleDeployment = ({
  teamKey,
  oracle,
}: OracleDeploymentProps) => {
  if (!oracle.address) {
    return (
      <div className="pt-20">
        <NoDataCta
          title="Deployment pending"
          description="Your Oracle is being deployed. Please check back later, or contact support if you have any questions."
          Icon={RocketLaunchIcon}
          className="mx-auto max-w-[320px]"
        >
          <ContactButton teamKey={teamKey} />
        </NoDataCta>
      </div>
    )
  }

  return (
    <div className="pt-4">
      <h2 className="text-2xl font-bold text-gray-900">Configuration</h2>
      <Card className="mt-6">
        <Card.Title tag="h3">Oracle contract</Card.Title>
        <div className="grid grid-cols-3">
          <Card.Cell className="text-sm font-medium">
            Your Oracle contract address
          </Card.Cell>
          <Card.Cell className="text-sm">{oracle.address}</Card.Cell>
          <Card.Cell className="flex justify-end">
            <CopyButton value={oracle.address} />
          </Card.Cell>
        </div>
      </Card>
    </div>
  )
}
