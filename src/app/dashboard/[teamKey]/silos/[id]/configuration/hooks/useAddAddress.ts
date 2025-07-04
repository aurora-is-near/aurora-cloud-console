"use client"

import z from "zod"
import toast from "react-hot-toast"
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"

import { apiClient } from "@/utils/api/client"
import { useProgressiveRetry } from "@/hooks/useProgressiveRetry"
import type { Silo, SiloWhitelistType } from "@/types/types"

import { AddressError } from "./error"

const addressSchema = z.object({
  address: z
    .string()
    .min(1, "Address is required")
    .regex(/^0x[a-fA-F0-9]{40}$/, "Invalid address format"),
})

type Args = {
  silo: Silo
  addressValue: string
  whitelistType: SiloWhitelistType
  addresses: string[]
  onError: (address: string) => void
  onSuccess: (address: string) => void
  onSubmit: (address: string) => void
}

const assertNonEmptyAddress = (address: string) => {
  if (!address) {
    throw new AddressError("Address is required")
  }
}

const assertValidAddress = (address: string) => {
  if (!addressSchema.safeParse({ address }).success) {
    throw new AddressError("Invalid address format")
  }
}

const assertPopulatedAddress = (address: string, addresses: string[]) => {
  if (addresses.includes(address)) {
    throw new AddressError("Address already exists")
  }
}

export const useAddAddress = ({
  silo,
  addresses,
  addressValue,
  whitelistType,
  onError,
  onSuccess,
  onSubmit,
}: Args) => {
  const [isFailed, setIsFailed] = useState<boolean>(false)
  const { retry } = useProgressiveRetry({
    maxRetries: 5,
    onRetriesComplete: () => setIsFailed(true),
  })

  const addAddressToList = useMutation({
    mutationFn: apiClient.addAddressToPermissionsWhitelist,
    onError: async (_error, variables) => {
      setIsFailed(true)
      onError(variables.address)
    },
    onSuccess: async (data, variables) => {
      if (data.status === "PENDING") {
        retry(() => addAddressToList.mutate(variables))
      } else if (data.status === "SUCCESSFUL") {
        setIsFailed(false)
        onSuccess(variables.address)
      } else if (data.status === "FAILED") {
        setIsFailed(true)
        onError(variables.address)
      }
    },
  })

  const onAddAddress = () => {
    try {
      assertNonEmptyAddress(addressValue)
      assertValidAddress(addressValue)
      assertPopulatedAddress(addressValue, addresses)
    } catch (error: unknown) {
      if (error instanceof AddressError) {
        toast.error(error.message)

        return
      }

      throw error
    }

    onSubmit(addressValue)

    addAddressToList.mutate({
      id: silo.id,
      address: addressValue,
      action: whitelistType,
    })
  }

  const isPending =
    addAddressToList.isPending || addAddressToList.data?.status === "PENDING"

  return {
    isFailed,
    isPending,
    address: addressValue,
    onAddAddress,
  }
}
