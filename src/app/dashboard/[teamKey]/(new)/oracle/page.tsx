import OraclePage from "@/components/OraclePage/OraclePage"

const Page = ({ params }: { params: { teamKey: string } }) => {
  return <OraclePage teamKey={params.teamKey} />
}

export default Page
