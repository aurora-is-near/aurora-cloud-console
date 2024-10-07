"use client"

import { createContext, ReactNode, useCallback, useMemo, useState } from "react"
import AddApiKeyModal from "@/app/dashboard/[teamKey]/settings/api-keys/AddApiKeyModal"
import { ErrorModal } from "@/components/ErrorModal"
import { DeleteListItemModal } from "@/app/dashboard/[teamKey]/lists/DeleteListItemModal"
import { ViewListItemDetailsModal } from "@/app/dashboard/[teamKey]/lists/ViewListItemDetailsModal"
import { AddListModal } from "@/app/dashboard/[teamKey]/lists/AddListModal"
import { EditListModal } from "@/app/dashboard/[teamKey]/lists/EditListModal"
import { DeleteListModal } from "@/app/dashboard/[teamKey]/lists/DeleteListModal"
import { ImportListItemsModal } from "@/app/dashboard/[teamKey]/lists/ImportListItemsModal"
import EditApiKeyModal from "@/app/dashboard/[teamKey]/settings/api-keys/EditApiKeyModal"
import { DeleteApiKeyModal } from "@/app/dashboard/[teamKey]/settings/api-keys/DeleteApiKeyModal"
import ContactModal from "@/components/ContactModal"
import InviteModal from "@/app/dashboard/[teamKey]/settings/team/InviteModal"
import InviteConfirmedModal from "@/app/dashboard/[teamKey]/settings/team/InviteConfirmedModal"
import { DealDurationModal } from "@/app/dashboard/[teamKey]/borealis/deals/[id]/DealDurationModal"
import { MetaMaskNotInstalledModal } from "@/components/MetaMaskNotInstalledModal"
import BridgeNetworkModal from "@/app/dashboard/[teamKey]/silos/[id]/bridge/BridgeNetworkModal"
import BridgeTokensModal from "@/app/dashboard/[teamKey]/silos/[id]/bridge/BridgeTokensModal"

const MODALS = {
  Error: ErrorModal,
  DeleteListItem: DeleteListItemModal,
  ViewListItemDetails: ViewListItemDetailsModal,
  AddList: AddListModal,
  EditList: EditListModal,
  DeleteList: DeleteListModal,
  ImportListItems: ImportListItemsModal,
  AddApiKey: AddApiKeyModal,
  EditApiKey: EditApiKeyModal,
  DeleteApiKey: DeleteApiKeyModal,
  Contact: ContactModal,
  Invite: InviteModal,
  InviteConfirmed: InviteConfirmedModal,
  DealDuration: DealDurationModal,
  MetaMaskNotInstalled: MetaMaskNotInstalledModal,
  BridgeToNetwork: BridgeNetworkModal,
  BridgeFromNetwork: BridgeNetworkModal,
  BridgeTokens: BridgeTokensModal,
} as const

type ModalName = keyof typeof MODALS

type ModalProps<TModalName extends ModalName = ModalName> = Parameters<
  (typeof MODALS)[TModalName]
>[0]

type ActiveModal<
  TModalName extends ModalName = ModalName,
  TModalProps extends ModalProps<TModalName> = ModalProps<TModalName>,
> = {
  name: TModalName
  properties: TModalProps
} | null

type OpenModal = <
  TModalName extends ModalName,
  TModalProps extends ModalProps<TModalName>,
>(
  name: TModalName,
  ...properties: TModalProps extends undefined ? [] : [TModalProps]
) => void

type ModalsContextType = {
  activeModal?: ModalName
  openModal: OpenModal
  closeModal: () => void
}

export const ModalsContext = createContext<ModalsContextType | null>(null)

export const ModalsProvider = ({ children }: { children: ReactNode }) => {
  const [activeModal, setActiveModal] = useState<ActiveModal>(null)

  const openModal: OpenModal = useCallback(
    (name, ...properties) => {
      setActiveModal({ name, properties: properties[0] })
    },
    [setActiveModal],
  )

  const closeModal = useCallback(() => {
    setActiveModal(null)
  }, [setActiveModal])

  const ctx = useMemo(
    () => ({
      activeModal: activeModal?.name,
      openModal,
      closeModal,
    }),
    [activeModal, closeModal, openModal],
  )

  const ActiveModal = activeModal && MODALS[activeModal.name]

  return (
    <ModalsContext.Provider value={ctx}>
      {children}
      {/* @ts-ignore */}
      {ActiveModal && <ActiveModal {...activeModal.properties} />}
    </ModalsContext.Provider>
  )
}
