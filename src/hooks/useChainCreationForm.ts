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
import {
  DEVNET_CHAIN_ID,
  DEVNET_ENGINE_ACCOUNT,
  DEVNET_EXPLORER_URL,
  DEVNET_GENESIS,
  DEVNET_RPC_URL,
} from "@/constants/devnet"
import { notReachable } from "@/utils/notReachable"
import { getTokens } from "@/actions/tokens/get-tokens"
import { upsertSilo } from "@/actions/silos/upsert-silo"
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

const initialFormDevNet: ChainCreationForm = {
  networkType: "devnet",
  chainPermission: "public_permissioned",
  baseToken: "aurora",
  gasMechanics: "free",
  integrations: [],
  chainName: "",
  chainId: "",
  comments: "",
}

const initialFormMainNet: ChainCreationForm = {
  networkType: "mainnet",
  chainPermission: null,
  baseToken: null,
  gasMechanics: null,
  integrations: [],
  chainName: "",
  chainId: "",
  comments: "",
}

type ErrorName =
  | "UNKNOWN_VALIDATION_ERROR"
  | "TOKEN_NOT_FOUND"
  | "CHAIN_NAME_NOT_SET"

class FormValidationError extends Error {
  name: ErrorName

  cause: unknown = null

  constructor(name: ErrorName, message: string, options?: ErrorOptions) {
    super(message)
    this.name = name
    this.cause = options?.cause ?? null
  }
}

export class FormTokenNotFoundError extends FormValidationError {
  constructor(options?: ErrorOptions) {
    super("TOKEN_NOT_FOUND", "Aurora token not found", options)
  }
}

export const useChainCreationForm = (
  team: Team,
  networkTypeSelected: NetworkType,
) => {
  const [form, setForm] = useState<ChainCreationForm>(
    (() => {
      switch (networkTypeSelected) {
        case "devnet":
          return initialFormDevNet
        case "mainnet":
          return initialFormMainNet
        default:
          return notReachable(networkTypeSelected)
      }
    })(),
  )

  const [fieldErrors, setFieldErrors] =
    useState<{ [key in keyof Partial<ChainCreationForm>]: string }>()

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

  const clearErrors = useCallback(() => {
    setFieldErrors(undefined)
  }, [])

  const handleSubmit = useCallback(async () => {
    if (!form.chainName) {
      setFieldErrors((p) => ({ ...p, chainName: "Please enter a chain name" }))

      return
    }

    await saveOnboardingForm({
      ...form,
      team_id: team.id,
    })

    const tokens = await getTokens()
    const token = tokens.find((t) => t.symbol === "AURORA")

    if (!token) {
      throw new FormTokenNotFoundError()
    }

    // Note that an upsert is used here in case the user somehow submits the
    // form twice. For example, if they opened it in two browser tabs.
    if (form.networkType === "devnet") {
      const silo = await upsertSilo({
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
        blockscout_database_id: null,
        gas_collection_address: null,
      })

      // Redirect to the silo dashboard page
      window.location.href = `${window.location.origin}/dashboard/${team.team_key}/silos/${silo.id}`

      return
    }

    // For mainnet, redirect to the book a call page
    window.location.href = `${window.location.origin}/dashboard/${team.team_key}/create-chain/book-a-call`
  }, [form, team])

  const submitButtonText =
    form.networkType === "mainnet"
      ? "Save my results and book a call"
      : "Deploy now"

  return {
    form,
    fieldErrors,
    clearErrors,
    updateForm,
    handleIntegrationToggle,
    handleDeselectAllIntegrations,
    handleSubmit,
    submitButtonText,
  }
}
