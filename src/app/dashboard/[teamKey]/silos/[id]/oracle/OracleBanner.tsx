import { ServiceBanner } from "@/components/ServiceBanner"
import { OracleEnableButton } from "./OracleEnableButton"

type OracleBannerProps = {
  siloId: number
  isEnabled: boolean
}

export const OracleBanner = ({ siloId, isEnabled }: OracleBannerProps) => {
  return (
    <ServiceBanner
      name="Aurora Oracle"
      enableButton={<OracleEnableButton siloId={siloId} />}
      isEnabled={isEnabled}
      description={[
        "Empower your smart contracts with reliable, low-latency market data from institutional sources. Build apps with high-fidelity oracle feeds designed for mission-critical systems.",
        "Aurora Cloud provides on its chains an interface with the Pyth Oracle.",
      ]}
      imageSrc="/static/images/oracle.png"
    />
  )
}
