import Image from "next/image"
import Layout from "@/app/dashboard_v2/Layout"
import Hero from "@/components/v2/dashboard/Hero"
import Tabs from "@/components/v2/Tabs/Tabs"
import { RainbowBridge } from "../../../../../public/static/v2/images/icons"

const AboutTab = () => {
  return (
    <div className="divide-y flex flex-col gap-5">
      <div className="flex flex-col gap-2 text-[16px] text-slate-500">
        <p>
          Each Virtual Chain is automatically supported by the Rainbow Bridge
          technology stack, which enables the transfer of assets between
          Ethereum, Near, Aurora and your Virtual Chain. The bridge addon in
          Aurora Cloud allows you to configure your own bridge interface and
          embed it in your application.
        </p>
        <p>
          You can select which chains and which assets are available, enabling
          for instance only your Virtual Chain in order to provide a direct
          onramp for your users.
        </p>
      </div>
      <div className="pt-5 flex flex-row items-center gap-3">
        <RainbowBridge />
        <span className="text-sm text-slate-600">
          Powered by Rainbow Bridge
        </span>
      </div>
    </div>
  )
}

const ConfigurationTab = () => {
  return <div>Config</div>
}

const Page = () => {
  const tabs = [
    { title: "About", content: <AboutTab /> },
    { title: "Configuration", content: <ConfigurationTab /> },
  ]

  return (
    <Layout>
      <div className="flex flex-col gap-10">
        <Hero
          title="Bridge"
          description="Bridge between Ethereum, NEAR and Aurora. Configure your bridge widget and embed it in your application."
          button={{
            text: "Enable feature",
            path: "/",
          }}
          titlePrefix={
            <Image
              width="48"
              height="48"
              src="/static/v2/images/feature/bridge.svg"
              alt="Bridge Logo"
            />
          }
          image={
            <Image
              width="400"
              height="240"
              src="/static/v2/images/feature/hero/bridge.png"
              alt="Bridge Preview"
            />
          }
        />

        <Tabs tabs={tabs} />
      </div>
    </Layout>
  )
}

export default Page
