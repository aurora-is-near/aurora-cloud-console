"use client"

import { createContext, ReactNode } from "react"
import { useQueryState } from "next-usequerystate"
import { Modals } from "@/utils/modals"

type ModalsContextType = {
  activeModal: Modals | null
  openModal: (modal: Modals) => void
  closeModal: () => void
}

export const ModalsContext = createContext<ModalsContextType | null>(null)

function validateModal(value: string | null): Modals | null {
  if (Object.values(Modals).includes(value as Modals)) {
    return value as Modals
  }
  return null
}

export const ModalsProvider = ({ children }: { children: ReactNode }) => {
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
