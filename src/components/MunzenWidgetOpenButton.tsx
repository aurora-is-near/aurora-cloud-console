"use client"

import { useCallback, useEffect, useState } from "react"
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline"

import { Button } from "@/components/Button"
import { getMunzenWidgetUrl } from "@/actions/widget-munzen/get-munzen-widget"
import { ButtonSize } from "@/types/buttons"
import { Silo } from "@/types/types"

type MunzenWidgetOpenButtonProps = {
  silo: Silo
  className?: string
  size?: ButtonSize
}

export const MunzenWidgetOpenButton = ({
  silo,
  className,
  size,
}: MunzenWidgetOpenButtonProps) => {
  const [widgetUrl, setWidgetUrl] = useState<undefined | string>()

  useEffect(() => {
    getMunzenWidgetUrl(silo)
      .then((url) => setWidgetUrl(url))
      .catch(() => setWidgetUrl(undefined))
  }, [silo])

  const onClick = useCallback(() => {
    if (!widgetUrl) {
      return
    }

    window.open(
      widgetUrl,
      "newwindow",
      `width=416,height=630,left=${window.screen.width / 2 - 300},top=${
        window.screen.height / 2 - 400
      }`,
    )
  }, [widgetUrl])

  return (
    <Button
      size={size}
      variant="border"
      disabled={!widgetUrl}
      className={className}
      onClick={onClick}
    >
      <span className="flex flex-row items-center">
        Test widget
        <ArrowTopRightOnSquareIcon className="ml-2.5 w-4 h-4" />
      </span>
    </Button>
  )
}
