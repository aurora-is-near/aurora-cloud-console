"use client"

import toast from "react-hot-toast"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline"

import { Hr, RadioGroup, Typography } from "@/uikit"
import SlideOver from "@/components/SlideOver"
import { Modals } from "@/utils/modals"
import { Input } from "@/components/Input"
import { Button } from "@/components/Button"
import { useModals } from "@/hooks/useModals"
import { InputWrapper } from "@/components/InputWrapper"
import type {
  Silo,
  SiloWhitelistAddress,
  SiloWhitelistType,
} from "@/types/types"

import { useAddAddress, useToggleWhitelist } from "./hooks"

type Copies = {
  title: string
  allowRadioTooltip: string
  restrictedRadioTooltip: string
}

const copies: Record<SiloWhitelistType, Copies> = {
  MAKE_TRANSACTION: {
    title: "Make transactions",
    allowRadioTooltip: "Allow everyone to make transactions",
    restrictedRadioTooltip: "Restrict transactions to selected wallets",
  },
  DEPLOY_CONTRACT: {
    title: "Deploy contracts",
    allowRadioTooltip: "Allow everyone to deploy contracts",
    restrictedRadioTooltip: "Restrict deploying contracts to selected wallets",
  },
} as const

type Props = {
  silo: Silo
  whitelistType: SiloWhitelistType
  addresses: SiloWhitelistAddress[]
}

const EditSiloPermissionsModalContent = ({
  silo,
  whitelistType,
  addresses: existingAddresses,
}: Props) => {
  const router = useRouter()

  const [addressValue, setAddressValue] = useState<string>("")
  const [addresses, setAddresses] = useState(
    existingAddresses.map((item) => item.address),
  )

  const {
    isPublic,
    isFailed: isToggleWhitelistFailed,
    isPending: isToggleWhitelistPending,
    onToggleWhitelist,
  } = useToggleWhitelist({
    silo,
    whitelistType,
    onSuccess: router.refresh,
  })

  const { onAddAddress } = useAddAddress({
    silo,
    addressValue,
    whitelistType,
    addresses,
    onSuccess: () => setAddressValue(""),
    onSubmit: (address) => setAddresses((p) => [...p, address]),
  })

  useEffect(() => {
    if (isToggleWhitelistFailed) {
      toast.error("Failed to update whitelist rules")
    }
  }, [isToggleWhitelistFailed])

  return (
    <div className="flex flex-col gap-8">
      <RadioGroup
        isClickable={!isToggleWhitelistPending}
        defaultSelected={isPublic ? "public" : "restricted"}
        onSelect={onToggleWhitelist}
      >
        <RadioGroup.Item
          name="public"
          label="Allow everyone"
          isLoading={isToggleWhitelistPending && isPublic}
          tooltip={copies[whitelistType].allowRadioTooltip}
        />
        <RadioGroup.Item
          name="restricted"
          label="Only selected users"
          isLoading={isToggleWhitelistPending && !isPublic}
          tooltip={copies[whitelistType].restrictedRadioTooltip}
        />
      </RadioGroup>

      {!isPublic && (
        <div>
          <InputWrapper
            id="newAddress"
            inputName="newAddress"
            label="New Address"
          >
            <div className="flex gap-x-3">
              <Input
                id="newAddress"
                name="newAddress"
                value={addressValue}
                onChange={(e) => setAddressValue(e.target.value)}
                placeholder="0x..."
                className="flex-1"
                disabled={isToggleWhitelistPending}
              />
              <Button
                variant="border"
                disabled={isToggleWhitelistPending}
                onClick={onAddAddress}
              >
                <PlusIcon className="w-5 h-5" />
              </Button>
            </div>
            <Hr />
          </InputWrapper>
          {addresses.length === 0 ? (
            <Typography
              variant="paragraph"
              size={4}
              className="text-slate-500 text-center"
            >
              You have no wallet addresses added yet. It means that no one it
              allowed to make transactions on your chain.
            </Typography>
          ) : (
            <div className="flex flex-col gap-3">
              <Typography variant="label" size={3} className="text-slate-900">
                Whitelisted addresses
              </Typography>
              <div className="flex flex-col gap-2">
                {addresses.map((address) => (
                  <div key={address} className="flex items-center gap-2">
                    <span className="text-sm flex flex-1 border border-slate-300 p-2 bg-slate-50 rounded-md text-ellipsis">
                      {address}
                    </span>
                    <Button
                      variant="border"
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export const EditSiloPermissionsModal = ({
  silo,
  addresses,
  whitelistType,
}: Omit<Props, "whitelistType"> & {
  whitelistType: SiloWhitelistType | null
}) => {
  const { closeModal, activeModal } = useModals()
  const open = activeModal === Modals.EditSiloAddressPermissions

  return (
    <SlideOver
      open={open}
      close={closeModal}
      title={whitelistType ? copies[whitelistType].title : ""}
    >
      {whitelistType ? (
        <EditSiloPermissionsModalContent
          silo={silo}
          addresses={addresses}
          whitelistType={whitelistType}
        />
      ) : null}
    </SlideOver>
  )
}
