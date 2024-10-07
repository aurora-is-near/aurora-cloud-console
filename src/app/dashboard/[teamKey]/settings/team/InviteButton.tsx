"use client"

import { PaperAirplaneIcon } from "@heroicons/react/20/solid"
import { Button } from "@/components/Button"
import { useModals } from "@/hooks/useModals"
import { Team } from "@/types/types"

type InviteButtonProps = {
  team: Team
}

const InviteButton = ({ team }: InviteButtonProps) => {
  const { openModal } = useModals()

  const onClick = () => {
    openModal("Invite", { team })
  }

  return (
    <Button onClick={onClick}>
      <PaperAirplaneIcon className="w-5 h-5" />
      <span>Invite</span>
    </Button>
  )
}

export default InviteButton
