"use client"

import { useEffect, useState, useCallback } from "react"
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline"

import { Button } from "@/components/Button"
import { notReachable } from "@/utils/not-reachable"
import { getMunzenWidgetUrl } from "@/actions/widget-munzen/get-munzen-widget"

type MunzenWidgetOpenButtonProps = {
  className?: string
}

const widgetPostMessageCallback = (event: MessageEvent) => {
  try {
    if (event?.data?.source !== "nearpay_widget") return
    if (event?.data?.data?.type !== "onpaymentsent") return
  } catch (error) {
    console.error("Failed to trigger Munzen's widgetPostMessageCallback", error)
  }
}

export const MunzenWidgetOpenButton = ({
  className,
}: MunzenWidgetOpenButtonProps) => {
  const [widgetUrl, setWidgetUrl] = useState<undefined | string>()

  useEffect(() => {
    const getWidgetUrl = async () => {
      const widgetUrlObject = await getMunzenWidgetUrl()
      switch (widgetUrlObject.type) {
        case "error":
          setWidgetUrl(undefined)
          break
        case "success":
          setWidgetUrl(widgetUrlObject.url)
          window.addEventListener("message", widgetPostMessageCallback)
          break
        default:
          return notReachable(widgetUrlObject)
      }
    }

    getWidgetUrl()

    return () => {
      window.removeEventListener("message", widgetPostMessageCallback)
    }
  }, [])

  const onClick = useCallback(() => {
    if (!widgetUrl) return
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
      size="sm"
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
