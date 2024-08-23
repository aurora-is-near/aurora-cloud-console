"use client"

import { useMutation } from "@tanstack/react-query"
import clsx from "clsx"
import { ChangeEvent, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { Button } from "@/components/Button"
import Card from "@/components/Card"
import { Input } from "@/components/Input"
import { RadioInput } from "@/components/RadioInput"
import { SelectInput, SelectInputOption } from "@/components/SelectInput"
import { useBridgeTokens } from "@/hooks/useBridgeTokens"
import { useOptimisticUpdater } from "@/hooks/useOptimisticUpdater"
import { apiClient } from "@/utils/api/client"
import { logger } from "@/logger"

type BridgeTokensCardProps = {
  siloId: number
}

const EXISTING_TOKEN_TYPE = "existing-token"
const CUSTOM_TOKEN_TYPE = "custom-token"

type TokenType = typeof EXISTING_TOKEN_TYPE | typeof CUSTOM_TOKEN_TYPE

type Inputs = Partial<{
  "select-token-type": TokenType
  "existing-token-symbol": SelectInputOption
  "existing-token-address": string
  "custom-token-symbol": string
  "custom-token-address": string
}>

export const BridgeTokensCard = ({ siloId }: BridgeTokensCardProps) => {
  const { undeployedTokens } = useBridgeTokens(siloId)
  const getSiloTokensUpdater = useOptimisticUpdater("getSiloTokens")

  const { mutate: bridgeSiloToken, isPending: isBridgeSiloTokenPending } =
    useMutation({
      mutationFn: apiClient.bridgeSiloToken,
      onSettled: getSiloTokensUpdater.invalidate,
      onSuccess: () => {
        toast.success("Token deployment requested")
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
    const selectedToken = undeployedTokens.find(
      (token) => token.id === Number(option.value),
    )

    if (!selectedToken) {
      return
    }

    setSelectedExistingToken(option)
    methods.setValue("existing-token-address", selectedToken.address)
  }

  const onRequestExistingTokenDeploymentClick = async () => {
    if (!selectedExistingToken) {
      return
    }

    bridgeSiloToken({
      id: siloId,
      tokenId: Number(selectedExistingToken.value),
    })
  }

  const onRequestCustomTokenDeploymentClick = async () => {
    if (!customTokenSymbol || !customTokenAddress) {
      return
    }

    bridgeSiloToken({
      id: siloId,
      symbol: customTokenSymbol,
      address: customTokenAddress,
    })
  }

  return (
    <Card tag="section">
      <Card.Title>Deploy token contracts</Card.Title>
      <Card.Subtitle>
        In order to be bridged, the token must be deployed on your Aurora Chain.
      </Card.Subtitle>
      <Card.Row>
        <FormProvider {...methods}>
          <div className="grid grid-cols-3 gap-2">
            <RadioInput
              id="select-existing-token"
              name="select-token-type"
              label="Deploy an existing token"
              value={EXISTING_TOKEN_TYPE}
              register={register}
              registerOptions={{
                onChange: onSelectedTokenTypeChange,
              }}
            />
            <div
              className={clsx(
                "col-span-2 flex flex-row space-x-2",
                selectedTokenType !== EXISTING_TOKEN_TYPE && "invisible",
              )}
            >
              <div className="min-w-[150px] w-[150px]">
                <SelectInput
                  id="existing-token-symbol"
                  name="existing-token-symbol"
                  register={register}
                  options={undeployedTokens.map((token) => ({
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
              <Button
                disabled={!selectedExistingToken || isBridgeSiloTokenPending}
                className="h-full"
                onClick={onRequestExistingTokenDeploymentClick}
              >
                Request deployment
              </Button>
            </div>
            <RadioInput
              id="select-custom-token"
              name="select-token-type"
              label="Or add a custom token"
              value={CUSTOM_TOKEN_TYPE}
              register={register}
              registerOptions={{
                onChange: onSelectedTokenTypeChange,
              }}
            />
            <div
              className={clsx(
                "col-span-2 flex flex-row space-x-2",
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
                    setCustomTokenAddress(
                      (evt.target as HTMLInputElement).value,
                    )
                  },
                }}
              />
              <Button
                className="h-full"
                onClick={onRequestCustomTokenDeploymentClick}
                disabled={
                  !customTokenSymbol ||
                  !customTokenAddress ||
                  isBridgeSiloTokenPending
                }
              >
                Request deployment
              </Button>
            </div>
          </div>
        </FormProvider>
      </Card.Row>
    </Card>
  )
}
