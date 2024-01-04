import Table from "@/components/Table"
import Heading from "@/components/Heading"
import { getTeams } from "@/actions/admin/get-teams"
import { formatDate } from "@/utils/helpers"

const Page = async () => {
  const teams = await getTeams()

  return (
    <div className="space-y-6">
      <header className="flex space-y-3 md:space-y-0 md:flex-row flex-col md:items-center md:justify-between lg:flex-col lg:space-y-3 xl:flex-row xl:space-y-0 lg:items-start xl:items-center xl:justify-between">
        <div className="flex space-x-3.5">
          <Heading tag="h2">Teams</Heading>
        </div>
      </header>

      <section>
        {
          <Table>
            <Table.TH>Name</Table.TH>
            <Table.TH>Key</Table.TH>
            <Table.TH>Website</Table.TH>
            <Table.TH>Email</Table.TH>
            <Table.TH>Created at</Table.TH>
            {teams.map((team) => (
              <Table.TR key={team.id}>
                <Table.TD>{team.name}</Table.TD>
                <Table.TD>{team.team_key}</Table.TD>
                <Table.TD>{team.website}</Table.TD>
                <Table.TD>{team.email}</Table.TD>
                <Table.TD>{formatDate(new Date(team.created_at))}</Table.TD>
              </Table.TR>
            ))}
          </Table>
        }
      </section>
    </div>
  )
}

export default Page
