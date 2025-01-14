import OraclePage from "@/components/OraclePage/OraclePage"

const Page = ({ params: { teamKey } }: { params: { teamKey: string } }) => (
  <OraclePage isNotAvailable teamKey={teamKey} />
)

export default Page
