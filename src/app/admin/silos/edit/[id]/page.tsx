import { notFound } from "next/navigation"
import Link from "next/link"
import Card from "@/components/Card"
import { getSilo } from "@/actions/silos/get-silo"
import { DashboardPage } from "@/components/DashboardPage"
import { LinkButton } from "@/components/LinkButton"
import { getSiloTokens } from "@/actions/silo-bridged-tokens/get-silo-bridged-tokens"
import { Tag } from "@/components/Tag"
import { getTeams } from "@/actions/teams/get-teams"
import { getBlockscoutDatabases } from "@/actions/blockscout-database/get-blockscout-databases"
import { getSilosTeams } from "@/actions/silos/get-silos-teams"
import { DeleteSiloButton } from "./DeleteSiloButton"
import { SiloForm } from "../../SiloForm"
import { AddTokenButton } from "./AddTokenButton"

const Page = async ({ params: { id } }: { params: { id: number } }) => {
  const [silo, siloTokens, silosTeams, blockscoutDatabases, teams] =
    await Promise.all([
      getSilo(id),
      getSiloTokens(id),
      getSilosTeams(),
      getBlockscoutDatabases(),
      getTeams(),
    ])

  if (!silo) {
    notFound()
  }

  const tokensBaseRoute = `/admin/silos/edit/${silo.id}/tokens`

  return (
    <DashboardPage
      heading={["Silos", silo.name]}
      actions={<DeleteSiloButton silo={silo} />}
    >
      <Card>
        <Card.Title tag="h3">Silo details</Card.Title>
        <Card.Body>
          <SiloForm
            silo={silo}
            teams={teams}
            blockscoutDatabases={blockscoutDatabases}
            silosTeams={silosTeams}
          />
        </Card.Body>
      </Card>
      <Card>
        <Card.Title tag="h3">Silo tokens</Card.Title>
        <Card.Subtitle>The tokens currently deployed to the silo</Card.Subtitle>
        <Card.Actions>
          <LinkButton variant="border" href={tokensBaseRoute}>
            Manage tokens
          </LinkButton>
          <AddTokenButton silo={silo} />
        </Card.Actions>
        <Card.Row>
          {siloTokens.length ? (
            <ul className="flex flex-row flex-wrap gap-2">
              {siloTokens.map((token) => (
                <li key={token.id}>
                  <Link href={`${tokensBaseRoute}/edit/${token.id}`}>
                    <Tag color="cyan" text={token.symbol} />
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm">No available tokens</p>
          )}
        </Card.Row>
      </Card>
    </DashboardPage>
  )
}

export default Page
