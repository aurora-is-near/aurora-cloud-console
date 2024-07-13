"use client"

import toast from "react-hot-toast"
import { SubmitHandler } from "react-hook-form"
import { useRouter } from "next/navigation"
import { Team, TransactionDatabaseType } from "@/types/types"
import { updateTeam } from "@/actions/teams/update-team"
import { HorizontalForm } from "@/components/HorizontalForm"
import { TRANSACTION_DATABASES } from "@/constants/databases"
import { SelectInputOption } from "@/components/SelectInput"
import { HOME_ROUTE } from "@/constants/routes"
import { createTeam } from "@/actions/teams/create-team"

type TeamFormProps = {
  team?: Team
}

type Inputs = Omit<Team, "id" | "created_at"> & { siloIds?: number[] }

const getTransactionDatabaseOption = (
  transactionDatabase: TransactionDatabaseType,
) => ({
  label: TRANSACTION_DATABASES[transactionDatabase].name,
  value: transactionDatabase,
})

export const TeamForm = ({ team }: TeamFormProps) => {
  const router = useRouter()

  const submitHandler: SubmitHandler<Inputs> = async ({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    siloIds,
    ...teamInputs
  }: Inputs) => {
    if (team) {
      await Promise.all([updateTeam(team.id, teamInputs)])

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
          name: "transaction_database",
          label: "Transaction database",
          required: true,
          defaultValue: team?.transaction_database
            ? getTransactionDatabaseOption(team.transaction_database)
            : undefined,
          options: Object.keys(TRANSACTION_DATABASES).map((key) =>
            getTransactionDatabaseOption(key as TransactionDatabaseType),
          ),
          getValue: (option?: SelectInputOption) => option?.value,
        },
      ]}
    />
  )
}
