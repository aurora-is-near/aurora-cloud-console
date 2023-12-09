import Table from "@/components/Table"
import { TeamMember } from "@/types/types"

type TeamMembersTableProps = {
  teamMembers: TeamMember[]
}

export const TeamMembersTable = ({ teamMembers }: TeamMembersTableProps) => (
  <Table>
    <Table.TH>Name</Table.TH>
    <Table.TH>Email</Table.TH>
    {teamMembers.map((teamMember) => (
      <Table.TR key={teamMember.email}>
        <Table.TD dark>{teamMember.name}</Table.TD>
        <Table.TD>{teamMember.email}</Table.TD>
      </Table.TR>
    ))}
  </Table>
)
