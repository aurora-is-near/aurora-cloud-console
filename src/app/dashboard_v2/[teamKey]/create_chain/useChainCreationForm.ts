import { ComponentType, useState } from "react"
import {
  AuroraToken,
  Bitcoin,
  CustomToken,
  EtherToken,
  USDCToken,
  USDTToken,
} from "../../../../../public/static/v2/images/icons"

export type NetworkType = "devnet" | "mainnet"
export type ChainPermission = "public" | "public_permissioned" | "private"
export type BaseToken = string
export type GasMechanics = "usage" | "free" | "custom"

export interface TokenOption {
  id: string
  name: string
  icon: ComponentType<React.SVGProps<SVGSVGElement>>
}

export const tokenOptions: TokenOption[] = [
  { id: "aurora", name: "Aurora", icon: AuroraToken },
  { id: "usdt", name: "USDT", icon: USDTToken },
  { id: "usdc", name: "USDC", icon: USDCToken },
  { id: "btc", name: "BTC", icon: Bitcoin },
  { id: "eth", name: "ETH", icon: EtherToken },
  { id: "custom", name: "My Token", icon: CustomToken },
]

interface ChainCreationForm {
  networkType: NetworkType | null
  chainPermission: ChainPermission | null
  baseToken: BaseToken | null
  gasMechanics: GasMechanics | null
  integrations: string[]
  chainName: string
}

const initialState: ChainCreationForm = {
  networkType: null,
  chainPermission: null,
  baseToken: null,
  gasMechanics: null,
  integrations: [],
  chainName: "",
}

export const useChainCreationForm = () => {
  const [form, setForm] = useState<ChainCreationForm>(initialState)

  const updateForm = <K extends keyof ChainCreationForm>(
    field: K,
    value: ChainCreationForm[K],
  ) => {
    setForm((prevForm) => ({ ...prevForm, [field]: value }))
  }

  return {
    form,
    updateForm,
  }
}
