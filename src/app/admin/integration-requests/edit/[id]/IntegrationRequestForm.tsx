"use client"

import { SubmitHandler } from "react-hook-form"
import { usePathname } from "next/navigation"
import { IntegrationRequest, RequestStatus } from "@/types/types"
import { HorizontalForm } from "@/components/HorizontalForm"
import { SelectInputOption } from "@/components/SelectInput"
import { updateIntegrationRequest } from "@/actions/integration-requests/update-integration-request"

type IntegrationRequestFormProps = {
  integrationRequest: IntegrationRequest
}

type Inputs = {
  status: IntegrationRequest["status"]
}

const STATUSES = ["INITIAL", "REQUESTED", "COMPLETED"] as const

const getStatusOption = (status: RequestStatus): SelectInputOption => ({
  label: status,
  value: status,
})

export const IntegrationRequestForm = ({
  integrationRequest,
}: IntegrationRequestFormProps) => {
  const pathname = usePathname()

  const submitHandler: SubmitHandler<Inputs> = async (inputs: Inputs) => {
    await updateIntegrationRequest(integrationRequest.id, inputs)

    window.location.href = pathname.split("/").slice(0, -2).join("/")

    return
  }

  return (
    <HorizontalForm
      submitHandler={submitHandler}
      inputs={[
        {
          name: "status",
          label: "Status",
          defaultValue: integrationRequest.status
            ? getStatusOption(integrationRequest.status)
            : undefined,
          required: true,
          getValue: (option?: SelectInputOption) => option?.value,
          options: STATUSES.map((status) => getStatusOption(status)),
        },
      ]}
    />
  )
}
