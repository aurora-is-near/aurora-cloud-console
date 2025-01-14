import OraclePage from "@/components/OraclePage/OraclePage"

const Page = ({ params: { teamKey } }: { params: { teamKey: string } }) => (
  <OraclePage teamKey={teamKey} />
)

export default Page
