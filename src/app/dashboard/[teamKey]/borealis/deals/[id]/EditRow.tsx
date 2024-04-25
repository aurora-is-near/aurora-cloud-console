"use client"

import Card from "@/components/Card"
import { useModals } from "@/hooks/useModals"
import { Modals } from "@/utils/modals"
import { PencilSquareIcon } from "@heroicons/react/24/outline"
import { ComponentType } from "react"

type EditRowProps = {
  title: string
  subtitle?: string
  modalKey: Modals
  Modal: ComponentType<{ title: string; open: boolean }>
}

export const EditRow = ({ title, subtitle, modalKey, Modal }: EditRowProps) => {
  const { openModal, activeModal } = useModals()

  const onEditClick = () => {
    openModal(modalKey)
  }

  return (
    <>
      <Card.Row>
        <div className="flex flex-row justify-between text-sm">
          <div className="text-gray-900 font-medium">{title}</div>
          {subtitle && <div className="text-gray-500">{subtitle}</div>}
          <div className="flex items-center space-x-3">
            <button
              onClick={onEditClick}
              className="text-gray-500 hover:text-gray-900"
            >
              <span className="sr-only">Open modal</span>
              <PencilSquareIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </Card.Row>
      <Modal title={title} open={activeModal === modalKey} />
    </>
  )
}
