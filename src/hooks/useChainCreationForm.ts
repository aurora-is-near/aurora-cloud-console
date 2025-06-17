import { useCallback, useState } from "react"
import { BaseTokenSymbol, OnboardingForm, Team } from "@/types/types"
import { saveOnboardingForm } from "@/actions/onboarding/save-onboarding-form"
import {
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
  NearToken,
  USDCToken,
  USDTToken,
} from "../../public/static/images/icons"

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
  { symbol: "AURORA", name: "Aurora", icon: AuroraToken },
  { symbol: "WNEAR", name: "NEAR", icon: NearToken },
  { symbol: "ETH", name: "ETH", icon: EtherToken },
  { symbol: "USDT", name: "USDT", icon: USDTToken },
  { symbol: "USDC", name: "USDC", icon: USDCToken },
  { symbol: "BTC", name: "BTC", icon: Bitcoin },
  { symbol: "CUSTOM", name: "My token", icon: CustomToken },
]

export interface ChainCreationForm {
  networkType: NetworkType | null
  chainPermission: ChainPermission | null
  baseToken: BaseTokenSymbol | null
  gasMechanics: GasMechanics | null
  integrations: Integration[]
  chainName: string
  comments: string
  customTokenDetails: string
  telegramHandle: string
  phoneNumber: string
}

const initialFormDevNet: ChainCreationForm = {
  networkType: "mainnet",
  chainPermission: "public",
  baseToken: null,
  gasMechanics: null,
  integrations: [],
  chainName: "",
  comments: "",
  customTokenDetails: "",
  telegramHandle: "",
  phoneNumber: "",
}

const getInitialFormMainNet = (
  data: OnboardingForm | null = null,
): ChainCreationForm => ({
  networkType: data?.networkType ?? "mainnet",
  chainPermission: data?.chainPermission ?? "public",
  baseToken: data?.baseToken ?? null,
  gasMechanics: data?.gasMechanics ?? null,
  integrations: data?.integrations ?? ["block_explorer"],
  chainName: data?.chainName ?? "",
  comments: data?.comments ?? "",
  customTokenDetails: data?.customTokenDetails ?? "",
  telegramHandle: data?.telegramHandle ?? "",
  phoneNumber: data?.phoneNumber ?? "",
})

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

type Args = {
  team: Team
  initialData: OnboardingForm | null
  networkTypeSelected: NetworkType
}

export const useChainCreationForm = ({
  team,
  initialData,
  networkTypeSelected,
}: Args) => {
  const mixPanel = useAnalytics()
  const [form, setForm] = useState<ChainCreationForm>(
    (() => {
      switch (networkTypeSelected) {
        case "devnet":
          return initialFormDevNet
        case "mainnet":
          return getInitialFormMainNet(initialData)
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
    let hasErrors = false

    if (!form.chainName) {
      setFieldErrors((p) => ({ ...p, chainName: "Please enter a chain name" }))

      hasErrors = true
    }

    if (!form.baseToken) {
      setFieldErrors((p) => ({
        ...p,
        ...fieldErrors,
        baseToken: "Please select a base token",
      }))

      hasErrors = true
    }

    if (!form.gasMechanics) {
      setFieldErrors((p) => ({
        ...p,
        ...fieldErrors,
        gasMechanics: "Please select a gas mechanics",
      }))

      hasErrors = true
    }

    if (!form.telegramHandle && !form.phoneNumber) {
      setFieldErrors((p) => ({
        ...p,
        ...fieldErrors,
        telegramHandle: "Please provide a telegram handle...",
        phoneNumber: "...or/and a phone number",
      }))

      hasErrors = true
    }

    if (hasErrors) {
      return
    }

    mixPanel?.track("onboarding_completed", {
      team_id: team.id,
      ...form,
    })

    await saveOnboardingForm(team, {
      ...form,
      team_id: team.id,
      baseToken: form.baseToken ?? "AURORA",
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
  }, [form, fieldErrors, mixPanel, team])

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
