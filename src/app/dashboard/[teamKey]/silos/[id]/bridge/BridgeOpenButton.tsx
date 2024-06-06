import { Button } from "@/components/Button"
import { LinkButtonProps } from "@/components/LinkButton"
import { useBridgeUrl } from "@/hooks/useBridgeUrl"
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline"
import { useCallback } from "react"

type BridgeOpenButtonProps = {
  siloId: number
  size?: LinkButtonProps["size"]
}

export const BridgeOpenButton = ({ siloId, size }: BridgeOpenButtonProps) => {
  const bridgeUrl = useBridgeUrl(siloId)

  const onClick = useCallback(() => {
    if (!bridgeUrl) {
      return
    }

    window.open(
      bridgeUrl,
      "newwindow",
      `width=600,height=800,left=${window.screen.width / 2 - 300},top=${
        window.screen.height / 2 - 400
      }`,
    )
  }, [bridgeUrl])

  return (
    <Button
      onClick={onClick}
      className="w-full"
      disabled={!bridgeUrl}
      size={size}
    >
      <span className="flex flex-row items-center">
        Open bridge
        <ArrowTopRightOnSquareIcon className="ml-2 w-6 h-6" />
      </span>
    </Button>
  )
}
