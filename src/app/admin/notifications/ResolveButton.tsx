"use client"

import { useState, useTransition } from "react"
import toast from "react-hot-toast"
import { CheckIcon } from "@heroicons/react/24/solid"
import TableButton from "@/components/TableButton"
import { logger } from "@/logger"
import Modal from "@/components/Modal"
import { Button } from "@/components/Button"

type ResolveButtonProps = {
  id: number
  onResolved: (id: number) => Promise<void>
  isTableButton?: boolean
}

export const ResolveButton = ({
  id,
  onResolved,
  isTableButton,
}: ResolveButtonProps) => {
  const [isPending, setIsPending] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isTransitionPending, startTransition] = useTransition()

  const onResolvedClick = async () => {
    setIsPending(true)

    try {
      await onResolved(id)
    } catch (error) {
      toast.error("Failed to resolve item")
      logger.error(error)
      setIsPending(false)

      return
    }

    window.location.href = "/admin/notifications"
    setIsPending(false)
  }

  const onClick = () => {
    setIsOpen(true)
  }

  return (
    <>
      {isTableButton ? (
        <TableButton Icon={CheckIcon} srOnlyText="Resolve" onClick={onClick} />
      ) : (
        <Button variant="primary" onClick={onClick}>
          Resolve
        </Button>
      )}
      <Modal
        title="Resolve request"
        open={isOpen}
        close={() => {
          setIsOpen(false)
        }}
      >
        <p className="text-sm leading-5 text-gray-500 mt-4">
          By resolving this request you are confirming that you have addressed
          the issue. For example, by deploying a contract or service, or by
          deciding not to take any action.
        </p>
        <p className="text-sm leading-5 text-gray-500 mt-4">
          Are you sure you want to mark this request as resolved?
        </p>
        <Button
          className="mt-4"
          variant="primary"
          loading={isPending ?? isTransitionPending}
          onClick={() => {
            startTransition(onResolvedClick)
          }}
        >
          Yes, resolve
        </Button>
      </Modal>
    </>
  )
}
