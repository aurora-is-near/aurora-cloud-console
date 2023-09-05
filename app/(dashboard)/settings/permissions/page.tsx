import Button from "@/components/Button"
import Heading from "@/components/Heading"
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

      <div className="mt-7 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-white">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm leading-none font-medium text-gray-900 sm:pl-6"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm leading-none font-medium text-gray-900"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                    >
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {people.map((person) => (
                    <tr key={person.email}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm leading-none font-medium text-gray-900 sm:pl-6">
                        {person.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm leading-none text-gray-500">
                        {person.email}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 sm:pr-6 flex items-center justify-end">
                        <button className="text-gray-900 hover:text-red-500 text-right">
                          <span className="sr-only">Remove {person.email}</span>
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Page
