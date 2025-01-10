import { Tabs } from "@/components/Tabs/Tabs"
import { GasAbstractionPage } from "@/components/GasAbstractionPage"
import { GasAbstractionAboutTab } from "@/components/GasAbstraction/AboutTab"

const Page = async ({
  params: { teamKey },
}: {
  params: { teamKey: string }
}) => (
  <GasAbstractionPage teamKey={teamKey}>
    <Tabs
      tabs={[
        {
          title: "About",
          content: <GasAbstractionAboutTab />,
        },
      ]}
    />
  </GasAbstractionPage>
)

export default Page
