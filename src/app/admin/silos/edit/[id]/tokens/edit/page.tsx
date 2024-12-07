import { redirect } from "next/navigation"

const Page = ({ params: { id } }: { params: { id: number } }) =>
  redirect(`/admin/silos/edit/${id}`)

export default Page
