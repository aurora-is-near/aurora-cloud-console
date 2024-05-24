import { ServiceBanner } from "@/components/ServiceBanner"
import { BridgeEnableButton } from "./BridgeEnableButton"
import { BridgeOpenButton } from "@/app/dashboard/[teamKey]/silos/[id]/bridge/BridgeOpenButton"

type BridgeBannerProps = {
  siloId: number
  isEnabled: boolean
}

export const BridgeBanner = ({ siloId, isEnabled }: BridgeBannerProps) => {
  return (
    <ServiceBanner
      name="Aurora Bridge"
      isEnabled={isEnabled}
      description={[
        "The Cloud Bridge allows your users to transfer assets from Ethereum, Near or Aurora to your Aurora Chain.",
        "You can configure your bridge and embed it in your application.",
      ]}
      imageSrc="/static/images/bridge.png"
    >
      {isEnabled ? (
        <BridgeOpenButton siloId={siloId} size="lg" />
      ) : (
        <BridgeEnableButton siloId={siloId} />
      )}
    </ServiceBanner>
  )
}
