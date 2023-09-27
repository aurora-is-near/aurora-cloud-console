import { redirect } from "next/navigation"

const Page = ({ params: { id } }: { params: { id: string } }) =>
  redirect(`/silos/${id}/overview`)

export default Page
