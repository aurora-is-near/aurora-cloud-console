import { WelcomeDashboard } from "./WelcomeDashboard"

const Page = ({ params: { teamKey } }: { params: { teamKey: string } }) => (
  <WelcomeDashboard teamKey={teamKey} />
)

export default Page
