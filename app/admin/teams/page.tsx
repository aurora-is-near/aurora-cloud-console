import Table from "@/components/Table"
import { formatDate } from "@/utils/helpers"
import { getTeams } from "@/actions/admin/teams/get-teams"

import { PencilSquareIcon, PlusCircleIcon } from "@heroicons/react/24/outline"
import Button from "@/components/Button"
import { Alert } from "@/components/Alert"
import TableButton from "@/components/TableButton"
import { RemoveTeamButton } from "@/app/admin/teams/RemoveTeamButton"
import { AdminPage } from "@/components/AdminPage"

const Page = async ({
  searchParams,
}: {
  searchParams: { new_team?: string }
}) => {
  const teams = await getTeams()
  const newTeam = teams.find(
    (team) => team.id === Number(searchParams["new_team"]),
  )

  return (
    <AdminPage
      title="Teams"
      actions={
        <Button href="/admin/teams/add">
          <PlusCircleIcon className="w-5 h-5" />
          <span>Add team</span>
        </Button>
      }
    >
      {newTeam && (
        <Alert dismissable type="success" className="mb-6">
          Team created: {newTeam.name}
        </Alert>
      )}

      <section>
        {
          <Table>
            <Table.TH>Name</Table.TH>
            <Table.TH>Key</Table.TH>
            <Table.TH>Website</Table.TH>
            <Table.TH>Email</Table.TH>
            <Table.TH>Created at</Table.TH>
            <Table.TH hidden>Actions</Table.TH>
            {teams.map((team) => (
              <Table.TR key={team.id}>
                <Table.TD>{team.name}</Table.TD>
                <Table.TD>{team.team_key}</Table.TD>
                <Table.TD>{team.website}</Table.TD>
                <Table.TD>{team.email}</Table.TD>
                <Table.TD>{formatDate(new Date(team.created_at))}</Table.TD>
                <Table.TD align="right">
                  <div className="flex gap-x-3">
                    <TableButton
                      Icon={PencilSquareIcon}
                      srOnlyText={`Edit ${team.name}`}
                      href={`/admin/teams/edit/${team.id}`}
                    />
                    <RemoveTeamButton team={team} />
                  </div>
                </Table.TD>
              </Table.TR>
            ))}
          </Table>
        }
      </section>
    </AdminPage>
  )
}

export default Page
