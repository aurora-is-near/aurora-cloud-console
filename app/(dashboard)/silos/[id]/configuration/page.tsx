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
            explainer="Lorem ipsum dolor sit amet consectetur adipisicing elit."
          />
          <InfoList.Item
            term="Chain ID"
            description="1313161567"
            explainer="Lorem ipsum dolor sit amet consectetur adipisicing elit."
            showCopyButton
          />
          <InfoList.Item
            term="Genesis"
            description="1695870567776"
            explainer="Lorem ipsum dolor sit amet consectetur adipisicing elit."
            showCopyButton
          />
          <InfoList.Item
            term="Engine account"
            description="silo-1.aurora-silo-dev.near"
            explainer="Lorem ipsum dolor sit amet consectetur adipisicing elit."
            showCopyButton
          />
          <InfoList.Item
            term="Engine version"
            description="2.0.22"
            explainer="Lorem ipsum dolor sit amet consectetur adipisicing elit."
          />
          <InfoList.Item
            term="RPC URL"
            description="silo01.aurora.dev"
            explainer="Lorem ipsum dolor sit amet consectetur adipisicing elit."
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
            explainer="Lorem ipsum dolor sit amet consectetur adipisicing elit."
            showCopyButton
          />
          <InfoList.Item
            term="Near explorer"
            description="explorer.near.org/accounts/relay.aurora"
            explainer="Lorem ipsum dolor sit amet consectetur adipisicing elit."
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
            explainer="Lorem ipsum dolor sit amet consectetur adipisicing elit."
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
            explainer="Lorem ipsum dolor sit amet consectetur adipisicing elit."
          />
        </InfoList>
      </Card>

      <Card tag="section">
        <Card.Title tag="h4">Permissions</Card.Title>

        <InfoList>
          <InfoList.Item
            term="Globally accessible"
            description="Yes"
            explainer="Lorem ipsum dolor sit amet consectetur adipisicing elit."
          />
          <InfoList.Item
            term="Access controls"
            description="Enforced"
            explainer="Lorem ipsum dolor sit amet consectetur adipisicing elit."
          />
          <InfoList.Item
            term="Contract deployment"
            description="Allowed"
            explainer="Lorem ipsum dolor sit amet consectetur adipisicing elit."
          />
        </InfoList>
      </Card>
    </div>
  )
}

export default Page
