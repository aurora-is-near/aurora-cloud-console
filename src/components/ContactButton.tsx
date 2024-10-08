"use client"

import { useModals } from "@/hooks/useModals"
import { Button } from "@/components/Button"
import ContactModal from "@/components/ContactModal"
import { Modals } from "@/utils/modals"

type ContactButtonProps = {
  teamKey: string
}

export const ContactButton = ({ teamKey }: ContactButtonProps) => {
  const { openModal } = useModals()

  return (
    <>
      <Button
        className="flex-shrink-0"
        onClick={() => openModal(Modals.Contact)}
        variant="border"
      >
        Contact us
      </Button>
      <ContactModal teamKey={teamKey} />
    </>
  )
}
