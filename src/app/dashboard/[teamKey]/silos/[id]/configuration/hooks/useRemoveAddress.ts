"use client"

import toast from "react-hot-toast"
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"

import { apiClient } from "@/utils/api/client"
import { useProgressiveRetry } from "@/hooks/useProgressiveRetry"
import type { Silo, SiloWhitelistType } from "@/types/types"

import { AddressError } from "./error"

type Args = {
  silo: Silo
  whitelistType: SiloWhitelistType
  onSuccess: (address: string) => void
}

const assertNonEmptyAddress = (address: string) => {
  if (!address) {
    throw new AddressError("Address is required")
  }
}

export const useRemoveAddress = ({ silo, whitelistType, onSuccess }: Args) => {
  const [isFailed, setIsFailed] = useState<boolean>(false)
  const { retry } = useProgressiveRetry({
    maxRetries: 5,
    onRetriesComplete: () => setIsFailed(true),
  })

  const removeAddressFromList = useMutation({
    mutationFn: apiClient.removeAddressFromPermissionsWhitelist,
    onError: () => setIsFailed(true),
    onSuccess: async (data, variables) => {
      if (data.status === "PENDING") {
        retry(() => removeAddressFromList.mutate(variables))
      } else if (data.status === "SUCCESSFUL") {
        setIsFailed(false)
        onSuccess(data.address)
      } else if (data.status === "FAILED") {
        setIsFailed(true)
      }
    },
  })

  const onRemoveAddress = (address: string) => {
    try {
      assertNonEmptyAddress(address)
    } catch (error: unknown) {
      if (error instanceof AddressError) {
        toast.error(error.message)
      } else {
        throw error
      }
    }

    removeAddressFromList.mutate({
      address,
      id: silo.id,
      action: whitelistType,
    })
  }

  const isPending =
    removeAddressFromList.isPending ||
    removeAddressFromList.data?.status === "PENDING"

  return {
    isFailed,
    isPending,
    address: removeAddressFromList.variables?.address,
    onRemoveAddress,
  }
}
