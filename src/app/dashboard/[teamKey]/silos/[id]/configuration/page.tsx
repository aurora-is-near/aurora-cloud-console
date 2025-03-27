import Contact from "@/components/Contact"
import { DashboardPage } from "@/components/DashboardPage"
import { getRelayerAccount } from "@/utils/relayer"

import { useRequiredContext } from "@/hooks/useRequiredContext"
import { SiloContext } from "@/providers/SiloProvider"
import {
  ConfigurationItemsCard,
  ConfigurationItemsCardProps,
} from "./ConfigurationItemsCard"
import { EditPermissions } from "./EditPermissions"
import { CopyAction } from "./CopyAction"

const Page = () => {
  const { silo } = useRequiredContext(SiloContext)

  const relayerAccount = getRelayerAccount(silo)

  const items: ConfigurationItemsCardProps["items"] = [
    {
      term: "Network",
      description: silo.is_make_txs_public ? "Public" : "Private",
      tooltip: "Aurora Chains can be either public, permissioned, or private.",
    },
    {
      term: "Chain ID",
      description: String(silo.chain_id),
      tooltip:
        "EIP-155 standard field to protect against transaction replay attacks.",
      Action: CopyAction,
    },
    {
      term: "Genesis",
      description: silo.genesis,
      Action: CopyAction,
    },
    {
      term: "Engine account",
      description: silo.engine_account,
      tooltip: "EVM contract account on the Near blockchain.",
      Action: CopyAction,
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
      Action: CopyAction,
    },
  ]

  if (silo.explorer_url) {
    items.push({
      term: "Explorer",
      description: silo.explorer_url,
      tooltip: "You can trace the activity on your chain here.",
      Action: CopyAction,
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
            description: relayerAccount,
            tooltip:
              "This account is responsible for paying gas on the Near blockchain for your Aurora chain. It will also accumulate the transaction fees collected on your chain.",
            Action: CopyAction,
          },
          {
            term: "Near explorer",
            description: `https://explorer.near.org/accounts/${relayerAccount}`,
            tooltip:
              "You can trace the activity of the relay account in the Near Explorer here.",
            Action: CopyAction,
          },
        ]}
      />

      <ConfigurationItemsCard
        title="Token & gas"
        description="The base token and gas mechanism of your virtual chain."
        items={[
          {
            term: "Base token",
            description: silo.base_token_symbol,
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

      <EditPermissions />

      <div>
        <Contact text="Need help configuring your chain?" className="!mt-12" />
      </div>
    </DashboardPage>
  )
}

export default Page
