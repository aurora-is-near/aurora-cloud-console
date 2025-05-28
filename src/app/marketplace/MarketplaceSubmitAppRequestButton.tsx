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
      <Button
        onClick={onClick}
        variant="border"
        className="mt-4 text-slate-900 dark:text-slate-50"
        size="sm"
      >
        Submit a request
      </Button>
      <ContactModal
        includeTelegramHandle
        submitButtonText="Submit request"
        title="Get your app listed"
        subject="Marketplace new app request"
      />
    </>
  )
}
