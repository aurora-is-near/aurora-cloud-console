"use client"

import { Button } from "@/components/Button"
import ContactModal from "@/components/ContactModal"
import { useModals } from "@/hooks/useModals"
import { Modals } from "@/utils/modals"

export const MarketplaceSubmitAppRequestButton = () => {
  const { openModal } = useModals()

  const onClick = () => {
    openModal(Modals.Contact)
  }

  return (
    <>
      <Button onClick={onClick} variant="border" className="mt-4" size="sm">
        Submit a request
      </Button>
      <ContactModal
        includeTelegramHandle
        title="Request an app"
        subject="Marketplace app request"
      />
    </>
  )
}
