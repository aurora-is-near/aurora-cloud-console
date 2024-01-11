import Button from "@/components/Button"
import Card from "@/components/Card"
import InfoList from "@/components/InfoList"
import { PlusIcon } from "@heroicons/react/20/solid"
import { Suspense } from "react"
import Header from "./Header"

const Page = ({ params: { id } }: { params: { id: string } }) => {
  return (
    <div className="space-y-4 sm:space-y-5">
      <Suspense>
        <Header siloId={Number(id)} />
      </Suspense>

      <Card tag="section">
        <Card.Title tag="h4">Silo configuration</Card.Title>

        <InfoList>
          <InfoList.Item
            term="Network"
            description="Public"
            explainer="Aurora Chains can be either public, permissioned, or private."
          />
          <InfoList.Item
            term="Chain ID"
            description="1313161567"
            explainer="EIP-155 standard field to protect against transaction replay attacks."
            showCopyButton
          />
          <InfoList.Item
            term="Genesis"
            description="1695870567776"
            showCopyButton
          />
          <InfoList.Item
            term="Engine account"
            description="silo-1.aurora-silo-dev.near"
            explainer="EVM contract account on the Near blockchain."
            showCopyButton
          />
          <InfoList.Item
            term="Engine version"
            description="2.0.22"
            explainer="The version of the Aurora Engine used to power your chain."
          />
          <InfoList.Item
            term="RPC URL"
            description="silo01.aurora.dev"
            explainer="Use this endpoint to access the network."
            showCopyButton
            action={
              <Button size="sm" style="border">
                <PlusIcon className="w-4 h-4" />
                <span>Add to MetaMask</span>
              </Button>
            }
          />
        </InfoList>
      </Card>

      <Card tag="section">
        <Card.Title tag="h4">Relayer</Card.Title>

        <InfoList>
          <InfoList.Item
            term="Near account"
            description="relay.aurora"
            explainer="This account is responsible for paying gas on the Near blockchain for your Aurora chain. It will also accumulate the transaction fees collected on your chain."
            showCopyButton
          />
          <InfoList.Item
            term="Near explorer"
            description="explorer.near.org/accounts/relay.aurora"
            explainer="You can trace the activity of the relay account in the Near Explorer here."
            showCopyButton
          />
        </InfoList>
      </Card>

      <Card tag="section">
        <Card.Title tag="h4">Token & gas</Card.Title>

        <InfoList>
          <InfoList.Item
            term="Base token"
            description="USDC"
            explainer="This is the token used to pay for the gas fees inside your Aurora Chain."
            action={
              <Button size="sm" style="border">
                <PlusIcon className="w-4 h-4" />
                <span>Add to MetaMask</span>
              </Button>
            }
          />
          <InfoList.Item
            term="Mechanics"
            description="per transaction fee"
            explainer="Gas mechanics can either be based on usage or fixed (defined when creating your Aurora chain)."
          />
        </InfoList>
      </Card>

      <Card tag="section">
        <Card.Title tag="h4">Permissions</Card.Title>

        <InfoList>
          <InfoList.Item term="Globally accessible" description="Yes" />
          <InfoList.Item
            term="Access controls"
            description="Enforced"
            explainer="This whitelist contains the list of addresses allowed to interact with your chain."
          />
          <InfoList.Item
            term="Contract deployment"
            description="Allowed"
            explainer="This whitelist contains the list of addresses allowed to deploy contracts on your chain."
          />
        </InfoList>
      </Card>
    </div>
  )
}

export default Page
