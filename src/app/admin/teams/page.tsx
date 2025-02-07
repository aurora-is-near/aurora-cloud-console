import { PencilSquareIcon, PlusCircleIcon } from "@heroicons/react/24/outline"
import { sentenceCase } from "change-case"
import { formatDate } from "@/utils/helpers"
import Table from "@/components/Table"
import TableButton from "@/components/TableButton"
import { DashboardPage } from "@/components/DashboardPage"
import { LinkButton } from "@/components/LinkButton"
import { getTeams } from "@/actions/teams/get-teams"
import { getOnboardingForms } from "@/actions/onboarding/get-onboarding-forms"
import { DeleteTeamTableButton } from "./DeleteTeamTableButton"

const Page = async () => {
  const [teams, onboardingForms] = await Promise.all([
    getTeams(),
    getOnboardingForms(),
  ])

  return (
    <DashboardPage
      heading="Teams"
      actions={
        <LinkButton href="/admin/teams/add">
          <PlusCircleIcon className="w-5 h-5" />
          <span>Add team</span>
        </LinkButton>
      }
    >
      <section>
        <Table>
          <Table.TH>ID</Table.TH>
          <Table.TH>Name</Table.TH>
          <Table.TH>Status</Table.TH>
          <Table.TH>Requested base token</Table.TH>
          <Table.TH align="center">Created at</Table.TH>
          <Table.TH align="center">Updated at</Table.TH>
          <Table.TH hidden>Actions</Table.TH>
          {teams.map((team) => {
            const onboardingForm = onboardingForms.find(
              (form) => form.team_id === team.id,
            )

            return (
              <Table.TR key={team.id}>
                <Table.TD>{team.id}</Table.TD>
                <Table.TD>{team.name}</Table.TD>
                <Table.TD>
                  {team.onboarding_status
                    ? sentenceCase(team.onboarding_status)
                    : "-"}
                </Table.TD>
                <Table.TD align="center">
                  {onboardingForm?.baseToken ?? "-"}
                </Table.TD>
                <Table.TD align="center">
                  {formatDate(team.created_at)}
                </Table.TD>
                <Table.TD align="center">
                  {formatDate(team.updated_at)}
                </Table.TD>
                <Table.TD align="right">
                  <div className="flex gap-x-3">
                    <TableButton
                      Icon={PencilSquareIcon}
                      srOnlyText={`Edit ${team.name}`}
                      href={`/admin/teams/edit/${team.id}`}
                    />
                    <DeleteTeamTableButton team={team} />
                  </div>
                </Table.TD>
              </Table.TR>
            )
          })}
        </Table>
      </section>
    </DashboardPage>
  )
}

export default Page
