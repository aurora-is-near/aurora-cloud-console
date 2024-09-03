import Image from "next/image"
import Layout from "@/app/dashboard_v2/Layout"
import Hero from "@/components/v2/dashboard/Hero"
import Tabs from "@/components/v2/Tabs/Tabs"
import { RainbowBridge } from "../../../../../public/static/v2/images/icons"
import { redirect } from "next/navigation"
import { getTeamByKey } from "@/actions/teams/get-team-by-key"

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

const Page = async ({
  params: { teamKey },
}: {
  params: { teamKey: string }
}) => {
  if (!teamKey) {
    redirect("/dashboard_v1")
  }

  const team = await getTeamByKey(teamKey)

  const tabs = [
    { title: "About", content: <AboutTab /> },
    { title: "Configuration", content: <ConfigurationTab /> },
  ]

  return (
    <Layout team={team}>
      <div className="flex flex-col gap-10">
        <Hero
          title="Universal Widget"
          description="Send, receive, bridge, pay and onramp on Aurora virtual chains, NEAR and Ethereum."
          button={{
            text: "Enable feature",
            path: "/",
          }}
          titlePrefix={
            <Image
              width="48"
              height="48"
              src="/static/v2/images/feature/universal_widget.svg"
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

        <Tabs tabs={tabs} />
      </div>
    </Layout>
  )
}

export default Page
