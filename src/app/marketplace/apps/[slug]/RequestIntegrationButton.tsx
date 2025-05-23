"use client"

import { Button } from "@/components/Button"
import ContactModal from "@/components/ContactModal"
import { useModals } from "@/hooks/useModals"
import { Modals } from "@/utils/modals"

export const RequestIntegrationButton = () => {
  const { openModal } = useModals()

  const onClick = () => {
    openModal(Modals.Contact)
  }

  return (
    <>
      <Button
        onClick={onClick}
        variant="border"
        size="lg"
        className="mt-6 lg:mt-0 lg:absolute right-0 top-0 text-slate-900 dark:text-slate-50"
      >
        Request integration
      </Button>
      <ContactModal
        includeTelegramHandle
        submitButtonText="Submit request"
        title="Request integration"
        subject="Marketplace app integration"
      />
    </>
  )
}
