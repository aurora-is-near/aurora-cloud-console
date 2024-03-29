import { redirect } from "next/navigation"

const Page = async ({ params: { team } }: { params: { team: string } }) =>
  redirect(`/dashboard/${team}/borealis/deals`)

export default Page
