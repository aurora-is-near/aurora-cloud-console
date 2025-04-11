"use client"

import toast from "react-hot-toast"
import { useState } from "react"
import { CheckIcon } from "@heroicons/react/24/solid"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { Button } from "@/components/Button"
import { notReachable } from "@/utils/notReachable"
import { queryKeys } from "@/actions/query-keys"
import { requestIntegration } from "@/actions/silos/request-integration"
import type { RequestStatus, Silo, Team } from "@/types/types"

import { RequestReceivedPopup } from "./RequestReceivedPopup"

type Integration = "intents" | "trisolaris"

type ActionProps = {
  isLoading: boolean
  integrationStatus: RequestStatus
  onClick: () => void
}

const SILO_PROPERTIES: Record<
  Integration,
  Extract<
    keyof Silo,
    "intents_integration_status" | "trisolaris_integration_status"
  >
> = {
  intents: "intents_integration_status",
  trisolaris: "trisolaris_integration_status",
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
  integration: Integration
}

export const IntegrationRequestButton = ({
  team,
  silo,
  integration,
}: Props) => {
  const queryClient = useQueryClient()
  const [showPopup, setShowPopup] = useState(false)

  const {
    mutate: mutateIntegrationRequest,
    isPending: isRequestingIntegration,
  } = useMutation({
    mutationFn: async () => {
      if (!silo) {
        return null
      }

      return requestIntegration(team, silo, integration)
    },
    onSuccess: (updatedSilo) => {
      setShowPopup(true)

      if (updatedSilo) {
        queryClient.setQueryData(
          queryKeys.getTeamSiloByKey(team.team_key, updatedSilo.id),
          {
            ...silo,
            [SILO_PROPERTIES[integration]]:
              updatedSilo[SILO_PROPERTIES[integration]],
          },
        )
      }
    },
    onError: () => {
      toast.error("Failed to request integration")
    },
  })

  return (
    <>
      <RequestAction
        isLoading={isRequestingIntegration}
        integrationStatus={silo[SILO_PROPERTIES[integration]] || "INITIAL"}
        onClick={mutateIntegrationRequest}
      />
      {showPopup && (
        <RequestReceivedPopup
          link={`/dashboard/${team.team_key}/silos/${silo.id}/configuration?tab=brand-assets`}
          close={() => setShowPopup(false)}
        />
      )}
    </>
  )
}
