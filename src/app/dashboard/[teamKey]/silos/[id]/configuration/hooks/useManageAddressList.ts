"use client"

import z from "zod"
import toast from "react-hot-toast"
import { useState } from "react"

import type { SiloWhitelistAddress } from "@/types/types"

const addressSchema = z.object({
  addressValue: z
    .string()
    .min(1, "Address is required")
    .regex(/^0x[a-fA-F0-9]{40}$/, "Invalid address format"),
})

export const useManageAddressList = ({
  existingAddresses,
}: {
  existingAddresses: SiloWhitelistAddress[]
}) => {
  const [addressValue, setAddressValue] = useState<string>("")
  const [addresses, setAddresses] = useState<string[]>(
    existingAddresses.map(({ address }) => address),
  )

  const onAddAddress = () => {
    const result = addressSchema.safeParse({ addressValue })

    if (!result.success) {
      toast.error(result.error.errors[0].message)
      return
    }

    if (addresses.includes(addressValue)) {
      toast.error("Address already exists")
      return
    }

    // addAddressToWhitelist(newAddress)
    setAddresses((p) => [...p, addressValue])
    setAddressValue("")
  }

  const onRemoveAddress = (address: string) => {
    // removeAddressFromWhitelist(ruleUser.id)
    setAddresses(addresses.filter((a) => a !== address))
    setAddressValue("")
  }

  return {
    addresses,
    addressValue,
    onAddAddress,
    onRemoveAddress,
    onChangeAddressValue: setAddressValue,
  }
}
