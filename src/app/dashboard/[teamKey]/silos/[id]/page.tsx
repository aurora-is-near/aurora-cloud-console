import { redirect } from "next/navigation"

const Page = ({
  params: { id, teamKey },
}: {
  params: { id: string; teamKey: string }
}) => redirect(`/dashboard/${teamKey}/silos/${id}/overview`)

export default Page
