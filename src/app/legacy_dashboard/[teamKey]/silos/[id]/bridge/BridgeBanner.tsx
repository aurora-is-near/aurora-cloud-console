import { ServiceBanner } from "@/components/ServiceBanner"
import { BridgeOpenButton } from "@/app/legacy_dashboard/[teamKey]/silos/[id]/bridge/BridgeOpenButton"
import { BridgeEnableButton } from "./BridgeEnableButton"

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
