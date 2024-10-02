import { DashboardPage } from "@/components/DashboardPage"

const PLAN_DETAILS = [
  {
    title: "Plan",
    value: "-",
  },
  {
    title: "Cost / month",
    value: "-",
  },
  {
    title: "Next billing date",
    value: "-",
  },
]

const Page = () => {
  return (
    <DashboardPage heading="Billing">
      <section>
        <h3 className="sr-only">Plan details</h3>
        <dl className="mt-5 grid grid-cols-1 divide-y divide-slate-200 overflow-hidden rounded-lg bg-white shadow md:grid-cols-3 md:divide-x md:divide-y-0">
          {PLAN_DETAILS.map(({ title, value }) => (
            <div key={title} className="px-4 py-5 sm:p-6">
              <dt className="text-base font-normal text-slate-900">{title}</dt>
              <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
                <div className="flex items-baseline text-2xl font-semibold text-slate-900 tracking-tight">
                  {value}
                </div>
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </DashboardPage>
  )
}

export default Page
