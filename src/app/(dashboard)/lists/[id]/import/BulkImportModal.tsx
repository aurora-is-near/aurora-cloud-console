"use client"

import { useModals } from "@/hooks/useModals"
import Modal from "@/components/Modal"
import { useCreateListItems } from "@/hooks/useCreateListItems"
import { useState, useTransition } from "react"
import { Button } from "@/components/Button"
import { Toggle } from "@/components/Toggle"
import { useRouter } from "next/navigation"

type BulkImportModalProps = {
  title: string
  listId: number
  isOpen: boolean
  items: string[]
  onClose: () => void
}

export const BulkImportModal = ({
  title,
  listId,
  isOpen,
  items,
  onClose,
}: BulkImportModalProps) => {
  const { closeModal } = useModals()
  const router = useRouter()
  const [isTransitionPending, startTransition] = useTransition()
  const [excludeHeader, setExcludeHeader] = useState(false)

  const { createListItems, isPending } = useCreateListItems(listId, {
    onSuccess: () => {
      router.push(`/lists/${listId}`)
    },
  })

  const onImportClick = () => {
    const listItems = (excludeHeader ? items.slice(1) : items).filter(Boolean)

    createListItems(listItems)
  }

  return (
    <Modal
      title={title}
      open={isOpen}
      close={() => {
        closeModal()
        onClose()
      }}
    >
      <div className="text-sm leading-5 text-gray-500">
        <p>Click the import button if the sample data below looks correct.</p>
        <ul className="mt-4">
          {items
            .filter(Boolean)
            .slice(0, 10)
            .map((item, index) => (
              <li key={index} className="mt-1 overflow-hidden text-ellipsis">
                {item}
              </li>
            ))}
        </ul>
      </div>
      <div className="mt-6 space-x-3 flex flex-row">
        <Toggle
          checked={excludeHeader}
          onChange={() => {
            setExcludeHeader(!excludeHeader)
          }}
        />
        <label className="flex items-center text-sm text-gray-500">
          <span>Exclude header</span>
        </label>
      </div>
      <Button
        className="mt-6"
        loading={isPending ?? isTransitionPending}
        onClick={() => {
          startTransition(onImportClick)
        }}
      >
        Import
      </Button>
    </Modal>
  )
}
