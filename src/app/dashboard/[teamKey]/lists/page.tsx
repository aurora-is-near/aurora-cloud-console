import { DashboardPage } from "@/components/DashboardPage"
import { AddListButton } from "./AddListButton"
import { ListsTable } from "./ListsTable"

const Page = ({ params: { teamKey } }: { params: { teamKey: string } }) => {
  return (
    <DashboardPage heading="All lists" actions={<AddListButton />}>
      <ListsTable teamKey={teamKey} />
    </DashboardPage>
  )
}

export default Page
