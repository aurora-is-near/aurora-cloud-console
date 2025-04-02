"use client"

import toast from "react-hot-toast"
import { useMemo, useState } from "react"
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
        if (integration === "intents") {
          queryClient.setQueryData(
            queryKeys.getTeamSiloByKey(team.team_key, updatedSilo.id),
            {
              ...silo,
              intents_integration_status:
                updatedSilo.intents_integration_status,
            },
          )
        } else if (integration === "trisolaris") {
          queryClient.setQueryData(
            queryKeys.getTeamSiloByKey(team.team_key, updatedSilo.id),
            {
              ...silo,
              trisolaris_integration_status:
                updatedSilo.trisolaris_integration_status,
            },
          )
        }
      }
    },
    onError: () => {
      toast.error("Failed to request integration")
    },
  })

  const integrationStatus = useMemo(() => {
    const defaultStatus = "INITIAL"

    if (integration === "intents") {
      return silo.intents_integration_status ?? defaultStatus
    }

    if (integration === "trisolaris") {
      return silo.trisolaris_integration_status ?? defaultStatus
    }

    return defaultStatus
  }, [
    integration,
    silo.trisolaris_integration_status,
    silo.intents_integration_status,
  ])

  return (
    <>
      <RequestAction
        isLoading={isRequestingIntegration}
        integrationStatus={integrationStatus}
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
