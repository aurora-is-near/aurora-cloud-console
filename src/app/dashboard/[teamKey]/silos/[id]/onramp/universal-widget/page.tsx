import { UniversalWidgetPage } from "@/components/UniversalWidgetPage/UniversalWidgetPage"

const Page = async ({
  params: { teamKey, id },
}: {
  params: { teamKey: string; id: string }
}) => {
  return <UniversalWidgetPage siloId={Number(id)} teamKey={teamKey} />
}

export default Page
