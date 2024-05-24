"use client"

import Card from "@/components/Card"
import { useModals } from "@/hooks/useModals"
import { Modals } from "@/utils/modals"
import { PencilSquareIcon } from "@heroicons/react/24/outline"
import { ComponentType } from "react"

type CardConfigRowProps = {
  title: string
  content?:
    | {
        type: "text"
        value: string
      }
    | {
        type: "labels"
        value: string[]
      }
  modalConfig?: {
    showEditButton: boolean
    Modal: ComponentType<{ title: string; open: boolean }>
    modalKey: Modals
  }
}

export const CardConfigRow = ({
  title,
  content,
  modalConfig,
}: CardConfigRowProps) => {
  const { openModal, activeModal } = useModals()
  const { Modal, modalKey, showEditButton } = modalConfig ?? {}

  const onEditClick = () => {
    if (modalKey) {
      openModal(modalKey)
    }
  }

  return (
    <>
      <Card.Cell>
        <div className="text-gray-900 font-medium">{title}</div>
      </Card.Cell>

      <Card.Cell>
        {content?.type === "text" && (
          <div className="text-gray-500">{content.value}</div>
        )}

        {content?.type === "labels" && (
          <div className="flex flex-wrap gap-2">
            {content.value.map((label) => (
              <span
                key={label}
                className="text-gray-900 bg-cyan-100 rounded-md px-2 py-1 text-sm whitespace-nowrap"
              >
                {label}
              </span>
            ))}
          </div>
        )}
      </Card.Cell>

      <Card.Cell>
        <div className="flex items-center justify-end space-x-3">
          {showEditButton && (
            <button
              onClick={onEditClick}
              className="text-gray-500 hover:text-gray-900"
            >
              <span className="sr-only">Open modal</span>
              <PencilSquareIcon className="h-5 w-5" />
            </button>
          )}
        </div>
      </Card.Cell>
      {Modal && <Modal title={title} open={activeModal === modalKey} />}
    </>
  )
}
