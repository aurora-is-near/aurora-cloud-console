"use client"

import Heading from "@/components/Heading"
import Card from "@/components/Card"
import { getQueryFnAndKey } from "@/utils/api/queries"
import { useQuery } from "@tanstack/react-query"
import { DashboardPage } from "@/components/DashboardPage"

const Page = () => {
  const { data: team } = useQuery(getQueryFnAndKey("getTeam"))

  return (
    <DashboardPage>
      <div className="space-y-4 sm:space-y-5">
        <Heading tag="h2">Company</Heading>

        <Card>
          <Card.Title tag="h3">Company information</Card.Title>
          <dl className="px-6 space-y-10 pb-7">
            <div className="sm:grid sm:grid-cols-2">
              <dt className="text-sm font-medium leading-none text-gray-500">
                Company name
              </dt>
              <dd className="mt-2 text-sm leading-none text-gray-900 sm:mt-0">
                {team?.name}
              </dd>
            </div>
            <div className="sm:grid sm:grid-cols-2">
              <dt className="text-sm font-medium leading-none text-gray-500">
                Business website
              </dt>
              <dd className="mt-2 text-sm leading-none text-gray-900 sm:mt-0">
                {team?.website}
              </dd>
            </div>
            <div className="sm:grid sm:grid-cols-2">
              <dt className="text-sm font-medium leading-none text-gray-500">
                Support email
              </dt>
              <dd className="mt-2 text-sm leading-none text-gray-900 sm:mt-0">
                {team?.email}
              </dd>
            </div>
          </dl>
        </Card>
      </div>
    </DashboardPage>
  )
}

export default Page
