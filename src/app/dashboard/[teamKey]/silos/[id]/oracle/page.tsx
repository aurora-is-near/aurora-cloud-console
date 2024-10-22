import OraclePage from "@/components/OraclePage/OraclePage"

const Page = async ({
  params: { id, teamKey },
}: {
  params: { id: string; teamKey: string }
}) => {
  const siloId = Number(id)

  return <OraclePage siloId={siloId} teamKey={teamKey} />
}

export default Page
