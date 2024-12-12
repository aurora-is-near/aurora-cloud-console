import { PencilSquareIcon, PlusCircleIcon } from "@heroicons/react/24/outline"
import Table from "@/components/Table"
import { DashboardPage } from "@/components/DashboardPage"
import { LinkButton } from "@/components/LinkButton"
import { getBlockscoutDatabases } from "@/actions/blockscout-database/get-blockscout-databases"
import { formatDate } from "@/utils/helpers"
import TableButton from "@/components/TableButton"
import { DeleteDatabaseTableButton } from "@/app/admin/blockscout/DeleteDatabaseTableButton"

const Page = async () => {
  const databases = await getBlockscoutDatabases()

  return (
    <DashboardPage
      heading="Blockscout"
      actions={
        <div className="flex flex-row space-x-3 items-center">
          <LinkButton href="/admin/blockscout/add">
            <PlusCircleIcon className="w-5 h-5" />
            <span>Add database</span>
          </LinkButton>
        </div>
      }
    >
      <section>
        <Table>
          <Table.TH>ID</Table.TH>
          <Table.TH>Name</Table.TH>
          <Table.TH align="center">Created at</Table.TH>
          <Table.TH align="center">Updated at</Table.TH>
          <Table.TH hidden>Actions</Table.TH>
          {databases.map((database) => (
            <Table.TR key={database.id}>
              <Table.TD>{database.id}</Table.TD>
              <Table.TD>{database.name}</Table.TD>
              <Table.TD align="center">
                {formatDate(database.created_at)}
              </Table.TD>
              <Table.TD align="center">
                {formatDate(database.updated_at)}
              </Table.TD>
              <Table.TD align="right">
                <div className="flex gap-x-3">
                  <TableButton
                    Icon={PencilSquareIcon}
                    srOnlyText={`Edit ${database.name}`}
                    href={`/admin/blockscout/edit/${database.id}`}
                  />
                  <DeleteDatabaseTableButton database={database} />
                </div>
              </Table.TD>
            </Table.TR>
          ))}
        </Table>
      </section>
    </DashboardPage>
  )
}

export default Page
