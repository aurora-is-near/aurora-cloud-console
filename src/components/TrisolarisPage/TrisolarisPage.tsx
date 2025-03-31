"use client"

import Image from "next/image"
import toast from "react-hot-toast"
import { useContext, useState } from "react"
import { CheckIcon } from "@heroicons/react/24/solid"
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { queryKeys } from "@/actions/query-keys"
import { requestIntegration } from "@/actions/silos/request-integration"
import { useRequiredContext } from "@/hooks/useRequiredContext"
import { notReachable } from "@/utils/notReachable"

import Hero from "@/components/Hero/Hero"
import { Button } from "@/components/Button"
import { Tabs } from "@/components/Tabs/Tabs"
import { LinkButton } from "@/components/LinkButton"
import { TabCard } from "@/components/TabCard/TabCard"
import { DashboardPage } from "@/components/DashboardPage"
import { RequestReceivedPopup } from "@/components/RequestReceivedPopup"

import { TeamContext } from "@/providers/TeamProvider"
import { SiloContext } from "@/providers/SiloProvider"

import type { RequestStatus } from "@/types/types"

import { Trisolaris } from "../../../public/static/v2/images/icons"

const RequestButton = ({
  isLoading,
  integrationStatus,
  onClick,
}: {
  isLoading: boolean
  integrationStatus: RequestStatus
  onClick: () => void
}) => {
  switch (integrationStatus) {
    case "INITIAL":
      return (
        <Button onClick={onClick} disabled={isLoading} size="lg">
          {isLoading ? "Requesting activation..." : "Activate integration"}
        </Button>
      )
    case "REQUESTED":
      return (
        <Button variant="secondary" size="lg" disabled>
          <CheckIcon className="w-4 h-4" />
          Integration requested
        </Button>
      )
    case "COMPLETED":
      return (
        <Button size="lg" disabled>
          Active
        </Button>
      )
    case "REJECTED":
    case "APPROVED":
    case "PENDING":
      return null
    default:
      return notReachable(integrationStatus)
  }
}

export const TrisolarisPage = () => {
  const { team } = useRequiredContext(TeamContext)
  const { silo } = useContext(SiloContext) ?? {}

  const queryClient = useQueryClient()
  const [showPopup, setShowPopup] = useState(false)

  const { data: integrationStatus } = useQuery({
    queryKey: queryKeys.getTrisolarisIntegrationStatus(silo?.id ?? null),
    queryFn: async () => silo?.trisolaris_integration_status ?? null,
    enabled: !!silo,
  })

  const {
    mutate: mutateIntegrationRequest,
    isPending: isRequestingIntegration,
  } = useMutation({
    mutationFn: async () => {
      if (!silo) {
        return null
      }

      return requestIntegration(team, silo, "trisolaris")
    },
    onSuccess: () => {
      setShowPopup(true)
      queryClient.setQueryData(
        queryKeys.getTrisolarisIntegrationStatus(silo?.id ?? null),
        "REQUESTED",
      )
    },
    onError: () => {
      toast.error("Failed to request integration")
    },
  })

  const tabs = [
    {
      title: "About",
      content: (
        <TabCard
          attribution={{
            icon: <Trisolaris />,
            text: "Powered by Trisolaris",
          }}
        >
          <div className="flex flex-col gap-2 text-slate-500">
            <p>
              Get your chain listed on Trisolaris, the first and top DEX on the
              Aurora Networks, providing seamless swapping and deep liquidity.
              By integrating, your blockchain appears on Trisolaris.io as an
              available network. This means users will be able to deploy pools
              on your chain and trade assets from the Trisolaris interface.
            </p>
            <p>
              This integration ensures your blockchain is part of the Aurora
              DeFi ecosystem built for speed, efficiency, and interoperability.
              As demand for virtual chains solutions grows, being listed on
              Trisolaris positions your chain at the forefront of the chain
              abstraction innovation that Aurora is spearheading.
            </p>
          </div>
        </TabCard>
      ),
    },
  ]

  return (
    <DashboardPage>
      <Hero
        title={
          <>
            <Image
              width="48"
              height="48"
              src="/static/v2/images/icons/marketplace/trisolaris.svg"
              alt="Trisolaris Logo"
            />
            Trisolaris
          </>
        }
        description="Get your chain listed on Trisolaris, the first decentralized exchange on the Aurora network."
        image={
          <Image
            width="400"
            height="240"
            src="/static/v2/images/feature/hero/trisolaris.png"
            alt="Trisolaris Preview"
          />
        }
      >
        {showPopup && (
          <RequestReceivedPopup
            link={`/dashboard/${team.team_key}/silos/${silo?.id}/block-explorer`}
            close={() => setShowPopup(false)}
          />
        )}
        <div className="flex justify-start gap-2">
          <RequestButton
            isLoading={isRequestingIntegration}
            integrationStatus={integrationStatus ?? "INITIAL"}
            onClick={mutateIntegrationRequest}
          />
          <LinkButton
            isExternal
            variant="border"
            href="https://www.trisolaris.io/"
            size="lg"
          >
            <span>Open Trisolaris</span>
            <ArrowTopRightOnSquareIcon className="w-4 h-4" />
          </LinkButton>
        </div>
      </Hero>

      <Tabs tabs={tabs} />
    </DashboardPage>
  )
}
