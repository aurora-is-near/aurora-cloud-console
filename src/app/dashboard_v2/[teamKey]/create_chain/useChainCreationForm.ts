import { useState } from "react"

export type NetworkType = "devnet" | "mainnet"
export type ChainPermission = "public" | "public_permissioned" | "private"
export type BaseToken = string
export type GasMechanics = "standard" | "custom" | "free"

interface ChainCreationForm {
  networkType: NetworkType | null
  chainPermission: ChainPermission | null
  baseToken: BaseToken | null
  gasMechanics: GasMechanics | null
  integrations: string[]
  chainName: string
}

export const useChainCreationForm = () => {
  const [form, setForm] = useState<ChainCreationForm>({
    networkType: null,
    chainPermission: null,
    baseToken: null,
    gasMechanics: null,
    integrations: [],
    chainName: "",
  })

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
