"use client"

import { FieldErrors, SubmitHandler } from "react-hook-form"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { HorizontalForm } from "@/components/HorizontalForm"
import { coinGeckoApiClient } from "@/utils/coingecko-api/client"
import { addOracleToken } from "@/actions/oracle/add-oracle-token"

type Inputs = {
  symbol: string
  coinGeckoAlias: string
}

export const TokenForm = () => {
  const pathname = usePathname()
  const [errors, setErrors] = useState<FieldErrors<Inputs>>({})

  const submitHandler: SubmitHandler<Inputs> = async (inputs: Inputs) => {
    setErrors({})
    let coingeckoResponse

    try {
      coingeckoResponse = await coinGeckoApiClient.getCoin(
        inputs.coinGeckoAlias,
      )
    } catch {
      setErrors({
        coinGeckoAlias: {
          type: "validate",
          message: "Invalid CoinGecko alias",
        },
      })

      return
    }

    if (
      coingeckoResponse.symbol.toUpperCase() !== inputs.symbol.toUpperCase()
    ) {
      setErrors({
        symbol: {
          type: "validate",
          message: "Symbol does not match the CoinGecko alias",
        },
      })

      return
    }

    await addOracleToken(inputs)

    window.location.href = pathname.split("/").slice(0, -1).join("/")
  }

  return (
    <HorizontalForm
      submitHandler={submitHandler}
      errors={errors}
      inputs={[
        {
          name: "symbol",
          label: "Symbol",
          required: true,
        },
        {
          name: "coinGeckoAlias",
          label: "CoinGecko alias",
          required: true,
        },
      ]}
    />
  )
}
