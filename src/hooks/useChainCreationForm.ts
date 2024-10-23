import { useCallback, useState } from "react"
import { Team } from "@/types/types"
import { saveOnboardingForm } from "@/actions/onboarding/save-onboarding-form"
import {
  BaseToken,
  ChainPermission,
  GasMechanics,
  Integration,
  NetworkType,
  TokenOption,
} from "@/types/chain-creation"
import { createSilo } from "@/actions/silos/create-silo"
import {
  DEVNET_CHAIN_ID,
  DEVNET_ENGINE_ACCOUNT,
  DEVNET_EXPLORER_URL,
  DEVNET_GENESIS,
  DEVNET_RPC_URL,
} from "@/constants/devnet"
import { getTokens } from "@/actions/tokens/get-tokens"
import {
  AuroraToken,
  Bitcoin,
  CustomToken,
  EtherToken,
  USDCToken,
  USDTToken,
} from "../../public/static/v2/images/icons"

export const integrationOptions: Integration[] = [
  "onramp",
  "oracle",
  "bridge_widget",
  "cex_withdrawals_widget",
]

export const tokenOptions: TokenOption[] = [
  { id: "aurora", name: "Aurora", icon: AuroraToken },
  { id: "eth", name: "ETH", icon: EtherToken },
  { id: "usdt", name: "USDT", icon: USDTToken },
  { id: "usdc", name: "USDC", icon: USDCToken },
  { id: "btc", name: "BTC", icon: Bitcoin },
  { id: "custom", name: "My Token", icon: CustomToken },
]

interface ChainCreationForm {
  networkType: NetworkType | null
  chainPermission: ChainPermission | null
  baseToken: BaseToken | null
  gasMechanics: GasMechanics | null
  integrations: Integration[]
  chainName: string
  chainId: string
  comments: string
}

const initialForm: ChainCreationForm = {
  networkType: null,
  chainPermission: null,
  baseToken: null,
  gasMechanics: null,
  integrations: [],
  chainName: "",
  chainId: "",
  comments: "",
}

export const useChainCreationForm = (team: Team) => {
  const [form, setForm] = useState<ChainCreationForm>(initialForm)

  const updateForm = <K extends keyof ChainCreationForm>(
    field: K,
    value: ChainCreationForm[K],
  ) => {
    setForm((prevForm) => ({ ...prevForm, [field]: value }))
  }

  const handleIntegrationToggle = useCallback((integration: Integration) => {
    setForm((prevForm) => ({
      ...prevForm,
      integrations: prevForm.integrations.includes(integration)
        ? prevForm.integrations.filter((i) => i !== integration)
        : [...prevForm.integrations, integration],
    }))
  }, [])

  const handleDeselectAllIntegrations = useCallback(() => {
    setForm((prevForm) => ({
      ...prevForm,
      integrations: [],
    }))
  }, [])

  const handleSubmit = useCallback(async () => {
    await saveOnboardingForm({
      ...form,
      team_id: team.id,
    })

    const tokens = await getTokens()
    const token = tokens.find((t) => t.symbol === "AURORA")

    if (!token) {
      throw new Error("Aurora token not found")
    }

    if (form.networkType === "devnet") {
      const silo = await createSilo({
        explorer_url: DEVNET_EXPLORER_URL,
        name: form.chainName,
        genesis: DEVNET_GENESIS,
        network: "public_permissioned",
        team_id: team.id,
        chain_id: DEVNET_CHAIN_ID,
        base_token_id: token.id,
        engine_account: DEVNET_ENGINE_ACCOUNT,
        engine_version: "3.6.4",
        grafana_network_key: null,
        rpc_url: DEVNET_RPC_URL,
      })

      // Redirect to the silo dashboard page
      window.location.href = `${window.location.origin}/dashboard/${team.team_key}/silos/${silo.id}`

      return
    }

    if (form.networkType === "mainnet") {
      // TODO Booking a call for mainnet setup
    }
  }, [form, team])

  const submitButtonText =
    form.networkType === "mainnet"
      ? "Book a call with the Aurora team"
      : "Deploy now"

  return {
    form,
    updateForm,
    handleIntegrationToggle,
    handleDeselectAllIntegrations,
    handleSubmit,
    submitButtonText,
  }
}
