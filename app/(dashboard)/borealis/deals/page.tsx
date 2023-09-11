import { Suspense } from "react"
import Contact from "@/app/(dashboard)/borealis/deals/Contact"
import Heading from "@/components/Heading"
import Charts from "./Charts"
import DealsList from "./DealsList"

const Page = () => {
  return (
    <div className="space-y-12">
      <section>
        <Charts>
          <Heading tag="h2">Summary</Heading>
        </Charts>
      </section>

      <section>
        <Heading tag="h2" className="mb-7">
          Deals
        </Heading>

        <Suspense fallback={<div>Loading...</div>}>
          <DealsList />
        </Suspense>
      </section>

      <Contact />
    </div>
  )
}

export default Page
