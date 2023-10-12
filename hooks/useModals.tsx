"use client"

import BlockUserModal from "@/app/(dashboard)/users/BlockUserModal"
import DeleteUserModal from "@/app/(dashboard)/users/DeleteUserModal"
import { useQueryState } from "next-usequerystate"
import { ReactNode, createContext, useContext } from "react"

export enum Modals {
  BlockAddress = "blockUser",
  DeleteAddress = "deleteUser",
}

type ModalsContextType = {
  openModal: (modal: Modals) => void
  closeModal: () => void
}

const ModalsContext = createContext<ModalsContextType>({} as ModalsContextType)

export function ModalsProvider({ children }: { children: ReactNode }) {
  const [activeModal, setActiveModal] = useQueryState("modal")
  const openModal = (modal: Modals) => setActiveModal(modal)
  const closeModal = () => setActiveModal(null)

  return (
    <ModalsContext.Provider
      value={{
        openModal,
        closeModal,
      }}
    >
      {children}
      <BlockUserModal
        isOpen={activeModal === Modals.BlockAddress}
        close={closeModal}
      />
      <DeleteUserModal
        isOpen={activeModal === Modals.DeleteAddress}
        close={closeModal}
      />
    </ModalsContext.Provider>
  )
}

export function useModals() {
  const context = useContext(ModalsContext)
  if (context === undefined) {
    throw new Error("useModals must be used within a ModalsProvider")
  }
  return context
}
