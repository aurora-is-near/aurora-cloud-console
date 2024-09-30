import { redirect } from "next/navigation"

const Page = ({
  params: { id, teamKey },
}: {
  params: { id: number; teamKey: string }
}) => redirect(`/dashboard/${teamKey}/admin/silos/edit/${id}`)

export default Page
