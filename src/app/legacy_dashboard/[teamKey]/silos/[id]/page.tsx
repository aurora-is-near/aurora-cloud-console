import { redirect } from "next/navigation"

const Page = ({
  params: { id, teamKey },
}: {
  params: { id: string; teamKey: string }
}) => redirect(`/legacy_dashboard/${teamKey}/silos/${id}/overview`)

export default Page
