"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Modal from "@/components/Modal"
import { Button } from "@/components/Button"
import { Typography } from "@/uikit"
import { Silo, Team } from "@/types/types"
import { assignSiloToTeam } from "@/actions/deployment/assign-silo-to-team"
import { logger } from "@/logger"

type Props = {
  team: Team
  isOpen: boolean
  onClose: () => void
}

export const ModalConfirmDeployment = ({ team, isOpen, onClose }: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  /**
   * Start deployment by assigning a silo to the team.
   *
   * We are navigated to the silo page, where the deployment process continues.
   */
  const onConfirmClick = async () => {
    setIsLoading(true)

    let silo: Silo | null = null

    try {
      silo = await assignSiloToTeam(team.id)
    } catch (error) {
      logger.error(error)
      setIsLoading(false)

      return
    }

    setIsLoading(false)
    router.push(`/dashboard/${team.team_key}/silos/${silo.id}`)
  }

  const onEditClick = () => {
    router.push(`/dashboard/${team.team_key}/create-chain`)
  }

  return (
    <Modal
      title="Ready to deploy your virtual chain?"
      open={isOpen}
      close={onClose}
    >
      <div className="flex flex-col items-center mt-4">
        <Typography variant="paragraph" size={4} className="text-gray-500">
          Once you start deployment, core settings like gas mechanics,
          permissions, and base token will be locked and cannot be changed.
          Ensure everything is set before proceeding.
        </Typography>
        <div className="w-full h-[1px] bg-gray-200 my-6" />
        <div className="flex flex-col w-full space-y-4">
          <Button
            fullWidth
            size="lg"
            variant="primary"
            onClick={onConfirmClick}
            loading={isLoading}
          >
            Start deployment
          </Button>
          <Button fullWidth size="lg" variant="border" onClick={onEditClick}>
            Edit configuration
          </Button>
        </div>
      </div>
    </Modal>
  )
}
