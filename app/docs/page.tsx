import { Docs } from "@/app/docs/Docs"
import { getApiDocs } from "@/utils/swagger"

export default async function IndexPage() {
  const spec = await getApiDocs()

  return (
    <section className="mx-auto px-5 lg:px-16 xl:px-24 1xl:px-28 2xl:px-32 w-full">
      <Docs spec={spec} />
    </section>
  )
}
