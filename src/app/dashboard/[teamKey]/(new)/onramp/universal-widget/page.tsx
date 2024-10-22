import { UniversalWidgetPage } from "@/components/UniversalWidgetPage/UniversalWidgetPage"

const Page = ({ params: { teamKey } }: { params: { teamKey: string } }) => {
  return <UniversalWidgetPage teamKey={teamKey} />
}

export default Page
