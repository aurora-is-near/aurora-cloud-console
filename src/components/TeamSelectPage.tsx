import Card from "@/components/Card"
import { DashboardLayout } from "@/components/DashboardLayout"
import { DashboardPage } from "@/components/DashboardPage"
import { Team } from "@/types/types"
import { ChevronRightIcon } from "@heroicons/react/20/solid"
import Link from "next/link"

type TeamSelectPageProps = {
  baseRoute: string
  teams: Team[]
}

export const TeamSelectPage = async ({
  teams,
  baseRoute,
}: TeamSelectPageProps) => (
  <DashboardLayout>
    <DashboardPage heading="Select a team">
      <ul className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {teams.map((team) => (
          <li key={team.id}>
            <Link href={`/${baseRoute}/${team.team_key}`.replace("//", "/")}>
              <Card>
                <Card.Title>{team.name}</Card.Title>
                <Card.Actions>
                  <ChevronRightIcon className="h-5 w-5" />
                </Card.Actions>
                <Card.Body>
                  <span className="text-xs text-gray-500">{team.website}</span>
                </Card.Body>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </DashboardPage>
  </DashboardLayout>
)
