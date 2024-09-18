"use client"

import Link from "next/link"
import { useTeamContext } from "@/contexts/TeamContext"
import Step from "@/app/dashboard_v2/[teamKey]/create_chain/Step"
import ChainTypeBox from "@/app/dashboard_v2/[teamKey]/create_chain/ChainTypeBox"
import ChainPermissionBox from "@/app/dashboard_v2/[teamKey]/create_chain/ChainPermissionBox"
import SelectableBox from "@/app/dashboard_v2/[teamKey]/create_chain/SelectableBox"
import GasMechanicsBox from "@/app/dashboard_v2/[teamKey]/create_chain/GasMechanicsBox"
import IntegrationBox from "@/app/dashboard_v2/[teamKey]/create_chain/IntegrationBox"
import { Button } from "@/components/Button"
import {
  ChainPermission,
  GasMechanics,
  Integration,
  NetworkType,
  TokenOption,
  tokenOptions,
  useChainCreationForm,
} from "./useChainCreationForm"

const CreateChainPage = () => {
  const { team } = useTeamContext()
  const { form, updateForm, handleDeselectAllIntegrations } =
    useChainCreationForm()

  const handleNetworkTypeSelect = (type: NetworkType) => {
    updateForm("networkType", type)

    if (type === "devnet") {
      updateForm("chainPermission", "public_permissioned")
      updateForm("baseToken", "eth")
      updateForm("gasMechanics", "free")
      updateForm("integrations", [
        "onramp",
        "oracle",
        "bridge_widget",
        "cex_withdrawals_widget",
      ])
    }
  }

  const handleChainPermissionSelect = (permission: ChainPermission) => {
    updateForm("chainPermission", permission)
  }

  const handleBaseTokenSelect = (token: TokenOption) => {
    updateForm("baseToken", token.id)
  }

  const isDevnet = form.networkType === "devnet"

  const handleGasMechanicsSelect = (mechanic: GasMechanics) => {
    updateForm("gasMechanics", mechanic)
  }

  const integrationOptions: Integration[] = [
    "onramp",
    "oracle",
    "bridge_widget",
    "cex_withdrawals_widget",
  ]

  const handleIntegrationToggle = (integration: Integration) => {
    updateForm(
      "integrations",
      form.integrations.includes(integration)
        ? form.integrations.filter((i) => i !== integration)
        : [...form.integrations, integration],
    )
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-slate-50 flex flex-col">
      <div className="flex justify-between bg-white full-w border-b-2 border-slate-200 p-6">
        <div />
        <span>Set up your Aurora Chain</span>
        <Link href={`/dashboard_v2/${team.team_key}`}>
          <span>+</span>
        </Link>
      </div>
      <div className="flex mt-10 justify-center w-full h-full overflow-x-hidden overflow-y-auto">
        <div className="w-full max-w-[980px] h-full">
          <div className="relative">
            <Step
              number={1}
              title="Select a network type"
              description="Your network grade determines the level of support, scalability, and features available to your developer team and ecosystem."
            >
              <div className="flex w-full justify-around space-x-4">
                <ChainTypeBox
                  title="Devnet"
                  description="Get access to a shared Aurora Chain that is an exact replica of the production chain."
                  type="free"
                  onClick={() => handleNetworkTypeSelect("devnet")}
                  selected={form.networkType === "devnet"}
                />
                <ChainTypeBox
                  title="Mainnet"
                  description="A production ready Aurora Chain with all the functionalities to start building dapps."
                  type="enterprise"
                  onClick={() => handleNetworkTypeSelect("mainnet")}
                  selected={form.networkType === "mainnet"}
                />
              </div>
            </Step>
            {form.networkType && (
              <>
                <Step
                  number={2}
                  title="Select your chain permissions"
                  description="Aurora Cloud lets you choose the level of permission of your chains. Regulated businesses might prefer a permissioned chain as this enables them to gate them by KYC, ensuring compliance with their local regulations."
                >
                  <div className="flex flex-row w-full space-x-4">
                    <ChainPermissionBox
                      permission="public"
                      onClick={() => handleChainPermissionSelect("public")}
                      selected={form.chainPermission === "public"}
                      disabled={isDevnet}
                    />
                    <ChainPermissionBox
                      permission="public_permissioned"
                      onClick={() =>
                        handleChainPermissionSelect("public_permissioned")
                      }
                      selected={form.chainPermission === "public_permissioned"}
                      isDevnet={isDevnet}
                    />
                    <ChainPermissionBox
                      permission="private"
                      onClick={() => handleChainPermissionSelect("private")}
                      selected={form.chainPermission === "private"}
                      disabled={isDevnet}
                    />
                  </div>
                </Step>
                {form.chainPermission && (
                  <Step
                    frozen={isDevnet}
                    number={3}
                    title="Select the base token of your chain"
                    description="The base token of your chain will be used to pay for transaction fees on your chain. It supports any ERC-20 or NEP-141 token, including your own custom token."
                  >
                    <div className="grid grid-cols-6 gap-4">
                      {tokenOptions.map((token) => (
                        <SelectableBox
                          key={token.id}
                          selected={form.baseToken === token.id}
                          onClick={() => handleBaseTokenSelect(token)}
                          className="p-2 pt-3"
                        >
                          <div className="flex flex-col items-center space-y-2">
                            <token.icon className="w-10 h-10" />
                            <span className="uppercase text-base font-bold leading-5 tracking-[1px]">
                              {token.name}
                            </span>
                          </div>
                        </SelectableBox>
                      ))}
                    </div>
                  </Step>
                )}
                {form.baseToken && (
                  <Step
                    frozen={isDevnet}
                    number={4}
                    title="Define the gas mechanics"
                    description="Aurora Cloud lets you define your chain's gas mechanics, including the option to remove gas fees entirely for your customers."
                  >
                    <div className="flex flex-row space-x-4">
                      <GasMechanicsBox
                        mechanic="usage"
                        onClick={() => handleGasMechanicsSelect("usage")}
                        selected={form.gasMechanics === "usage"}
                      />
                      <GasMechanicsBox
                        mechanic="free"
                        onClick={() => handleGasMechanicsSelect("free")}
                        selected={form.gasMechanics === "free"}
                      />
                      <GasMechanicsBox
                        mechanic="custom"
                        onClick={() => handleGasMechanicsSelect("custom")}
                        selected={form.gasMechanics === "custom"}
                      />
                    </div>
                  </Step>
                )}
                {form.gasMechanics && (
                  <>
                    <Step
                      frozen={isDevnet}
                      number={5}
                      title="Integrations"
                      description="These integrations are available from day 1 on your chain."
                      actionButton={
                        form.integrations.length > 0 ? (
                          <Button
                            type="button"
                            variant="border"
                            className="text-sm"
                            onClick={handleDeselectAllIntegrations}
                          >
                            Deselect All
                          </Button>
                        ) : null
                      }
                    >
                      <div className="flex flex-col space-y-4">
                        {integrationOptions.map((integration) => (
                          <IntegrationBox
                            key={integration}
                            integration={integration}
                            isEnabled={form.integrations.includes(integration)}
                            onToggle={() =>
                              handleIntegrationToggle(integration)
                            }
                          />
                        ))}
                      </div>
                    </Step>
                    <Step
                      number={6}
                      title="Name your chain"
                      description="Unique identifiers will primarily be relevant for internal use to ensure distinction between your chain deployments."
                    >
                      f
                    </Step>
                  </>
                )}
              </>
            )}
            <div className="absolute top-[calc(2rem+10px)] left-4 w-[2px] h-[calc(100%-2rem-10px)] bg-slate-200" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateChainPage
