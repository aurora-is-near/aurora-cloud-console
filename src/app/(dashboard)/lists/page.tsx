import { DashboardPage } from "@/components/DashboardPage"
import { AddListButton } from "./AddListButton"
import { ListsTable } from "./ListsTable"

const Page = () => {
  return (
    <DashboardPage heading="All lists" actions={<AddListButton />}>
      <ListsTable />
    </DashboardPage>
  )
}

export default Page
