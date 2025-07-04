"use client"

import { PaperAirplaneIcon } from "@heroicons/react/20/solid"
import { Button } from "@/components/Button"
import { useModals } from "@/hooks/useModals"
import { Modals } from "@/utils/modals"

const InviteButton = () => {
  const { openModal } = useModals()

  return (
    <Button onClick={() => openModal(Modals.Invite)}>
      <PaperAirplaneIcon className="w-5 h-5" />
      <span>Invite</span>
    </Button>
  )
}

export default InviteButton
