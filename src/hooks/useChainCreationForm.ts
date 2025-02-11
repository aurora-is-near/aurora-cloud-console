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
import { DEVNET_CHAIN_ID } from "@/constants/devnet"
import { notReachable } from "@/utils/notReachable"
import { getSiloByChainId } from "@/actions/silos/get-silo-by-chain-id"
import { addTeamsToSilo } from "@/actions/silos/add-teams-to-silo"
import { useAnalytics } from "@/hooks/useAnalytics"
import {
  AuroraToken,
  Bitcoin,
  CustomToken,
  EtherToken,
  USDCToken,
  USDTToken,
} from "../../public/static/v2/images/icons"

export const integrationOptions: Integration[] = [
  "block_explorer",
  "bridge_widget",
  "onramp",
  "cex_withdrawals_widget",
  "oracle",
  "intense_support",
  "dex",
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
  customTokenDetails: string
  telegramHandle: string
}

const initialFormDevNet: ChainCreationForm = {
  networkType: "mainnet",
  chainPermission: "public",
  baseToken: null,
  gasMechanics: null,
  integrations: [],
  chainName: "",
  chainId: "",
  comments: "",
  customTokenDetails: "",
  telegramHandle: "",
}

const initialFormMainNet: ChainCreationForm = {
  networkType: "mainnet",
  chainPermission: "public",
  baseToken: null,
  gasMechanics: null,
  integrations: [],
  chainName: "",
  chainId: "",
  comments: "",
  customTokenDetails: "",
  telegramHandle: "",
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
  const mixPanel = useAnalytics()
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

    if (value) {
      setFieldErrors((p) => ({ ...p, [field]: undefined }))
    }
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
    }

    if (!form.baseToken) {
      setFieldErrors((p) => ({
        ...p,
        ...fieldErrors,
        baseToken: "Please select a base token",
      }))
    }

    if (!form.gasMechanics) {
      setFieldErrors((p) => ({
        ...p,
        ...fieldErrors,
        gasMechanics: "Please select a gas mechanics",
      }))
    }

    if (fieldErrors && Object.values(fieldErrors).find((v) => !!v)) {
      return
    }

    mixPanel?.track("onboarding_completed", {
      team_id: team.id,
      ...form,
    })

    await saveOnboardingForm({
      ...form,
      team_id: team.id,
    })

    // Note that an upsert is used here in case the user somehow submits the
    // form twice. For example, if they opened it in two browser tabs.
    if (form.networkType === "devnet") {
      const devnetSilo = await getSiloByChainId(DEVNET_CHAIN_ID)

      if (!devnetSilo) {
        throw new Error("Devnet silo not found")
      }

      await addTeamsToSilo(devnetSilo.id, [team.id])

      // Redirect to the silo dashboard page
      window.location.href = `${window.location.origin}/dashboard/${team.team_key}/silos/${devnetSilo.id}`

      return
    }

    // for mainnet
    window.location.href = `${window.location.origin}/dashboard/${team.team_key}`
  }, [form, fieldErrors, mixPanel, team.id, team.team_key])

  return {
    form,
    fieldErrors,
    clearErrors,
    updateForm,
    handleIntegrationToggle,
    handleDeselectAllIntegrations,
    handleSubmit,
  }
}
