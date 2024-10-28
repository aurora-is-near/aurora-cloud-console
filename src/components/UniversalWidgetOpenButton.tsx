"use client"

import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline"
import { useCallback } from "react"
import { Button } from "@/components/Button"
import { LinkButtonProps } from "@/components/LinkButton"
import { useWidgetUrl } from "@/hooks/useWidgetUrl"

type UniversalWidgetOpenButtonProps = {
  siloId: number
  size?: LinkButtonProps["size"]
  className?: string
}

export const UniversalWidgetOpenButton = ({
  siloId,
  size,
  className,
}: UniversalWidgetOpenButtonProps) => {
  const widgetUrl = useWidgetUrl(siloId)

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
      size={size}
    >
      Preview widget
    </Button>
  )
}
