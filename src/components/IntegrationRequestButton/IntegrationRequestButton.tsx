"use client"

import toast from "react-hot-toast"
import { useState } from "react"
import { CheckIcon } from "@heroicons/react/24/solid"
import { useMutation, useQuery } from "@tanstack/react-query"

import { Button } from "@/components/Button"
import { notReachable } from "@/utils/notReachable"
import { requestIntegration } from "@/actions/silos/request-integration"
import type { RequestStatus, Silo, Team } from "@/types/types"
import { queryKeys } from "@/actions/query-keys"
import { getSiloIntegrationRequest } from "@/actions/silo-integration-requests/get-silo-integration-request"

import { RequestReceivedPopup } from "./RequestReceivedPopup"

type ActionProps = {
  isLoading: boolean
  integrationStatus: RequestStatus
  onClick: () => void
}

const RequestAction = ({
  isLoading,
  integrationStatus,
  onClick,
}: ActionProps) => {
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
      notReachable(integrationStatus, { throwError: false })

      return null
  }
}

type Props = {
  team: Team
  silo: Silo
  integrationType: string
  showUpdateIconPrompt?: boolean
  requestReceivedMessage?: string
}

export const IntegrationRequestButton = ({
  team,
  silo,
  integrationType,
  showUpdateIconPrompt,
  requestReceivedMessage,
}: Props) => {
  const [showPopup, setShowPopup] = useState(false)

  const { data: integrationRequest } = useQuery({
    queryKey: queryKeys.getSiloIntegrationRequest(silo.id, integrationType),
    queryFn: async () => getSiloIntegrationRequest(silo.id, integrationType),
  })

  const {
    mutate: mutateIntegrationRequest,
    isPending: isRequestingIntegration,
  } = useMutation({
    mutationFn: async () => {
      if (!silo) {
        return null
      }

      await requestIntegration(team, silo, integrationType)
    },
    onSuccess: () => {
      setShowPopup(true)
    },
    onError: () => {
      toast.error("Failed to request integration")
    },
  })

  return (
    <>
      <RequestAction
        isLoading={isRequestingIntegration}
        integrationStatus={integrationRequest?.status ?? "INITIAL"}
        onClick={mutateIntegrationRequest}
      />
      {showPopup && (
        <RequestReceivedPopup
          link={`/dashboard/${team.team_key}/silos/${silo.id}/configuration?tab=brand-assets`}
          close={() => setShowPopup(false)}
          showUpdateIconPrompt={showUpdateIconPrompt}
          message={requestReceivedMessage}
        />
      )}
    </>
  )
}
