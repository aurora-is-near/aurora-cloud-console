"use client"

import { PencilSquareIcon } from "@heroicons/react/24/outline"
import Card from "@/components/Card"
import { useModals } from "@/hooks/useModals"
import { Modals } from "@/utils/modals"

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
  modalKey?: Modals
}

export const CardConfigRow = ({
  title,
  content,
  modalKey,
}: CardConfigRowProps) => {
  const { openModal } = useModals()

  const onEditClick = () => {
    if (modalKey) {
      openModal(modalKey)
    }
  }

  return (
    <>
      <Card.Cell>
        <div className="text-slate-900 font-medium">{title}</div>
      </Card.Cell>

      <Card.Cell>
        {content?.type === "text" && (
          <div className="text-slate-500 text-sm">{content.value}</div>
        )}

        {content?.type === "labels" && (
          <div className="flex flex-wrap gap-2">
            {content.value.map((label) => (
              <span
                key={label}
                className="text-slate-900 bg-cyan-100 rounded-md px-2 py-1 text-sm whitespace-nowrap font-medium"
              >
                {label}
              </span>
            ))}
          </div>
        )}
      </Card.Cell>

      <Card.Cell>
        <div className="flex items-center justify-end space-x-3">
          {!!modalKey && (
            <button
              onClick={onEditClick}
              type="button"
              className="text-slate-500 hover:text-slate-900"
            >
              <span className="sr-only">Open modal</span>
              <PencilSquareIcon className="h-5 w-5" />
            </button>
          )}
        </div>
      </Card.Cell>
    </>
  )
}
