"use client"

import BridgeNetworkModal from "@/app/dashboard/[teamKey]/silos/[id]/bridge/BridgeNetworkModal"
import { Button } from "@/components/Button"
import Card from "@/components/Card"
import { Input } from "@/components/Input"
import { RadioInput } from "@/components/RadioInput"
import { SelectInput, SelectInputOption } from "@/components/SelectInput"
import clsx from "clsx"
import { ChangeEvent, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"

type BridgeTokensCardProps = {
  siloId: number
}

const EXISTING_TOKEN_TYPE = "existing-token"
const CUSTOM_TOKEN_TYPE = "custom-token"

type TokenType = typeof EXISTING_TOKEN_TYPE | typeof CUSTOM_TOKEN_TYPE

type Inputs = {
  "select-token-type": TokenType
  "existing-token-symbol": SelectInputOption
  "existing-token-address": string
  "custom-token-symbol": string
  "custom-token-address": string
}

export const BridgeTokensCard = ({ siloId }: BridgeTokensCardProps) => {
  const methods = useForm<Inputs>({
    values: {
      "select-token-type": EXISTING_TOKEN_TYPE,
      "existing-token-symbol": {
        label: "NEAR",
        value: "near",
      },
      "existing-token-address": "",
      "custom-token-symbol": "",
      "custom-token-address": "",
    },
  })

  const { register, formState } = methods
  const [selectedTokenType, setSelectedTokenType] = useState<TokenType | null>(
    EXISTING_TOKEN_TYPE,
  )

  const onSelectedTokenTypeChange = (evt?: ChangeEvent) => {
    console.log(evt)
    setSelectedTokenType((evt?.target as HTMLInputElement).value as TokenType)
  }

  return (
    <>
      <Card tag="section">
        <Card.Title>Deploy token contracts</Card.Title>
        <Card.Subtitle>
          In order to be bridged, the token must be deployed on your Aurora
          Chain.
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
                    options={[
                      {
                        label: "NEAR",
                        value: "near",
                      },
                    ]}
                  />
                </div>
                <Input
                  id="existing-token-address"
                  name="existing-token-address"
                  placeholder="Address"
                  disabled
                  register={register}
                />
                <Button className="h-full">Request deployment</Button>
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
                />
                <Input
                  id="custom-token-address"
                  name="custom-token-address"
                  placeholder="Address"
                  register={register}
                />
                <Button className="h-full">Request deployment</Button>
              </div>
            </div>
          </FormProvider>
        </Card.Row>
      </Card>
      <BridgeNetworkModal siloId={siloId} type="from" />
      <BridgeNetworkModal siloId={siloId} type="to" />
    </>
  )
}
