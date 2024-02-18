import Table from "@/components/Table"
import { formatDate } from "@/utils/helpers"
import { getTeams } from "@/actions/admin/teams/get-teams"

import { PencilSquareIcon, PlusCircleIcon } from "@heroicons/react/24/outline"
import TableButton from "@/components/TableButton"
import { RemoveTeamButton } from "@/app/admin/teams/RemoveTeamButton"
import { DashboardPage } from "@/components/DashboardPage"
import { getTeamsSilos } from "@/actions/admin/team-silos/get-teams-silos"
import { AdminToast } from "@/components/AdminToast"
import { LinkButton } from "@/components/LinkButton"

const Page = async () => {
  const [teams, teamsSilos] = await Promise.all([getTeams(), getTeamsSilos()])

  return (
    <>
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
          {
            <Table>
              <Table.TH>ID</Table.TH>
              <Table.TH>Name</Table.TH>
              <Table.TH>Key</Table.TH>
              <Table.TH>Website</Table.TH>
              <Table.TH>Email</Table.TH>
              <Table.TH align="center">Silos</Table.TH>
              <Table.TH align="center">Created at</Table.TH>
              <Table.TH align="center">Updated at</Table.TH>
              <Table.TH hidden>Actions</Table.TH>
              {teams.map((team) => (
                <Table.TR key={team.id}>
                  <Table.TD>{team.id}</Table.TD>
                  <Table.TD>{team.name}</Table.TD>
                  <Table.TD>{team.team_key}</Table.TD>
                  <Table.TD>{team.website}</Table.TD>
                  <Table.TD>{team.email}</Table.TD>
                  <Table.TD align="center">
                    {teamsSilos[team.team_key]?.length ?? 0}
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
                      <RemoveTeamButton team={team} />
                    </div>
                  </Table.TD>
                </Table.TR>
              ))}
            </Table>
          }
        </section>
      </DashboardPage>
      <AdminToast itemName="Team" />
    </>
  )
}

export default Page
