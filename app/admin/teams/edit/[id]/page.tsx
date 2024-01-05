import Heading from "@/components/Heading"
import { notFound } from "next/navigation"
import Card from "@/components/Card"
import { getTeam } from "@/actions/admin/teams/get-team"
import { TeamForm } from "@/app/admin/teams/TeamForm"

const Page = async ({ params: { id } }: { params: { id: number } }) => {
  const team = await getTeam(id)

  if (!team) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <header className="flex space-y-3 md:space-y-0 md:flex-row flex-col md:items-center md:justify-between lg:flex-col lg:space-y-3 xl:flex-row xl:space-y-0 lg:items-start xl:items-center xl:justify-between">
        <div className="flex space-x-3.5">
          <Heading tag="h2">{team.name}</Heading>
        </div>
      </header>

      <Card>
        <Card.Title tag="h3">Team details</Card.Title>
        <div className="px-6 pb-7">
          <TeamForm team={team} />
        </div>
      </Card>
    </div>
  )
}

export default Page
