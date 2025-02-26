"use client"

import { useModals } from "@/hooks/useModals"
import { Button } from "@/components/Button"
import { Modals } from "@/utils/modals"

export const ContactButton = () => {
  const { openModal } = useModals()

  return (
    <Button
      className="flex-shrink-0"
      onClick={() => openModal(Modals.Contact)}
      variant="border"
    >
      Contact us
    </Button>
  )
}
