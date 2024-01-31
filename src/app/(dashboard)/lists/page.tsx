import { DashboardPage } from "@/components/DashboardPage"
import { AddListButton } from "./AddListButton"
import { ListsTable } from "./ListsTable"
import { HeadingRow } from "@/components/HeadingRow"

const Page = () => {
  return (
    <DashboardPage>
      <HeadingRow title="All lists">
        <AddListButton />
      </HeadingRow>
      <ListsTable />
    </DashboardPage>
  )
}

export default Page
