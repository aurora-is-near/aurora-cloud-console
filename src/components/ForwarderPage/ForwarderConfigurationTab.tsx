"use client"

import { useQuery } from "@tanstack/react-query"
import { Silo } from "@/types/types"
import Card from "@/components/Card"
import { getQueryFnAndKey } from "@/utils/api/queries"
import { Skeleton } from "@/uikit"
import { ForwarderTokenSymbol } from "@/types/forwarder-tokens"
import { Alert } from "@/components/Alert"
import { useModals } from "@/hooks/useModals"
import { Modals } from "@/utils/modals"
import { ForwarderTokensForm } from "./ForwarderTokensForm"

type ForwarderConfigurationTabProps = {
  silo: Silo
}

const ForwarderConfigurationTab = ({
  silo,
}: ForwarderConfigurationTabProps) => {
  const { openModal } = useModals()

  const { data, isLoading } = useQuery(
    getQueryFnAndKey("getForwarderTokens", {
      id: silo.id,
    }),
  )

  const defaultValues =
    data?.items.reduce<Partial<Record<ForwarderTokenSymbol, boolean>>>(
      (acc, item) => {
        if (!item.contractDeployed) {
          return acc
        }

        // @ts-expect-error - item.symbol is a ForwarderTokenSymbol and is defined
        // as such in the OpenAPI contract but the ServerInferRequest type from
        // @ts-rest/core does not infer enums correctly. We may be able to fix
        // this later but it is probably a larger chunk of work.
        acc[item.symbol] = item.enabled

        return acc
      },
      {},
    ) ?? {}

  const hasNoTokens = !isLoading && Object.keys(defaultValues).length === 0

  return (
    <div className="flex flex-col gap-4">
      {hasNoTokens && (
        <Alert type="error">
          There are no tokens available as the relevant contracts have not been
          deployed on your chain. Please{" "}
          <button
            type="button"
            onClick={() => openModal(Modals.Contact)}
            className="underline"
          >
            contact us
          </button>{" "}
          so that we can fix this.
        </Alert>
      )}
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-bold text-slate-900">
              Supported assets
            </h3>
            <p className="text-slate-500 text-sm">
              Choose the assets that will be supported by the Forwarder.
            </p>
            <p className="text-slate-500 text-sm">
              These assets will be made available via the Forwarder Widget,
              which provides the easiest way to integrate the Forwarder into
              your application.
            </p>
            <p className="text-slate-500 text-sm">
              You can also use the Forwarder API to build your own frontend and
              fully integrate it into your application. It’s especially suited
              for mobile and gaming apps.
            </p>
          </div>
          <div>
            {isLoading ? (
              <Skeleton />
            ) : (
              <ForwarderTokensForm silo={silo} defaultValues={defaultValues} />
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}

export default ForwarderConfigurationTab
