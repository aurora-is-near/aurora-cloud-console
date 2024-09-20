import { redirect } from "next/navigation"

const Page = ({ params: { teamKey } }: { params: { teamKey: string } }) =>
  redirect(`/dashboard_v2/${teamKey}/settings/billing`)

export default Page
