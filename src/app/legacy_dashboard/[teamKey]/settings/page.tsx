import { redirect } from "next/navigation"

const Page = ({ params: { teamKey } }: { params: { teamKey: string } }) =>
  redirect(`/legacy_dashboard/${teamKey}/settings/billing`)

export default Page
