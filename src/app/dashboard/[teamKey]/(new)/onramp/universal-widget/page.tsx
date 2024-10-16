import Image from "next/image"
import { DashboardPage } from "@/components/DashboardPage"
import Hero from "@/components/Hero/Hero"

const Page = () => {
  return (
    <DashboardPage>
      <Hero
        title="Universal Widget"
        description="Send, receive, bridge, pay and onramp on Aurora virtual chains, NEAR and Ethereum."
        titlePrefix={
          <Image
            width="48"
            height="48"
            src="/static/v2/images/icons/marketplace/universal-widget.svg"
            alt="Universal Widget Logo"
          />
        }
        image={
          <Image
            width="400"
            height="240"
            src="/static/v2/images/feature/hero/universal_widget.png"
            alt="Universal Widget Preview"
          />
        }
      />
    </DashboardPage>
  )
}

export default Page
