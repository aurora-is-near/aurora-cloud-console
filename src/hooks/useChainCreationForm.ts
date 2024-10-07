import { ComponentType, useCallback, useState } from "react"
import { Team } from "@/types/types"
import { saveOnboardingForm } from "@/actions/onboarding/save-onboarding-form"
import { createSilo } from "@/actions/silos/create-silo"
import { getTeamSilo } from "@/actions/team-silos/get-team-silo"
import {
  AuroraToken,
  Bitcoin,
  CustomToken,
  EtherToken,
  USDCToken,
  USDTToken,
} from "../../public/static/v2/images/icons"

export type NetworkType = "devnet" | "mainnet"
export type ChainPermission = "public" | "public_permissioned" | "private"
export type BaseToken = string
export type GasMechanics = "usage" | "free" | "custom"
export type Integration =
  | "onramp"
  | "oracle"
  | "bridge_widget"
  | "cex_withdrawals_widget"

export const integrationOptions: Integration[] = [
  "onramp",
  "oracle",
  "bridge_widget",
  "cex_withdrawals_widget",
]

export interface TokenOption {
  id: string
  name: string
  icon: ComponentType<React.SVGProps<SVGSVGElement>>
}

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
    const integrationsString = form.integrations.join(",")

    const record = await saveOnboardingForm({
      ...form,
      integrations: integrationsString,
      team_id: team.id,
    })

    if (form.networkType === "devnet") {
      // Devnet silo. We copy details from it to the new team's devnet silo
      const silo = await getTeamSilo(1, Number(1))

      if (silo) {
        const {
          id: _id,
          updated_at: _updated_at,
          created_at: _created_at,
          ...siloWithoutIdAndUpdatedAt
        } = silo

        const newDevnetSilo = {
          ...siloWithoutIdAndUpdatedAt,
          ...{ team_id: team.id, name: form.chainName },
        }

        await createSilo(newDevnetSilo)
      }
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
