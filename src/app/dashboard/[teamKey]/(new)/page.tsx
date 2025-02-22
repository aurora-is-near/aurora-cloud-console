import { WelcomeDashboard } from "./WelcomeDashboard"

const Page = async ({
  params: { teamKey },
}: {
  params: { teamKey: string }
}) => <WelcomeDashboard teamKey={teamKey} />

export default Page
