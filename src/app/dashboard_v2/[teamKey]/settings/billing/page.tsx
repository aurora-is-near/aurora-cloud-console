import SubTitle from "@/components/v2/dashboard/SubTitle"

const PLAN_DETAILS = [
  {
    title: "Plan",
    value: "Free trial",
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
    <section>
      <SubTitle>Billing</SubTitle>
      <dl className="mt-5 grid grid-cols-1 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow md:grid-cols-3 md:divide-x md:divide-y-0">
        {PLAN_DETAILS.map(({ title, value }) => (
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
  )
}

export default Page
