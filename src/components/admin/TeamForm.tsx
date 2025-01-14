"use client"

import toast from "react-hot-toast"
import { SubmitHandler } from "react-hook-form"
import { useRouter } from "next/navigation"
import { OnboardingStatus, Team } from "@/types/types"
import { updateTeam } from "@/actions/teams/update-team"
import { HorizontalForm } from "@/components/HorizontalForm"
import { HOME_ROUTE } from "@/constants/routes"
import { createTeam } from "@/actions/teams/create-team"
import type { SelectInputOption } from "@/components/SelectInput"
import { sendEmail } from "@/utils/email"
import { getDeploymentDoneEmail } from "@/email-templates/get-deployment-done-email"
import { getDeploymentInProgressEmail } from "@/email-templates/get-deployment-in-progress-email"

type TeamFormProps = {
  team?: Team
}

type Inputs = Omit<Team, "id" | "created_at"> & { siloIds?: number[] }

const teamOnboardingStatusOptions: Array<{
  value: Exclude<Team["onboarding_status"], null>
  label: string
}> = [
  { value: "REQUEST_RECEIVED", label: "Request received" },
  { value: "DEPLOYMENT_IN_PROGRESS", label: "Deployment in progress" },
  { value: "DEPLOYMENT_DONE", label: "Deployment done" },
]

const sendUpdateEmail = async (
  { email }: Team,
  onboardingStatus: OnboardingStatus | null,
) => {
  if (!email) {
    return
  }

  if (onboardingStatus === "DEPLOYMENT_IN_PROGRESS") {
    await sendEmail({
      To: email,
      Subject: "Deployment started",
      HtmlBody: getDeploymentInProgressEmail(),
    })

    return
  }

  if (onboardingStatus === "DEPLOYMENT_DONE") {
    await sendEmail({
      To: email,
      Subject: "Your chain is live!",
      HtmlBody: getDeploymentDoneEmail(),
    })

    return
  }
}

export const TeamForm = ({ team }: TeamFormProps) => {
  const router = useRouter()

  const submitHandler: SubmitHandler<Inputs> = async ({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    siloIds,
    ...teamInputs
  }: Inputs) => {
    if (team) {
      await Promise.all([
        updateTeam(team.id, teamInputs),
        sendUpdateEmail(team, teamInputs.onboarding_status),
      ])

      toast.success("Team updated")

      return
    }

    await createTeam(teamInputs)
    window.location.href = `${HOME_ROUTE}/${teamInputs.team_key}`
  }

  const onCancel = () => {
    if (!team) {
      router.push(HOME_ROUTE)

      return
    }
  }

  return (
    <HorizontalForm
      submitHandler={submitHandler}
      onCancel={!team ? onCancel : undefined}
      inputs={[
        {
          name: "name",
          label: "Name",
          defaultValue: team?.name ?? "",
          autoComplete: "name",
          required: true,
        },
        {
          name: "team_key",
          label: "Team key",
          defaultValue: team?.team_key ?? "",
          autoComplete: "team_key",
          required: true,
        },
        {
          name: "email",
          label: "Email",
          defaultValue: team?.email ?? "",
          autoComplete: "email",
          required: true,
        },
        {
          name: "website",
          label: "Website",
          defaultValue: team?.website ?? "",
          autoComplete: "website",
          required: true,
        },
        {
          name: "onboarding_status",
          label: "Onboarding status",
          autoComplete: "onboarding_status",
          getValue: (option?: SelectInputOption) => option?.value,
          options: teamOnboardingStatusOptions,
          defaultValue: team?.onboarding_status
            ? teamOnboardingStatusOptions.find(
                (option) => option.value === team.onboarding_status,
              )
            : undefined,
        },
      ]}
    />
  )
}
