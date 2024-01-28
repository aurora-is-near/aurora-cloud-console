import { AddListButton } from "./AddListButton"
import { ListsTable } from "./ListsTable"
import { HeadingRow } from "@/components/HeadingRow"

const Page = () => {
  return (
    <>
      <HeadingRow title="All lists">
        <AddListButton />
      </HeadingRow>
      <ListsTable />
    </>
  )
}

export default Page
