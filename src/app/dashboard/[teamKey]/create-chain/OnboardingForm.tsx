"use client"

import clsx from "clsx"
import { useState } from "react"
import toast from "react-hot-toast"
import {
  FormTokenNotFoundError,
  integrationOptions,
  tokenOptions,
  useChainCreationForm,
} from "@/hooks/useChainCreationForm"
import SelectableBox from "@/components/onboarding/SelectableBox"
import { Button } from "@/components/Button"
import Card from "@/components/Card"
import { Team } from "@/types/types"
import {
  ChainPermission,
  GasMechanics,
  NetworkType,
  TokenOption,
} from "@/types/chain-creation"
import { BaseContainer } from "@/components/BaseContainer"
import { logger } from "@/logger"
import Step from "./Step"
import ChainTypeBox from "./ChainTypeBox"
import ChainPermissionBox from "./ChainPermissionBox"
import GasMechanicsBox from "./GasMechanicsBox"
import IntegrationBox from "./IntegrationBox"

type OnboardingFormProps = {
  team: Team
  hasDevNet: boolean
}

const OnboardingForm = ({ team, hasDevNet }: OnboardingFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    form,
    fieldErrors,
    clearErrors,
    updateForm,
    handleIntegrationToggle,
    handleDeselectAllIntegrations,
    handleSubmit,
    submitButtonText,
  } = useChainCreationForm(team)

  const isDevnet = form.networkType === "devnet"

  const handleNetworkTypeSelect = (type: NetworkType) => {
    updateForm("networkType", type)

    if (type === "devnet") {
      updateForm("chainName", "Devnet")
      updateForm("chainPermission", "public_permissioned")
      updateForm("baseToken", "aurora")
      updateForm("gasMechanics", "free")
    } else {
      updateForm("chainPermission", null)
      updateForm("baseToken", null)
      updateForm("gasMechanics", null)
    }
  }

  const handleChainPermissionSelect = (permission: ChainPermission) => {
    updateForm("chainPermission", permission)
  }

  const handleBaseTokenSelect = (token: TokenOption) => {
    updateForm("baseToken", token.id)
  }

  const handleGasMechanicsSelect = (mechanic: GasMechanics) => {
    updateForm("gasMechanics", mechanic)
  }

  const handleOnboardingSubmit = async () => {
    setIsSubmitting(true)

    try {
      await handleSubmit()
    } catch (error: unknown) {
      logger.error(error)

      if (error instanceof FormTokenNotFoundError) {
        toast.error("Something went wrong. Please try again.")

        return
      }

      toast.error("Something went wrong. Please try again.")

      return
    }

    setIsSubmitting(false)
  }

  return (
    <div className="overflow-x-hidden overflow-y-auto">
      <BaseContainer className="h-full md:mt-10">
        <div className="relative flex flex-col gap-8">
          <Step
            number={1}
            title="Select a network type"
            description="Your network grade determines the level of support, scalability, and features available to your developer team and ecosystem."
          >
            <div className="grid md:grid-cols-2 w-full gap-4">
              <ChainTypeBox
                disabled={hasDevNet}
                title="Devnet"
                description="Get access to a shared Aurora Chain that is an exact replica of the production chain."
                type="devnet"
                onClick={() => handleNetworkTypeSelect("devnet")}
                selected={form.networkType === "devnet"}
              />
              <ChainTypeBox
                title="Mainnet"
                description="A production ready Aurora Chain with all the functionalities to start building dapps."
                type="mainnet"
                onClick={() => handleNetworkTypeSelect("mainnet")}
                selected={form.networkType === "mainnet"}
              />
            </div>
          </Step>
          <Step
            number={2}
            title="Select your chain permissions"
            description="Aurora Cloud lets you choose the level of permission of your chains. Regulated businesses might prefer a permissioned chain as this enables them to gate them by KYC, ensuring compliance with their local regulations."
          >
            <div className="grid md:grid-cols-3 w-full gap-4">
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
          <Step
            number={3}
            title="Select the base token of your chain"
            description="The base token of your chain will be used to pay for transaction fees on your chain. It supports any ERC-20 or NEP-141 token, including your own custom token."
          >
            <div className="grid sm:grid-cols-3 md:grid-cols-6 gap-4">
              {tokenOptions.map((token) => (
                <SelectableBox
                  key={token.id}
                  selected={form.baseToken === token.id}
                  onClick={() => handleBaseTokenSelect(token)}
                  className="p-2 pt-3"
                  disabled={isDevnet && token.id !== "aurora"}
                >
                  <div className="flex flex-col items-center space-y-2 w-full">
                    <token.icon className="w-10 h-10" />
                    <span className="uppercase text-base font-bold leading-5 tracking-[1px]">
                      {token.name}
                    </span>
                  </div>
                </SelectableBox>
              ))}
            </div>
          </Step>
          <Step
            number={4}
            title="Define the gas mechanics"
            description="Aurora Cloud lets you define your chain's gas mechanics, including the option to remove gas fees entirely for your customers."
          >
            <div className="grid md:grid-cols-3 gap-4">
              <GasMechanicsBox
                mechanic="usage"
                onClick={() => handleGasMechanicsSelect("usage")}
                selected={form.gasMechanics === "usage"}
                disabled={isDevnet}
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
                disabled={isDevnet}
              />
            </div>
          </Step>
          <Step
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
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {integrationOptions.map((integration) => (
                <IntegrationBox
                  key={integration}
                  integration={integration}
                  isEnabled={form.integrations.includes(integration)}
                  onToggle={() => handleIntegrationToggle(integration)}
                />
              ))}
            </div>
          </Step>
          {!isDevnet ? (
            <Step
              number={6}
              title="Name your chain"
              description="Unique identifiers will primarily be relevant for internal use to ensure distinction between your chain deployments."
              hasError={!!fieldErrors?.chainName}
            >
              <div className="grid grid-cols-1 space-y-4">
                <Card className="p-6">
                  <label
                    htmlFor="chainName"
                    className="block font-medium text-md"
                  >
                    Desired chain name *
                  </label>
                  <p className="text-sm text-slate-500">
                    Choose the name for your chain on the Aurora Cloud platform.
                  </p>
                  <input
                    type="text"
                    id="chainName"
                    value={form.chainName}
                    onChange={(e) => {
                      clearErrors()
                      updateForm("chainName", e.target.value)
                    }}
                    className={clsx(
                      "w-full mt-2 p-2 border rounded",
                      fieldErrors?.chainName
                        ? "border-rose-300 bg-rose-50"
                        : "border-slate-300",
                    )}
                  />
                  {fieldErrors?.chainName ? (
                    <p className="mt-2 text-sm text-rose-600">
                      {fieldErrors.chainName}
                    </p>
                  ) : null}
                </Card>
                <Card className="p-6">
                  <label
                    htmlFor="comments"
                    className="block font-medium text-md"
                  >
                    Tell us more about your needs
                  </label>
                  <p className="text-sm text-slate-500">
                    Provide any relevant information related to your request
                    that will help us better prepare for our call.
                  </p>
                  <textarea
                    id="comments"
                    value={form.comments}
                    onChange={(e) => updateForm("comments", e.target.value)}
                    className="w-full mt-2 p-2 border border-slate-300 rounded"
                    rows={4}
                  />
                </Card>
              </div>
            </Step>
          ) : null}

          <div className="pl-14 mb-16">
            <Button
              fullWidth
              size="xl"
              loading={isSubmitting}
              onClick={handleOnboardingSubmit}
            >
              {submitButtonText}
            </Button>
          </div>
          <div className="absolute top-[calc(2rem+10px)] left-[19px] w-[2px] h-[calc(100%-2rem-10px)] bg-slate-200" />
        </div>
      </BaseContainer>
    </div>
  )
}

export default OnboardingForm
