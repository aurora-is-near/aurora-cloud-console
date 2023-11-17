"use client"

import { PaperAirplaneIcon } from "@heroicons/react/20/solid"
import Button from "@/components/Button"
import InviteModal from "./InviteModal"
import { Modals, useModals } from "@/hooks/useModals"

const InviteButton = () => {
  const { openModal } = useModals()

  return (
    <>
      <Button onClick={() => openModal(Modals.InviteTeam)}>
        <PaperAirplaneIcon className="w-5 h-5" />
        <span>Invite</span>
      </Button>
      <InviteModal />
    </>
  )
}

export default InviteButton
