import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline"
import { useCallback } from "react"
import { Button } from "@/components/Button"
import { LinkButtonProps } from "@/components/LinkButton"
import { useWidgetUrl } from "@/hooks/useWidgetUrl"

type UniversalWidgetOpenButtonProps = {
  siloId: number
  size?: LinkButtonProps["size"]
}

export const UniversalWidgetOpenButton = ({
  siloId,
  size,
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
      className="w-full"
      disabled={!widgetUrl}
      size={size}
    >
      <span className="flex flex-row items-center">
        Open bridge
        <ArrowTopRightOnSquareIcon className="ml-2 w-6 h-6" />
      </span>
    </Button>
  )
}
