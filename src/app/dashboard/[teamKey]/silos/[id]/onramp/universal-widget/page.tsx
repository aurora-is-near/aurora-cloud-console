import { UniversalWidgetPage } from "@/components/UniversalWidgetPage/UniversalWidgetPage"

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  return <UniversalWidgetPage siloId={Number(id)} />
}

export default Page
