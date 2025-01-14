"use client"

import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline"
import { useEffect, useState } from "react"
import * as z from "zod"
import toast from "react-hot-toast"
import { Button } from "@/components/Button"
import SlideOver from "@/components/SlideOver"
import { useModals } from "@/hooks/useModals"
import { useRequiredContext } from "@/hooks/useRequiredContext"
import { InputWrapper } from "@/components/InputWrapper"
import { Modals } from "@/utils/modals"
import { Input } from "@/components/Input"
import { RuleContext } from "@/providers/RuleProvider"

const addressSchema = z.object({
  newAddress: z
    .string()
    .min(1, "Address is required")
    .regex(/^0x[a-fA-F0-9]{40}$/, "Invalid address format"),
})

export const AddRuleUserModal = () => {
  const { closeModal, activeModal } = useModals()
  const { ruleUsers, addRuleUser, removeRuleUser } =
    useRequiredContext(RuleContext)

  const [newAddress, setNewAddress] = useState<string>("")

  const [addresses, setAddresses] = useState<string[]>(
    ruleUsers.map((ruleUser) => ruleUser.eoas?.[0] ?? "").filter(Boolean),
  )

  useEffect(() => {
    setAddresses(
      ruleUsers.map((ruleUser) => ruleUser.eoas?.[0] ?? "").filter(Boolean),
    )
  }, [ruleUsers])

  const addAddress = () => {
    const result = addressSchema.safeParse({ newAddress })

    if (!result.success) {
      toast.error(result.error.errors[0].message)

      return
    }

    if (addresses.includes(newAddress)) {
      toast.error("Address already exists")

      return
    }

    addRuleUser(newAddress)
    setNewAddress("")
    toast.success("Address added")
  }

  const removeAddress = (address: string) => {
    const ruleUser = ruleUsers.find((user) => user.eoas?.[0] === address)

    if (ruleUser) {
      removeRuleUser(ruleUser.id)
      setAddresses(addresses.filter((a) => a !== address))
      toast.success("Address removed")
    }
  }

  const open = activeModal === Modals.AddRuleAddress

  return (
    <SlideOver title="Import manually" open={open} close={closeModal}>
      <div className="space-y-4">
        <div className="flex flex-col space-y-2">
          {addresses.map((address) => (
            <div key={address} className="flex items-center gap-2">
              <span className="text-sm flex flex-1 border border-slate-300 p-2 bg-slate-50 rounded-md text-ellipsis">
                {address}
              </span>
              <Button
                variant="border"
                onClick={() => removeAddress(address)}
                className="text-gray-400 hover:text-gray-500"
              >
                <TrashIcon className="w-5 h-5" />
              </Button>
            </div>
          ))}
        </div>
        <InputWrapper
          id="newAddress"
          inputName="newAddress"
          label="New Address"
        >
          <div className="flex gap-x-3">
            <Input
              id="newAddress"
              name="newAddress"
              value={newAddress}
              onChange={(e) => setNewAddress(e.target.value)}
              placeholder="0x..."
              className="flex-1"
            />
            <Button variant="border" onClick={addAddress}>
              <PlusIcon className="w-5 h-5" />
            </Button>
          </div>
        </InputWrapper>
      </div>
    </SlideOver>
  )
}
