import Table from "@/components/Table"
import { formatDate } from "@/utils/helpers"
import { PencilSquareIcon, PlusCircleIcon } from "@heroicons/react/24/outline"
import TableButton from "@/components/TableButton"
import { DeleteSiloTableButton } from "./DeleteSiloTableButton"
import { DashboardPage } from "@/components/DashboardPage"
import { LinkButton } from "@/components/LinkButton"
import { getTeamSilosByKey } from "@/actions/team-silos/get-team-silos-by-key"

const Page = async ({
  params: { teamKey },
}: {
  params: { teamKey: string }
}) => {
  const silos = await getTeamSilosByKey(teamKey)

  return (
    <>
      <DashboardPage
        heading="Silos"
        actions={
          <LinkButton href={`/dashboard/${teamKey}/admin/silos/add`}>
            <PlusCircleIcon className="w-5 h-5" />
            <span>Add silo</span>
          </LinkButton>
        }
      >
        <section>
          {
            <Table>
              <Table.TH>ID</Table.TH>
              <Table.TH>Name</Table.TH>
              <Table.TH>Chain ID</Table.TH>
              <Table.TH align="center">Created at</Table.TH>
              <Table.TH align="center">Updated at</Table.TH>
              <Table.TH hidden>Actions</Table.TH>
              {silos.map((silo) => (
                <Table.TR key={silo.id}>
                  <Table.TD>{silo.id}</Table.TD>
                  <Table.TD>{silo.name}</Table.TD>
                  <Table.TD>{silo.chain_id}</Table.TD>
                  <Table.TD align="center">
                    {formatDate(silo.created_at)}
                  </Table.TD>
                  <Table.TD align="center">
                    {formatDate(silo.updated_at)}
                  </Table.TD>
                  <Table.TD align="right">
                    <div className="flex gap-x-3">
                      <TableButton
                        Icon={PencilSquareIcon}
                        srOnlyText={`Edit ${silo.name}`}
                        href={`/dashboard/${teamKey}/admin/silos/edit/${silo.id}`}
                      />
                      <DeleteSiloTableButton silo={silo} />
                    </div>
                  </Table.TD>
                </Table.TR>
              ))}
            </Table>
          }
        </section>
      </DashboardPage>
    </>
  )
}

export default Page
