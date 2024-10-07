"use client"

import { useModals } from "@/hooks/useModals"
import { Button } from "@/components/Button"
import ContactModal from "@/components/ContactModal"

type ContactButtonProps = {
  teamKey: string
}

export const ContactButton = ({ teamKey }: ContactButtonProps) => {
  const { openModal } = useModals()

  return (
    <>
      <Button
        className="flex-shrink-0"
        onClick={() => {
          openModal("Contact", { teamKey })
        }}
        variant="border"
        size="sm"
      >
        Contact us
      </Button>
      <ContactModal teamKey={teamKey} />
    </>
  )
}
