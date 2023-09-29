import Button from "@/components/Button"
import Heading from "@/components/Heading"
import Table from "@/components/Table"
import { PaperAirplaneIcon } from "@heroicons/react/20/solid"
import { TrashIcon } from "@heroicons/react/24/outline"

const people = [
  {
    name: "Lindsay Walton",
    email: "lindsay.walton@example.com",
  },
  {
    name: "John Doe",
    email: "john.doe@example.com",
  },
  {
    name: "Jane Smith",
    email: "jane.smith@example.com",
  },
  {
    name: "Emily Johnson",
    email: "emily.johnson@example.com",
  },
  {
    name: "Michael Brown",
    email: "michael.brown@example.com",
  },
  {
    name: "Sophia Williams",
    email: "sophia.williams@example.com",
  },
  {
    name: "William Davis",
    email: "william.davis@example.com",
  },
]

const Page = () => {
  return (
    <>
      <div className="flex justify-between items-center">
        <Heading tag="h2">Permissions</Heading>
        <div className="flex items-center gap-3">
          <div>
            <label htmlFor="search" className="sr-only">
              Email
            </label>
            <input
              type="text"
              name="search"
              id="search"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
              placeholder="Search"
            />
          </div>
          <Button>
            <PaperAirplaneIcon className="w-5 h-5" />
            <span>Invite</span>
          </Button>
        </div>
      </div>

      <Table className="mt-7">
        <Table.TH>Name</Table.TH>
        <Table.TH>Email</Table.TH>
        <Table.TH hidden>Edit</Table.TH>
        {people.map((person) => (
          <Table.TR key={person.email}>
            <Table.TD dark>{person.name}</Table.TD>
            <Table.TD>{person.email}</Table.TD>
            <Table.TD align="right">
              <button className="text-gray-900 hover:text-red-500">
                <span className="sr-only">Remove {person.email}</span>
                <TrashIcon className="w-5 h-5" />
              </button>
            </Table.TD>
          </Table.TR>
        ))}
      </Table>
    </>
  )
}

export default Page
