import { DashboardPage } from "@/components/DashboardPage"
import Heading from "@/components/Heading"
import { Borealis } from "@/components/icons"
import { addDays } from "date-fns"

const planDetails = [
  {
    title: "Plan",
    value: "Professional",
  },
  {
    title: "Cost / month",
    value: "$1,500",
  },
  {
    title: "Next billing date",
    value: addDays(new Date(), 30).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
  },
]

const planLimit = {
  current: 56000,
  max: 100000,
}

const formatter = new Intl.NumberFormat("en-US")

const Page = () => {
  return (
    <DashboardPage>
      <Heading tag="h2">Billing</Heading>
      <section>
        <h3 className="sr-only">Plan details</h3>
        <dl className="mt-5 grid grid-cols-1 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow md:grid-cols-3 md:divide-x md:divide-y-0">
          {planDetails.map(({ title, value }) => (
            <div key={title} className="px-4 py-5 sm:p-6">
              <dt className="text-base font-normal text-gray-900">{title}</dt>
              <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
                <div className="flex items-baseline text-2xl font-semibold text-gray-900 tracking-tight">
                  {value}
                </div>
              </dd>
            </div>
          ))}
        </dl>
      </section>
      <section className="mt-12">
        <Heading tag="h3">Plan limits</Heading>
        <div className="mt-5 rounded-lg bg-white shadow overflow-hidden">
          <div className="flex items-center gap-x-5 px-4 py-5 sm:p-6">
            <Borealis className="h-9 w-9 flex-shrink-0" />
            <div>
              <h4 className="text-gray-900 font-base leading-none font-medium">
                Borealis limit
              </h4>
              <p className="text-gray-500 text-sm mt-2">
                <strong>{formatter.format(planLimit.current)}</strong> of{" "}
                {formatter.format(planLimit.max)} transactions used
              </p>
            </div>
          </div>
          <div className="h-2 w-full bg-gray-200">
            <div
              className="h-full bg-gray-900"
              style={{
                width: `${(planLimit.current / planLimit.max) * 100}%`,
              }}
            />
          </div>
        </div>
      </section>
    </DashboardPage>
  )
}

export default Page
