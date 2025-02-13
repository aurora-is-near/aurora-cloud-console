"use client"

import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { CheckIcon, PencilIcon } from "@heroicons/react/20/solid"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import Card from "@/components/Card"
import { Team } from "@/types/types"
import { Button } from "@/components/Button"
import { HorizontalInput } from "@/components/HorizontalInput"
import { updateTeamForm } from "@/actions/teams/update-team"
import { logger } from "@/logger"
import { DashboardPage } from "@/components/DashboardPage"

type Inputs = Omit<
  Team,
  "id" | "created_at" | "team_key" | "transaction_database" | "updated_at"
>

type CompanyFormProps = {
  team: Team
}

const CompanyForm = ({ team }: CompanyFormProps) => {
  const [showForm, setShowForm] = useState(false)
  const toggleForm = () => setShowForm((prev) => !prev)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Inputs>()

  const handleUpdateTeam: SubmitHandler<Inputs> = async ({
    name = "",
    onboarding_status = null,
  }) => {
    try {
      await updateTeamForm(team.id, { name, onboarding_status })
      toast.success("Company information updated.")
      toggleForm()
      router.refresh()
    } catch (error) {
      logger.error(error)
      toast.error("Failed to update company information.")
    }
  }

  return (
    <DashboardPage
      heading="Company"
      actions={
        showForm ? (
          <>
            <Button
              variant="border"
              onClick={toggleForm}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit(handleUpdateTeam)}
              loading={isSubmitting}
            >
              <CheckIcon className="w-5 h-5" />
              <span>Save</span>
            </Button>
          </>
        ) : (
          <Button variant="border" onClick={toggleForm}>
            <PencilIcon className="w-5 h-5" />
            <span>Edit</span>
          </Button>
        )
      }
    >
      <Card>
        {showForm ? (
          <form onSubmit={handleSubmit(handleUpdateTeam)} className="space-y-4">
            <HorizontalInput
              id="name"
              name="name"
              label="Company name"
              autoComplete="name"
              register={register}
              registerOptions={{
                value: team.name ?? "",
              }}
            />
          </form>
        ) : (
          <dl className="space-y-10 py-2">
            <div className="sm:grid sm:grid-cols-2">
              <dt className="text-sm font-medium leading-none text-gray-500">
                Company name
              </dt>
              <dd className="mt-2 text-sm leading-none text-gray-900 sm:mt-0">
                {team.name}
              </dd>
            </div>
          </dl>
        )}
      </Card>
    </DashboardPage>
  )
}

export default CompanyForm
