import Table from "@/components/Table"
import Heading from "@/components/Heading"
import { formatDate } from "@/utils/helpers"
import { getSilos } from "@/actions/admin/silos/get-silos"
import { PencilSquareIcon, PlusCircleIcon } from "@heroicons/react/24/outline"
import Button from "@/components/Button"
import { Alert } from "@/components/Alert"
import TableButton from "@/components/TableButton"
import { RemoveSiloButton } from "@/app/admin/silos/RemoveSiloButton"

const Page = async ({
  searchParams,
}: {
  searchParams: { new_silo?: string }
}) => {
  const silos = await getSilos()
  const newSilo = silos.find(
    (silo) => silo.id === Number(searchParams["new_silo"]),
  )

  return (
    <div className="space-y-6">
      <header className="flex space-y-3 md:space-y-0 md:flex-row flex-col md:items-center md:justify-between lg:flex-col lg:space-y-3 xl:flex-row xl:space-y-0 lg:items-start xl:items-center xl:justify-between">
        <div className="flex space-x-3.5">
          <Heading tag="h2">Silos</Heading>
        </div>
        <div className="flex items-start sm:flex-row flex-col-reverse gap-3">
          <Button href="/admin/silos/add">
            <PlusCircleIcon className="w-5 h-5" />
            <span>Add silo</span>
          </Button>
        </div>
      </header>

      {newSilo && (
        <Alert dismissable type="success" className="mb-6">
          Silo created: {newSilo.name}
        </Alert>
      )}

      <section>
        {
          <Table>
            <Table.TH>Name</Table.TH>
            <Table.TH>Team</Table.TH>
            <Table.TH>Chain ID</Table.TH>
            <Table.TH>Created at</Table.TH>
            <Table.TH hidden>Actions</Table.TH>
            {silos.map((silo) => (
              <Table.TR key={silo.id}>
                <Table.TD>{silo.name}</Table.TD>
                <Table.TD>{silo.team?.name}</Table.TD>
                <Table.TD>{silo.chain_id}</Table.TD>
                <Table.TD>{formatDate(new Date(silo.created_at))}</Table.TD>
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
    </div>
  )
}

export default Page
