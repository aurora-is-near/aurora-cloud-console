import { getSiloById } from "@/mockApi"
import { notFound } from "next/navigation"

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  const silo = await getSiloById(id)

  if (!silo) notFound()

  return <div>Tokens page</div>
}

export default Page
