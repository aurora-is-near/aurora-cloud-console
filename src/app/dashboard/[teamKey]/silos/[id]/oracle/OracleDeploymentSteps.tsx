import { Button } from "@/components/Button"
import Card from "@/components/Card"
import { OracleDeploymentStep } from "./OracleDeploymentStep"

export const OracleDeploymentSteps = () => {
  const isWalletConnected = false

  return (
    <div className="pt-4">
      <h2 className="text-2xl font-bold text-gray-900">Deployment steps</h2>
      <div className="flex flex-col mt-6 space-y-6">
        <OracleDeploymentStep stepNumber={1} connectingLine="solid">
          <Card.Title>Select price feeds</Card.Title>
          <Card.Subtitle>
            We already support some price feeds. You can add custom price feeds
            to your oracle before deployment.
          </Card.Subtitle>
        </OracleDeploymentStep>

        <OracleDeploymentStep
          stepNumber={2}
          connectingLine={isWalletConnected ? "solid" : "dashed"}
        >
          <Card.Title>Connect your wallet</Card.Title>
          <Card.Subtitle>
            The cloud oracle needs to be deployed on your Aurora Chain for you
            to start interacting with it.
          </Card.Subtitle>
          <Card.Actions>
            <Button>Connect wallet</Button>
          </Card.Actions>
        </OracleDeploymentStep>

        <OracleDeploymentStep isDisabled={!isWalletConnected} stepNumber={3}>
          <Card.Title isDisabled={!isWalletConnected}>
            Deploy the Cloud Oracle contract
          </Card.Title>
          <Card.Subtitle>
            The cloud oracle needs to be deployed on your Aurora Chain for you
            to start interacting with it.
          </Card.Subtitle>
          <Card.Actions>
            <Button
              disabled={!isWalletConnected}
              variant={isWalletConnected ? "primary" : "grey"}
            >
              Deploy now
            </Button>
          </Card.Actions>
        </OracleDeploymentStep>
      </div>
    </div>
  )
}
