import Table from "@/components/Table"
import { formatDate } from "@/utils/helpers"
import { getSilos } from "@/actions/admin/silos/get-silos"
import { PencilSquareIcon, PlusCircleIcon } from "@heroicons/react/24/outline"
import Button from "@/components/Button"
import TableButton from "@/components/TableButton"
import { RemoveSiloButton } from "@/app/admin/silos/RemoveSiloButton"
import { DashboardPage } from "@/components/DashboardPage"
import { AdminToast } from "@/components/AdminToast"

const Page = async () => {
  const silos = await getSilos()

  return (
    <>
      <DashboardPage
        heading="Silos"
        actions={
          <Button href="/admin/silos/add">
            <PlusCircleIcon className="w-5 h-5" />
            <span>Add silo</span>
          </Button>
        }
      >
        <section>
          {
            <Table>
              <Table.TH>ID</Table.TH>
              <Table.TH>Name</Table.TH>
              <Table.TH>Chain ID</Table.TH>
              <Table.TH>Created at</Table.TH>
              <Table.TH>Updated at</Table.TH>
              <Table.TH hidden>Actions</Table.TH>
              {silos.map((silo) => (
                <Table.TR key={silo.id}>
                  <Table.TD>{silo.id}</Table.TD>
                  <Table.TD>{silo.name}</Table.TD>
                  <Table.TD>{silo.chain_id}</Table.TD>
                  <Table.TD>{formatDate(silo.created_at)}</Table.TD>
                  <Table.TD align="center">
                    {formatDate(silo.updated_at)}
                  </Table.TD>
                  <Table.TD align="right">
                    <div className="flex gap-x-3">
                      <TableButton
                        Icon={PencilSquareIcon}
                        srOnlyText={`Edit ${silo.name}`}
                        href={`/admin/silos/edit/${silo.id}`}
                      />
                      <RemoveSiloButton silo={silo} />
                    </div>
                  </Table.TD>
                </Table.TR>
              ))}
            </Table>
          }
        </section>
      </DashboardPage>
      <AdminToast itemName="Silo" />
    </>
  )
}

export default Page
