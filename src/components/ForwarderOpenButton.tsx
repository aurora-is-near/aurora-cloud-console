"use client"

import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline"
import { useCallback } from "react"
import { Button } from "@/components/Button"
import { ButtonSize, ButtonVariant } from "@/types/buttons"
import { Silo } from "@/types/types"
import { getForwarderWidgetUrl } from "@/utils/forwarder"

type ForwarderWidgetOpenButtonProps = {
  silo: Silo
  size?: ButtonSize
  className?: string
  variant?: ButtonVariant
  isExternal?: boolean
}

export const ForwarderWidgetOpenButton = ({
  silo,
  size,
  className,
  variant,
  isExternal,
}: ForwarderWidgetOpenButtonProps) => {
  const onClick = useCallback(() => {
    const widgetUrl = getForwarderWidgetUrl(silo)

    window.open(
      widgetUrl,
      "newwindow",
      `width=600,height=1000,left=${window.screen.width / 2 - 300},top=${
        window.screen.height / 2 - 400
      }`,
    )
  }, [silo])

  return (
    <Button
      onClick={onClick}
      className={className}
      variant={variant}
      size={size}
    >
      <span className="flex flex-row items-center">
        Test widget
        {isExternal && <ArrowTopRightOnSquareIcon className="ml-2.5 w-6 h-6" />}
      </span>
    </Button>
  )
}
