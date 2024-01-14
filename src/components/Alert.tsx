"use client"

import {
  InformationCircleIcon,
  XMarkIcon,
  XCircleIcon,
  CheckCircleIcon,
} from "@heroicons/react/20/solid"
import clsx from "clsx"
import { ForwardRefExoticComponent, ReactNode, useState } from "react"
import { SVGProps } from "react"

type AlertType = "error" | "info" | "success"

type AlertProps = {
  type: AlertType
  className?: string
  children: ReactNode
  onClose?: () => void
  dismissable?: boolean
}

const ICONS: {
  [x in AlertType]: ForwardRefExoticComponent<
    Omit<SVGProps<SVGSVGElement>, "ref">
  >
} = {
  error: XCircleIcon,
  info: InformationCircleIcon,
  success: CheckCircleIcon,
}

export const Alert = ({
  type,
  children,
  className,
  onClose,
  dismissable,
}: AlertProps) => {
  const [show, setShow] = useState(true)
  const Icon = ICONS[type]

  const onCloseClick = () => {
    setShow(false)
    onClose?.()
  }

  if (!show) {
    return null
  }

  return (
    <div
      className={clsx(
        "rounded relative flex flex-row pl-4 pr-2 py-4",
        {
          "bg-red-50 border-red-400 text-red-700": type === "error",
          "bg-blue-50 border-blue-400 text-blue-700": type === "info",
          "bg-green-50 border-green-400 text-green-800": type === "success",
        },
        className,
      )}
      role="alert"
    >
      <div className="flex-shrink-0 flex items-center">
        <Icon
          className={clsx("w-5 h-5", {
            "text-red-400": type === "error",
            "text-blue-400": type === "info",
            "text-green-400": type === "success",
          })}
          aria-hidden="true"
        />
      </div>
      <div className="inline flex-1 flex items-center ml-3">
        <p className="text-sm">{children}</p>
      </div>
      {dismissable && (
        <button
          type="button"
          onClick={onCloseClick}
          className="px-2 flex items-center"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
      )}
    </div>
  )
}
