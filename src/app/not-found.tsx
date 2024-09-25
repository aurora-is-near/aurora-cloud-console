import { NotAllowed } from "@/components/NotAllowed"
import { FullScreenPage } from "@/components/FullScreenPage"

const Page = () => {
  return (
    <FullScreenPage>
      <NotAllowed title="404" description="Page not found." />
    </FullScreenPage>
  )
}

export default Page
