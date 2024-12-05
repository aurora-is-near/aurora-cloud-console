"use client"

import {
  CheckIcon,
  PlusIcon,
  TrashIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline"
import { useEffect, useState } from "react"
import { Button } from "@/components/Button"
import SlideOver from "@/components/SlideOver"
import { useModals } from "@/hooks/useModals"
import { useRequiredContext } from "@/hooks/useRequiredContext"
import { DealUpdateContext } from "@/providers/DealUpdateProvider"
import { InputWrapper } from "@/components/InputWrapper"
import { Modals } from "@/utils/modals"
import { Input } from "@/components/Input"
import { FilterUpdateContext } from "@/providers/FilterProvider"

export const AddFilterAddressModal = () => {
  const { closeModal, activeModal } = useModals()
  const { deal } = useRequiredContext(DealUpdateContext)

  const {
    filter,
    filterEntries,
    queueEntriesUpdate,
    savePendingUpdates,
    hasPendingUpdates,
    refetchFilterEntries,
    deleteFilterEntry,
  } = useRequiredContext(FilterUpdateContext)

  const [addresses, setAddresses] = useState<string[]>([])
  const [newAddress, setNewAddress] = useState("")
  const [_error, setError] = useState("")

  const validateAddress = (address: string) => {
    if (!address) {
      return "Address is required"
    }

    if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
      return "Invalid address"
    }

    if (addresses.includes(address)) {
      return "Address already added"
    }

    return ""
  }

  const addAddress = () => {
    const validationError = validateAddress(newAddress)

    if (validationError) {
      setError(validationError)

      return
    }

    setAddresses([...addresses, newAddress])
    queueEntriesUpdate({
      items: [...addresses, newAddress].map((address) => ({ value: address })),
    })
    setNewAddress("")
    setError("")
  }

  const removeAddress = (index: number) => {
    const savedEntry = filterEntries.find((e) => e.value === addresses[index])

    if (filter && savedEntry) {
      deleteFilterEntry({
        id: savedEntry.id,
        filter_id: filter.id,
      })
    }

    const newAddresses = [...addresses]

    newAddresses.splice(index, 1)
    setAddresses(newAddresses)
  }

  const onSaveClick = async () => {
    await savePendingUpdates()
    await refetchFilterEntries()
    closeModal()
  }

  const onClear = () => {
    setAddresses([])
    setNewAddress("")
    setError("")
  }

  const onCancel = () => {
    onClear()
    closeModal()
  }

  const open = activeModal === Modals.AddFilterAddress

  useEffect(() => {
    if (!deal || !open || !filterEntries) {
      return
    }

    setAddresses(filterEntries.map((e) => e.value))
  }, [deal, open, filterEntries])

  return (
    <SlideOver title="Import manually" open={open} close={closeModal}>
      <div className="space-y-4">
        <div className="space-y-2">
          {addresses.map((address, index) => (
            <div key={address} className="flex items-center justify-between">
              <span className="text-sm block border border-slate-300 p-2 bg-slate-50 rounded-md">
                {address}
              </span>
              <Button
                disabled={!hasPendingUpdates}
                variant="border"
                onClick={() => removeAddress(index)}
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

      <SlideOver.Actions>
        <div className="flex items-center flex-1 justify-between">
          <Button variant="secondary" onClick={onClear}>
            <XCircleIcon className="w-5 h-5 text-gray-900" />
            Clear all
          </Button>
          <div className="flex items-center gap-3">
            <Button variant="secondary" onClick={onCancel}>
              Cancel
            </Button>
            <Button onClick={onSaveClick} disabled={addresses.length === 0}>
              <CheckIcon className="w-5 h-5" />
              Save
            </Button>
          </div>
        </div>
      </SlideOver.Actions>
    </SlideOver>
  )
}
