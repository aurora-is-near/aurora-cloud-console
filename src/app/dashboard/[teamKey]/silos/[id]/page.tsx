import { WelcomeDashboard } from "@/app/dashboard/[teamKey]/(new)/WelcomeDashboard"

const Page = ({
  params: { id, teamKey },
}: {
  params: { id: string; teamKey: string }
}) => <WelcomeDashboard teamKey={teamKey} siloId={Number(id)} />

export default Page
