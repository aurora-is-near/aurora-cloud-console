import { notFound } from "next/navigation"
import Card from "@/components/Card"
import { DashboardPage } from "@/components/DashboardPage"
import { getBlockscoutDatabase } from "@/actions/blockscout-database/get-blockscout-database"
import { BlockscoutDatabaseForm } from "@/app/admin/blockscout/BlockscoutDatabaseForm"
import { DeleteBlockscoutDatabaseButton } from "./DeleteBlockscoutDatabaseButton"

const Page = async ({ params: { id } }: { params: { id: number } }) => {
  const database = await getBlockscoutDatabase(id)

  if (!database) {
    notFound()
  }

  return (
    <DashboardPage
      heading={["Blockscout", database.name]}
      actions={<DeleteBlockscoutDatabaseButton database={database} />}
    >
      <Card>
        <Card.Title tag="h3">Database details</Card.Title>
        <Card.Body>
          <BlockscoutDatabaseForm database={database} />
        </Card.Body>
      </Card>
    </DashboardPage>
  )
}

export default Page
