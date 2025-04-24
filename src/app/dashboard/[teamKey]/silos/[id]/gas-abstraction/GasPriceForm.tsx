"use client"

import { z } from "zod"
import { useEffect } from "react"
import toast from "react-hot-toast"
import { formatUnits, parseUnits } from "ethers"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type { SubmitHandler } from "react-hook-form"

import { logger } from "@/logger"
import { HorizontalInput } from "@/components/HorizontalInput"
import { updateSiloGasPrice } from "@/actions/silos/update-silo-gas-price"
import type { Silo } from "@/types/types"

type FormData = {
  gasPrice: string
}

type FormSubmittedData = {
  gasPrice: string
}

type Props = {
  silo: Silo
  formId: string
  onSubmitted: (values: FormSubmittedData) => void
}

export const GasPriceForm = ({ silo, formId, onSubmitted }: Props) => {
  const formSchema: z.ZodSchema<FormData> = z.object({
    gasPrice: z.coerce.string(),
  })

  const {
    watch,
    register,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    reValidateMode: "onSubmit",
    resolver: zodResolver(formSchema),
    defaultValues: {
      gasPrice: formatUnits(silo.gas_price, silo.base_token_decimals),
    },
  })

  const saveGasPrice: SubmitHandler<FormData> = async (values: FormData) => {
    const parsedGasPrice = parseUnits(values.gasPrice, silo.base_token_decimals)

    if (parsedGasPrice <= 0) {
      setError("gasPrice", { message: "Must be greater than 0" })

      return
    }

    const newGasPrice = parsedGasPrice.toString()

    try {
      await updateSiloGasPrice(silo.id, {
        gas_price: newGasPrice,
      })
      toast.success("Gas price updated successfully.")
    } catch (e: unknown) {
      logger.error(e)
      toast.error("Gas price update failed.", { position: "bottom-right" })

      return
    }

    onSubmitted({ gasPrice: newGasPrice })
  }

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
          value: formatUnits(silo.gas_price, silo.base_token_decimals),
        }}
      />
    </form>
  )
}
