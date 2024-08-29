import { redirect } from "next/navigation"

const Page = async ({ params: { teamKey } }: { params: { teamKey: string } }) =>
  redirect(`/dashboard/${teamKey}/borealis/deals`)

export default Page
