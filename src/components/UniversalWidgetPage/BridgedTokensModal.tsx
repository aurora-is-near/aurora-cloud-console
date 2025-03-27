"use client"

import { CheckIcon } from "@heroicons/react/24/outline"
import { FormProvider, useForm } from "react-hook-form"
import { ChangeEvent, useState } from "react"
import { useMutation } from "@tanstack/react-query"
import clsx from "clsx"
import toast from "react-hot-toast"
import { Button } from "@/components/Button"
import SlideOver from "@/components/SlideOver"
import { useModals } from "@/hooks/useModals"
import { SelectInput, SelectInputOption } from "@/components/SelectInput"
import { useBridgedTokens } from "@/hooks/useBridgedTokens"
import { useOptimisticUpdater } from "@/hooks/useOptimisticUpdater"
import { apiClient } from "@/utils/api/client"
import { logger } from "@/logger"
import { Modals } from "@/utils/modals"
import { RadioInput } from "@/components/RadioInput"
import { Input } from "@/components/Input"

type Inputs = Partial<{
  "select-token-type": TokenType
  "existing-token-symbol": SelectInputOption
  "existing-token-address": string
  "custom-token-symbol": string
  "custom-token-address": string
}>

const EXISTING_TOKEN_TYPE = "existing-token"
const CUSTOM_TOKEN_TYPE = "custom-token"

type TokenType = typeof EXISTING_TOKEN_TYPE | typeof CUSTOM_TOKEN_TYPE

type BridgedTokensModalProps = {
  siloId: number
}

export const BridgedTokensModal = ({ siloId }: BridgedTokensModalProps) => {
  const { closeModal, activeModal } = useModals()
  const { supportedTokens } = useBridgedTokens(siloId)
  const getWidgetUpdater = useOptimisticUpdater("getWidget")
  const getSiloBridgedTokensUpdater = useOptimisticUpdater(
    "getSiloBridgedTokens",
  )

  const getSiloBridgedTokenRequestsUpdater = useOptimisticUpdater(
    "getSiloBridgedTokenRequests",
  )

  const { mutate: bridgeSiloToken, isPending: isBridgeSiloTokenPending } =
    useMutation({
      mutationFn: apiClient.bridgeSiloToken,
      onSettled: () => {
        getWidgetUpdater.invalidate()
        getSiloBridgedTokensUpdater.invalidate()
        getSiloBridgedTokenRequestsUpdater.invalidate()
      },
      onSuccess: ({ isDeploymentPending }) => {
        closeModal()
        toast.success(
          isDeploymentPending ? "Token deployment requested" : "Token deployed",
        )
      },
      onError: (error) => {
        logger.error(error)
        toast.error("Request failed")
      },
    })

  const methods = useForm<Inputs>({
    values: {
      "select-token-type": EXISTING_TOKEN_TYPE,
    },
  })

  const { register } = methods
  const [selectedTokenType, setSelectedTokenType] = useState<TokenType | null>(
    EXISTING_TOKEN_TYPE,
  )

  const [selectedExistingToken, setSelectedExistingToken] =
    useState<SelectInputOption | null>(null)

  const [customTokenSymbol, setCustomTokenSymbol] = useState<string | null>(
    null,
  )

  const [customTokenAddress, setCustomTokenAddress] = useState<string | null>(
    null,
  )

  const onSelectedTokenTypeChange = (evt?: ChangeEvent) => {
    setSelectedTokenType((evt?.target as HTMLInputElement).value as TokenType)
  }

  const onExistingTokenSymbolChange = (option: SelectInputOption) => {
    const selectedToken = supportedTokens.find(
      (token) => token.id === Number(option.value),
    )

    if (!selectedToken) {
      return
    }

    setSelectedExistingToken(option)
    methods.setValue(
      "existing-token-address",
      selectedToken.aurora_address ?? "N/A",
    )
  }

  const onRequestExistingTokenDeploymentClick = () => {
    if (!selectedExistingToken) {
      return
    }

    bridgeSiloToken({
      id: siloId,
      tokenId: Number(selectedExistingToken.value),
    })
  }

  const onRequestCustomTokenDeploymentClick = () => {
    if (!customTokenSymbol || !customTokenAddress) {
      return
    }

    bridgeSiloToken({
      id: siloId,
      symbol: customTokenSymbol,
      address: customTokenAddress,
    })
  }

  const onSubmit = async () => {
    if (selectedTokenType === EXISTING_TOKEN_TYPE) {
      onRequestExistingTokenDeploymentClick()
    } else {
      onRequestCustomTokenDeploymentClick()
    }
  }

  return (
    <SlideOver
      title="Deploy token contracts"
      open={activeModal === Modals.BridgedTokens}
      close={closeModal}
    >
      <FormProvider {...methods}>
        <RadioInput
          id="select-existing-token"
          name="select-token-type"
          label="Deploy an existing token"
          className="mb-4"
          value={EXISTING_TOKEN_TYPE}
          register={register}
          registerOptions={{
            onChange: onSelectedTokenTypeChange,
          }}
        />
        <RadioInput
          id="select-custom-token"
          name="select-token-type"
          label="Request a custom token"
          className="mb-6"
          value={CUSTOM_TOKEN_TYPE}
          register={register}
          registerOptions={{
            onChange: onSelectedTokenTypeChange,
          }}
        />
        <div
          className={clsx(
            "space-y-4 mb-6",
            selectedTokenType !== EXISTING_TOKEN_TYPE && "hidden",
          )}
        >
          <div className="min-w-[150px] w-[150px]">
            <SelectInput
              id="existing-token-symbol"
              name="existing-token-symbol"
              register={register}
              options={supportedTokens.map((token) => ({
                label: token.symbol,
                value: token.id,
              }))}
              registerOptions={{
                onChange: onExistingTokenSymbolChange,
              }}
            />
          </div>
          <Input
            id="existing-token-address"
            name="existing-token-address"
            placeholder="Address"
            disabled
            register={register}
          />
        </div>
        <div
          className={clsx(
            "space-y-4",
            selectedTokenType !== CUSTOM_TOKEN_TYPE && "invisible",
          )}
        >
          <Input
            className="min-w-[150px] w-[150px]"
            id="custom-token-symbol"
            name="custom-token-symbol"
            placeholder="Symbol"
            register={register}
            registerOptions={{
              onChange: (evt) => {
                setCustomTokenSymbol((evt.target as HTMLInputElement).value)
              },
            }}
          />
          <Input
            id="custom-token-address"
            name="custom-token-address"
            placeholder="Address"
            register={register}
            registerOptions={{
              onChange: (evt) => {
                setCustomTokenAddress((evt.target as HTMLInputElement).value)
              },
            }}
          />
        </div>
      </FormProvider>
      <SlideOver.Actions>
        <Button variant="secondary" onClick={closeModal}>
          Cancel
        </Button>
        <Button
          loading={isBridgeSiloTokenPending}
          onClick={methods.handleSubmit(onSubmit)}
        >
          <CheckIcon className="w-5 h-5" />
          {selectedTokenType === EXISTING_TOKEN_TYPE
            ? "Deploy"
            : "Request deployment"}
        </Button>
      </SlideOver.Actions>
    </SlideOver>
  )
}
