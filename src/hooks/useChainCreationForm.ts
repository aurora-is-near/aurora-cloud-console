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
    const record = await saveOnboardingForm({
      ...form,
      team_id: team.id,
    })

    if (form.networkType === "devnet") {
      // TODO Create devnet silo
    } else if (form.networkType === "mainnet") {
      // TODO Booking a call for mainnet setup
    }

    return record
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
