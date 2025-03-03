"use client"

import { z } from "zod"
import { useEffect } from "react"
import toast from "react-hot-toast"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type { SubmitHandler } from "react-hook-form"

import { logger } from "@/logger"
import { HorizontalInput } from "@/components/HorizontalInput"
import { updateSiloGasPrice } from "@/actions/silos/update-silo-gas-price"
import type { Silo } from "@/types/types"
import { decimalsToFloat, floatToDecimals } from "@/utils/decimals"

type FormData = {
  gasPrice: number
}

type Props = {
  silo: Silo
  formId: string
  onSubmitted: (values: FormData) => void
}

export const GasPriceForm = ({ silo, formId, onSubmitted }: Props) => {
  const formSchema: z.ZodSchema<FormData> = z.object({
    gasPrice: z.coerce.number().gt(0, "Must be greater than 0"),
  })

  const saveGasPrice: SubmitHandler<FormData> = async (values: FormData) => {
    try {
      await updateSiloGasPrice(silo.id, {
        gas_price: floatToDecimals(values.gasPrice, silo.base_token_decimals),
      })
      toast.success("Gas price updated successfully.")
    } catch (e: unknown) {
      logger.error(e)
      toast.error("Gas price update failed.", { position: "bottom-right" })
    }

    onSubmitted(values)
  }

  const {
    watch,
    register,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    reValidateMode: "onSubmit",
    resolver: zodResolver(formSchema),
    defaultValues: {
      gasPrice: decimalsToFloat(silo.gas_price, silo.base_token_decimals),
    },
  })

  const gasPriceFieldValue = watch("gasPrice")

  useEffect(() => {
    clearErrors()
  }, [gasPriceFieldValue, clearErrors])

  return (
    <form
      id={formId}
      onSubmit={handleSubmit(saveGasPrice)}
      className="flex flex-col gap-4"
    >
      <HorizontalInput
        id="gasPrice"
        name="gasPrice"
        label={`Gas price (${silo.base_token_symbol})`}
        autoComplete="off"
        errors={{ gasPrice: errors.gasPrice }}
        register={register}
        registerOptions={{
          value: decimalsToFloat(silo.gas_price, silo.base_token_decimals),
        }}
      />
    </form>
  )
}
