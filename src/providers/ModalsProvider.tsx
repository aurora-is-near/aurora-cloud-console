"use client"

import { createContext, ReactNode, useCallback, useMemo, useState } from "react"
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
  const [queryModal, setQueryModal] = useState<Modals | null>(null)
  const activeModal = validateModal(queryModal)

  const openModal = useCallback(
    (modal: Modals) => setQueryModal(modal),
    [setQueryModal],
  )

  const closeModal = useCallback(() => setQueryModal(null), [setQueryModal])

  const ctx = useMemo(
    () => ({
      activeModal,
      openModal,
      closeModal,
    }),
    [activeModal, closeModal, openModal],
  )

  return <ModalsContext.Provider value={ctx}>{children}</ModalsContext.Provider>
}
