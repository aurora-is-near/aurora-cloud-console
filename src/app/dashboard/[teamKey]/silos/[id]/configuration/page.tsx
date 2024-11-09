import { notFound } from "next/navigation"
import { sentenceCase } from "change-case"
import { getTokens } from "@/actions/tokens/get-tokens"
import { getTeamSiloByKey } from "@/actions/team-silos/get-team-silo-by-key"
import Contact from "@/components/Contact"
import { DashboardPage } from "@/components/DashboardPage"
import {
  ConfigurationItemsCard,
  ConfigurationItemsCardProps,
} from "./ConfigurationItemsCard"

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

  const items: ConfigurationItemsCardProps["items"] = [
    {
      term: "Network",
      description: sentenceCase(silo.network),
      tooltip: "Aurora Chains can be either public, permissioned, or private.",
    },
    {
      term: "Chain ID",
      description: silo.chain_id,
      tooltip:
        "EIP-155 standard field to protect against transaction replay attacks.",
      showCopyButton: true,
    },
    {
      term: "Genesis",
      description: silo.genesis,
      showCopyButton: true,
    },
    {
      term: "Engine account",
      description: silo.engine_account,
      tooltip: "EVM contract account on the Near blockchain.",
      showCopyButton: true,
    },
    {
      term: "Engine version",
      description: silo.engine_version,
      tooltip: "The version of the Aurora Engine used to power your chain.",
    },
    {
      term: "RPC URL",
      description: silo.rpc_url,
      tooltip: "Use this endpoint to access the network.",
      showCopyButton: true,
    },
  ]

  if (silo.explorer_url) {
    items.push({
      term: "Explorer",
      description: silo.explorer_url,
      tooltip: "You can trace the activity on your chain here.",
      showCopyButton: true,
    })
  }

  return (
    <DashboardPage heading="Configuration">
      <ConfigurationItemsCard
        title="Chain details"
        description="Virtual Chain configuration sets the key parameters that define your blockchain’s network and enable seamless operation."
        items={items}
      />

      <ConfigurationItemsCard
        title="Relayer"
        description="Provides access to the NEAR Explorer for tracking transactions and activity."
        items={[
          {
            term: "Near account",
            description: "relay.aurora",
            tooltip:
              "This account is responsible for paying gas on the Near blockchain for your Aurora chain. It will also accumulate the transaction fees collected on your chain.",
            showCopyButton: true,
          },
          {
            term: "Near explorer",
            description: "explorer.near.org/accounts/relay.aurora",
            tooltip:
              "You can trace the activity of the relay account in the Near Explorer here.",
            showCopyButton: true,
          },
        ]}
      />

      <ConfigurationItemsCard
        title="Token & gas"
        description="The base token and gas mechanism of your virtual chain."
        items={[
          {
            term: "Base token",
            description: baseToken?.symbol ?? "-",
            tooltip:
              "This is the token used to pay for the gas fees inside your Aurora Chain.",
          },
          {
            term: "Mechanics",
            description: "per transaction fee",
            tooltip:
              "Gas mechanics can either be based on usage or fixed (defined when creating your Aurora chain).",
          },
        ]}
      />

      <ConfigurationItemsCard
        title="Permissions"
        description="Your virtual chain access restrictions and contract deployment support."
        items={[
          {
            term: "Make transactions",
            description: "Allowed for whitelisted addresses",
            tooltip:
              "This whitelist contains the list of addresses allowed to interact with your chain.",
          },
          {
            term: "Deploy contracts",
            description: "Allowed for whitelisted addresses",
            tooltip:
              "This whitelist contains the list of addresses allowed to deploy contracts on your chain.",
          },
        ]}
      />

      <div>
        <Contact
          text="Need help configuring your chain?"
          teamKey={teamKey}
          className="!mt-12"
        />
      </div>
    </DashboardPage>
  )
}

export default Page
