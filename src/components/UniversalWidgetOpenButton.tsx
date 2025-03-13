"use client"

import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline"
import { useCallback } from "react"
import { Button } from "@/components/Button"
import { ButtonSize, ButtonVariant } from "@/types/buttons"
import { useWidget } from "@/hooks/useWidget"

type UniversalWidgetOpenButtonProps = {
  siloId: number
  size?: ButtonSize
  className?: string
  variant?: ButtonVariant
  isExternal?: boolean
}

export const UniversalWidgetOpenButton = ({
  siloId,
  size,
  className,
  variant,
  isExternal,
}: UniversalWidgetOpenButtonProps) => {
  const widget = useWidget(siloId)
  const { widgetUrl } = widget ?? {}

  const onClick = useCallback(() => {
    if (!widgetUrl) {
      return
    }

    window.open(
      widgetUrl,
      "newwindow",
      `width=600,height=800,left=${window.screen.width / 2 - 300},top=${
        window.screen.height / 2 - 400
      }`,
    )
  }, [widgetUrl])

  return (
    <Button
      onClick={onClick}
      className={className}
      disabled={!widgetUrl}
      variant={variant}
      size={size}
    >
      <span className="flex flex-row items-center">
        Preview widget
        {isExternal && <ArrowTopRightOnSquareIcon className="ml-2.5 w-6 h-6" />}
      </span>
    </Button>
  )
}
