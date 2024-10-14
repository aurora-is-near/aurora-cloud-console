import { BridgePage } from "@/components/BridgePage/BridgePage"

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  return <BridgePage siloId={Number(id)} />
}

export default Page
