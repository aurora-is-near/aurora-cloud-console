"use client"

import { ReactNode, createContext, useContext } from "react"
import { useQueryState } from "next-usequerystate"

export enum Modals {
  BlockAddress = "blockUser",
  DeleteAddress = "deleteUser",
  AddContract = "addContract",
  AddList = "addList",
  AddApiKey = "addApiKey",
  EditApiKey = "editApiKey",
}

type ModalsContextType = {
  activeModal: Modals | null
  openModal: (modal: Modals) => void
  closeModal: () => void
}

const ModalsContext = createContext<ModalsContextType>({} as ModalsContextType)

function validateModal(value: string | null): Modals | null {
  if (Object.values(Modals).includes(value as Modals)) {
    return value as Modals
  }
  return null
}

export function ModalsProvider({ children }: { children: ReactNode }) {
  const [queryModal, setQueryModal] = useQueryState("modal")
  const activeModal = validateModal(queryModal)

  const openModal = (modal: Modals) => setQueryModal(modal)
  const closeModal = () => setQueryModal(null)

  return (
    <ModalsContext.Provider
      value={{
        activeModal,
        openModal,
        closeModal,
      }}
    >
      {children}
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
