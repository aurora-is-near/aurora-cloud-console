import Heading from "@/components/Heading"
import Card from "@/components/Card"
import { TokenForm } from "@/app/admin/tokens/TokenForm"

const Page = async () => {
  return (
    <div className="space-y-6">
      <header className="flex space-y-3 md:space-y-0 md:flex-row flex-col md:items-center md:justify-between lg:flex-col lg:space-y-3 xl:flex-row xl:space-y-0 lg:items-start xl:items-center xl:justify-between">
        <div className="flex space-x-3.5">
          <Heading tag="h2">Add token</Heading>
        </div>
      </header>

      <Card>
        <Card.Title tag="h3">Token details</Card.Title>
        <div className="px-6 pb-7">
          <TokenForm />
        </div>
      </Card>
    </div>
  )
}

export default Page
