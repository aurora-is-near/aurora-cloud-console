import { redirect } from "next/navigation"

const Page = ({ params: { teamKey } }: { params: { teamKey: string } }) =>
  redirect(`/dashboard/${teamKey}/settings/team`)

export default Page
