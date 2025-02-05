"use client"

import clsx from "clsx"
import Link from "next/link"
import { useState } from "react"
import toast from "react-hot-toast"
import { CheckBadgeIcon } from "@heroicons/react/20/solid"

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
  TokenOption,
} from "@/types/chain-creation"
import { BaseContainer } from "@/components/BaseContainer"
import { logger } from "@/logger"
import { Typography } from "@/uikit"

import Step from "./Step"
import ChainPermissionBox from "./ChainPermissionBox"
import GasMechanicsBox from "./GasMechanicsBox"
import IntegrationBox from "./IntegrationBox"
import { FeatureItem } from "./FeatureItem"

import IconEthSquare from "../../../../../public/static/icons/eth-square.svg"
import IconNearSquare from "../../../../../public/static/icons/near-square.svg"
import IconNearIntenseSquare from "../../../../../public/static/icons/near-intense-square.svg"

type OnboardingFormProps = {
  team: Team
}

const OnboardingForm = ({ team }: OnboardingFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    form,
    fieldErrors,
    clearErrors,
    updateForm,
    handleIntegrationToggle,
    handleDeselectAllIntegrations,
    handleSubmit,
  } = useChainCreationForm(team, "mainnet")

  const handleChainPermissionSelect = (permission: ChainPermission) => {
    updateForm("chainPermission", permission)
  }

  const handleBaseTokenSelect = (token: TokenOption) => {
    updateForm("baseToken", token.id)

    if (token.id !== "CUSTOM") {
      updateForm("customTokenDetails", "")
    }
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
      }
    }

    setIsSubmitting(false)
  }

  return (
    <div className="overflow-x-hidden overflow-y-auto">
      <section className="flex justify-center px-6 py-16 bg-white w-full border-b border-slate-200 md:px-16">
        <div className="flex flex-col justify-center items-center gap-8 w-full max-w-[1044px] md:px-5">
          <div className="flex flex-col justify-center items-center gap-3">
            <Typography variant="heading" size={5} className="text-center">
              Set up your Aurora Chain
            </Typography>
            <Typography
              variant="paragraph"
              size={2}
              className="text-center text-slate-500"
            >
              Get a production ready Aurora Chain with all the functionalities
              to start building.
            </Typography>
          </div>

          <div className="grid grid-cols-1 gap-4 w-full sm:grid-cols-2 sm:justify-between sm:items-center lg:sm:grid-cols-4">
            <FeatureItem
              icon={IconNearSquare}
              title="Runs on top of NEAR\n Protocol"
            />
            <FeatureItem
              icon={IconEthSquare}
              title="Full EVM\n compatibility"
            />
            <FeatureItem
              icon={() => <CheckBadgeIcon className="text-green-600 w-8 h-8" />}
              title="220+ validators\n at launch"
            />
            <FeatureItem
              icon={IconNearIntenseSquare}
              title="Support from Near\n Intents (cross chain DEX)"
            />
          </div>
        </div>
      </section>

      <BaseContainer className="h-full md:mt-10">
        <div className="relative flex flex-col gap-8">
          <Step
            number={1}
            title="Select your chain permissions"
            description="Aurora Cloud lets you choose the level of permission of your chains. Regulated businesses might prefer a permissioned chain as this enables them to gate them by KYC, ensuring compliance with their local regulations."
          >
            <div className="grid md:grid-cols-3 w-full gap-4">
              <ChainPermissionBox
                permission="public"
                onClick={() => handleChainPermissionSelect("public")}
                selected={form.chainPermission === "public"}
              />
              <ChainPermissionBox
                disabled
                permission="public_permissioned"
                onClick={() =>
                  handleChainPermissionSelect("public_permissioned")
                }
                selected={form.chainPermission === "public_permissioned"}
              />
              <ChainPermissionBox
                disabled
                permission="private"
                onClick={() => handleChainPermissionSelect("private")}
                selected={form.chainPermission === "private"}
              />
            </div>
          </Step>
          <Step
            number={2}
            title="Select the base token of your chain"
            description="The base token of your chain will be used to pay for transaction fees on your chain. It supports any ERC-20 or NEP-141 token, including your own custom token."
            hasError={!!fieldErrors?.baseToken}
          >
            <div className="grid sm:grid-cols-3 md:grid-cols-6 gap-4">
              {tokenOptions.map((token) => (
                <SelectableBox
                  key={token.id}
                  selected={form.baseToken === token.id}
                  onClick={() => handleBaseTokenSelect(token)}
                  className="p-2 pt-3"
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
            {form.baseToken === "custom" ? (
              <Card className="p-6 mt-6">
                <Typography variant="label" size={2}>
                  Custom base token
                </Typography>
                <Typography
                  variant="paragraph"
                  size={4}
                  className="text-slate-500"
                >
                  A virtual chain can use any token as base token, provided it
                  has been bridged to Near as an NEP-141 token. For more
                  information about bridging, you can refer to{" "}
                  <Link
                    href="https://auroracloud.dev/terms"
                    target="_blank"
                    className="text-green-700 underline"
                  >
                    this resource
                  </Link>{" "}
                  . This step is not mandatory, as our team is available to
                  assist you with the process if needed.
                  <br />
                  <br />
                  Please provide more details about your token, such as contract
                  address, CoinMarketcap/CoinGecko link or any other info if
                  applicable.
                </Typography>

                <input
                  type="text"
                  id="customTokenDetails"
                  value={form.customTokenDetails}
                  onChange={(e) => {
                    updateForm("customTokenDetails", e.target.value)
                  }}
                  className="w-full mt-3 p-2 border rounded"
                />
              </Card>
            ) : null}
          </Step>
          <Step
            number={3}
            title="Define the gas mechanics"
            description="Aurora Cloud lets you define your chain's gas mechanics, including the option to remove gas fees entirely for your customers."
            hasError={!!fieldErrors?.gasMechanics}
          >
            <div className="grid md:grid-cols-3 gap-4">
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
                disabled
                mechanic="custom"
                onClick={() => handleGasMechanicsSelect("custom")}
                selected={form.gasMechanics === "custom"}
              />
            </div>
          </Step>
          <Step
            number={4}
            title="Select integrations"
            description="Select which integrations you'd like on your chain. Our team will then help you configure them for the launch."
            actionButton={
              !!form.integrations.length && (
                <Button
                  type="button"
                  variant="border"
                  className="text-sm"
                  onClick={handleDeselectAllIntegrations}
                >
                  Deselect All
                </Button>
              )
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
          <Step
            number={5}
            title="Additional information"
            description="We need a few more details to get started."
            hasError={!!fieldErrors?.chainName}
          >
            <div className="grid grid-cols-1 space-y-4">
              <Card className="p-6">
                <label
                  htmlFor="chainName"
                  className="block font-medium text-md"
                >
                  Your chain name*
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
                {!!fieldErrors?.chainName && (
                  <p className="mt-2 text-sm text-rose-600">
                    {fieldErrors.chainName}
                  </p>
                )}
              </Card>
              <Card className="p-6">
                <label htmlFor="comments" className="block font-medium text-md">
                  Tell us more about your needs
                </label>
                <p className="text-sm text-slate-500">
                  Provide any relevant information related to your request that
                  will help us better support us.
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

          <div className="flex flex-col items-center gap-4 pl-14 mb-16">
            <Button
              fullWidth
              size="xl"
              loading={isSubmitting}
              onClick={handleOnboardingSubmit}
            >
              Save my chain configuration
            </Button>

            <Typography
              variant="paragraph"
              size={4}
              className="text-slate-500 text-center"
            >
              By clicking this button, you agree to our{" "}
              <Link
                href="https://auroracloud.dev/terms"
                target="_blank"
                className="text-slate-900 underline"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="https://auroracloud.dev/privacy"
                target="_blank"
                className="text-slate-900 underline"
              >
                Privacy Policy
              </Link>
              .
            </Typography>
          </div>
          <div className="absolute top-[calc(2rem+10px)] left-[19px] w-[2px] h-[calc(100%-2rem-10px)] bg-slate-200" />
        </div>
      </BaseContainer>
    </div>
  )
}

export default OnboardingForm
