import { notFound } from "next/navigation"
import { sentenceCase } from "change-case"
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline"
import Card from "@/components/Card"
import InfoList from "@/components/InfoList"
import { getTokens } from "@/actions/tokens/get-tokens"
import { getTeamSiloByKey } from "@/actions/team-silos/get-team-silo-by-key"
import Contact from "@/components/Contact"
import { Button } from "@/components/Button"
import { DashboardPage } from "@/components/DashboardPage"
import { LinkButton } from "@/components/LinkButton"
import { AddTokenToMetaMaskButton } from "./AddTokenToMetaMaskButton"
import { AddSiloToMetaMaskButton } from "./AddSiloToMetaMaskButton"

const Page = async ({
  params: { id, teamKey },
}: {
  params: { id: string; teamKey: string }
}) => {
  const [silo, tokens] = await Promise.all([
    getTeamSiloByKey(teamKey, Number(id)),
    getTokens(),
  ])

  if (!silo) {
    notFound()
  }

  const baseToken = tokens.find((token) => token.id === silo.base_token_id)

  return (
    <DashboardPage
      heading="Configuration"
      actions={
        silo.explorer_url ? (
          <LinkButton variant="border" href={silo.explorer_url} target="_blank">
            <span>Block Explorer</span>
            <ArrowTopRightOnSquareIcon className="w-4 h-4" />
          </LinkButton>
        ) : null
      }
    >
      <Card borderRadius="xl" tag="section">
        <Card.Title tag="h2">Chain details</Card.Title>

        <InfoList>
          <InfoList.Item
            term="Network"
            description={sentenceCase(silo.network)}
            explainer="Aurora Chains can be either public, permissioned, or private."
          />
          <InfoList.Item
            term="Chain ID"
            description={silo.chain_id}
            explainer="EIP-155 standard field to protect against transaction replay attacks."
            showCopyButton
          />
          <InfoList.Item
            term="Genesis"
            description={silo.genesis}
            showCopyButton
          />
          <InfoList.Item
            term="Engine account"
            description={silo.engine_account}
            explainer="EVM contract account on the Near blockchain."
            showCopyButton
          />
          <InfoList.Item
            term="Engine version"
            description={silo.engine_version}
            explainer="The version of the Aurora Engine used to power your chain."
          />
          <InfoList.Item
            term="RPC URL"
            description={silo.rpc_url}
            explainer="Use this endpoint to access the network."
            showCopyButton
            action={
              baseToken && (
                <AddSiloToMetaMaskButton silo={silo} token={baseToken} />
              )
            }
          />
        </InfoList>
      </Card>

      <Card borderRadius="xl" tag="section">
        <Card.Title tag="h2">Relayer</Card.Title>

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

      <Card borderRadius="xl" tag="section">
        <Card.Title tag="h2">Token & gas</Card.Title>

        <InfoList>
          <InfoList.Item
            term="Base token"
            description={baseToken?.symbol ?? "-"}
            explainer="This is the token used to pay for the gas fees inside your Aurora Chain."
            action={baseToken && <AddTokenToMetaMaskButton token={baseToken} />}
          />
          <InfoList.Item
            term="Mechanics"
            description="per transaction fee"
            explainer="Gas mechanics can either be based on usage or fixed (defined when creating your Aurora chain)."
          />
        </InfoList>
      </Card>

      <Card borderRadius="xl" tag="section">
        <Card.Title tag="h2">Permissions</Card.Title>

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

      <Contact text="Need help configuring your chain?" teamKey={teamKey} />
    </DashboardPage>
  )
}

export default Page
