"use client"

import { RocketLaunchIcon } from "@heroicons/react/24/outline"
import { useQuery } from "@tanstack/react-query"
import { NoDataCta } from "@/components/NoDataCta"
import { ContactButton } from "@/components/ContactButton"
import Card from "@/components/Card"
import CopyButton from "@/components/CopyButton"
import { getQueryFnAndKey } from "@/utils/api/queries"
import Loader from "@/components/Loader"
import { TabCard } from "@/components/TabCard/TabCard"

type OracleDeploymentProps = {
  teamKey: string
  siloId: number
}

export const OracleDeploymentTab = ({
  teamKey,
  siloId,
}: OracleDeploymentProps) => {
  const { data: oracle, isPending } = useQuery(
    getQueryFnAndKey("getSiloOracle", {
      id: siloId,
    }),
  )

  if (isPending) {
    return <Loader className="mt-4 md:mt-6 sm:h-[363px] h-[387px] rounded-md" />
  }

  if (oracle && !oracle.address) {
    return (
      <Card>
        <div className="pt-20">
          <NoDataCta
            title="Deployment pending"
            description="Your Oracle is being deployed. Please check back later, or contact support if you have any questions."
            Icon={RocketLaunchIcon}
            className="mx-auto max-w-[320px]"
          >
            <ContactButton teamKey={teamKey} />
          </NoDataCta>
        </div>
      </Card>
    )
  }

  return (
    <TabCard>
      <Card.Title tag="h3">Oracle contract</Card.Title>
      <div className="flex items-center justify-between m-6 mt-0 p-3 border border-l-4 border-slate-200">
        <span className="text-sm text-slate-900">{oracle?.address}</span>
        <CopyButton value={oracle?.address ?? ""} />
      </div>
    </TabCard>
  )
}
