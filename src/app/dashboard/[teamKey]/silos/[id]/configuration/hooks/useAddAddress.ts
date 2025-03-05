"use client"

import z from "zod"
import toast from "react-hot-toast"
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"

import { apiClient } from "@/utils/api/client"
import { useProgressiveRetry } from "@/hooks/useProgressiveRetry"
import type {
  SiloWhitelistAddress,
  SiloWhitelistType,
  Silo,
} from "@/types/types"

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
  addresses: SiloWhitelistAddress[]
  onSuccess: (address: string) => void
  onSubmit: (address: string) => void
}

class AddressError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "AddressError"
  }
}

const assertEmptyAddress = (address: string) => {
  if (!address) {
    throw new AddressError("Address is required")
  }
}

const assertInvalidAddress = (address: string) => {
  if (!addressSchema.safeParse({ address }).success) {
    throw new AddressError("Invalid address format")
  }
}

const assertExistingAddress = (
  address: string,
  addresses: SiloWhitelistAddress[],
) => {
  if (addresses.map((item) => item.address).includes(address)) {
    throw new AddressError("Address already exists")
  }
}

export const useAddAddress = ({
  silo,
  addresses,
  addressValue,
  whitelistType,
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
    onError: () => setIsFailed(true),
    onSuccess: (data, variables) => {
      if (data.status === "PENDING") {
        retry(() => addAddressToList.mutate(variables))
      } else if (data.status === "SUCCESSFUL") {
        setIsFailed(false)
        onSuccess(data.address)
      } else if (data.status === "FAILED") {
        setIsFailed(true)
      }
    },
  })

  const onAddAddress = () => {
    try {
      assertEmptyAddress(addressValue)
      assertInvalidAddress(addressValue)
      assertExistingAddress(addressValue, addresses)
    } catch (error: unknown) {
      if (error instanceof AddressError) {
        toast.error(error.message)
      }
    }

    onSubmit(addressValue)

    addAddressToList.mutate({
      id: silo.id,
      address: addressValue,
      action: whitelistType,
    })
  }

  return {
    isFailed,
    onAddAddress,
  }
}
