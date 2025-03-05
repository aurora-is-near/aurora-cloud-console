"use client"

import toast from "react-hot-toast"
import { useEffect } from "react"
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

import { useManageAddressList, useToggleWhitelist } from "./hooks"

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

  const { isPending, isPublic, isFailed, onToggleWhitelist } =
    useToggleWhitelist({
      silo,
      whitelistType,
    })

  const {
    addresses,
    addressValue,
    onAddAddress,
    onRemoveAddress,
    onChangeAddressValue,
  } = useManageAddressList({
    existingAddresses,
  })

  useEffect(() => {
    if (isFailed) {
      toast.error("Failed to update whitelist rules")
    }
  }, [isFailed])

  useEffect(() => {
    if (!isPending && !isFailed) {
      router.refresh()
    }
  }, [router, isPending, isFailed, addresses])

  return (
    <div className="flex flex-col gap-8">
      <RadioGroup
        isClickable={!isPending}
        defaultSelected={isPublic ? "public" : "restricted"}
        onSelect={onToggleWhitelist}
      >
        <RadioGroup.Item
          name="public"
          label="Allow everyone"
          isLoading={isPending && !isPublic}
          tooltip={copies[whitelistType].allowRadioTooltip}
        />
        <RadioGroup.Item
          name="restricted"
          label="Only selected users"
          isLoading={isPending && isPublic}
          tooltip={copies[whitelistType].restrictedRadioTooltip}
        />
      </RadioGroup>

      {!isPublic && (
        <>
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
                onChange={(e) => onChangeAddressValue(e.target.value)}
                placeholder="0x..."
                className="flex-1"
                disabled={isPending}
              />
              <Button
                variant="border"
                disabled={isPending}
                onClick={onAddAddress}
              >
                <PlusIcon className="w-5 h-5" />
              </Button>
            </div>
            <Hr />
          </InputWrapper>
          <Typography
            variant="paragraph"
            size={4}
            className="text-slate-500 text-center"
          >
            You have no wallet addresses added yet. It means that no one it
            allowed to make transactions on your chain.
          </Typography>
          <div className="flex flex-col space-y-2">
            {addresses.map((address) => (
              <div key={address} className="flex items-center gap-2">
                <span className="text-sm flex flex-1 border border-slate-300 p-2 bg-slate-50 rounded-md text-ellipsis">
                  {address}
                </span>
                <Button
                  variant="border"
                  onClick={() => onRemoveAddress(address)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <TrashIcon className="w-5 h-5" />
                </Button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export const EditSiloPermissionsModal = ({
  silo,
  whitelistType,
  addresses,
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
