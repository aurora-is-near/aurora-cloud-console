"use client"

import { PauseIcon } from "@heroicons/react/24/outline"
import { useRouter } from "next/navigation"
import { useCallback, useState, useTransition } from "react"
import toast from "react-hot-toast"
import { pause } from "@/actions/contracts/pause"
import { Button } from "@/components/Button"
import Modal from "@/components/Modal"
import { logger } from "@/logger"
import { Silo } from "@/types/types"

type PauseSiloButtonProps = {
  silo: Silo
}

const title = "Pause silo"

export const PauseSiloButton = ({ silo }: PauseSiloButtonProps) => {
  const router = useRouter()

  const [isPending, setIsPending] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isTransitionPending, startTransition] = useTransition()

  const toggleModal = useCallback(() => setIsModalOpen((s) => !s), [])

  const onPauseConfirm = async () => {
    setIsPending(true)

    try {
      await pause({
        accountId: silo.engine_account,
        chainId: "mainnet",
        networkId: "near",
        target: "controller.aurora",
        sender: "controller-delegate.aurora",
      })
      router.push("/admin/silos")
    } catch (error) {
      toast.error("Failed to delete item")
      logger.error(error)
    }

    setIsPending(false)
  }

  const description = `Are you sure you want to pause the silo "${silo.name}"?`

  return (
    <>
      <Button variant="secondary" onClick={toggleModal}>
        <PauseIcon className="w-5 h-5" />
        {title}
      </Button>

      <Modal title={title} open={isModalOpen} close={toggleModal}>
        <p className="text-sm leading-5 text-gray-500">{description}</p>
        <Button
          className="mt-4"
          variant="primary"
          loading={isPending ?? isTransitionPending}
          onClick={() => {
            startTransition(onPauseConfirm)
          }}
        >
          Pause
        </Button>
      </Modal>
    </>
  )
}
