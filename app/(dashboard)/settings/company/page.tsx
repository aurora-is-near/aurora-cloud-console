import Button from "@/components/Button"
import Heading from "@/components/Heading"
import { PencilIcon } from "@heroicons/react/20/solid"

const Page = () => {
  return (
    <>
      <Heading tag="h2">Company</Heading>
      <div className="mt-7 px-6 py-7 bg-white shadow rounded-md">
        <div className="flex justify-between items-center">
          <h3 className="text-lg leading-none font-medium">
            Company information
          </h3>
          <Button style="secondary">
            <PencilIcon className="w-5 h-5" />
            <span>Edit</span>
          </Button>
        </div>

        <dl className="mt-10 space-y-10">
          <div className="sm:grid sm:grid-cols-2">
            <dt className="text-sm font-medium leading-none text-gray-500">
              Company name
            </dt>
            <dd className="text-sm leading-none text-gray-900 mt-2 sm:mt-0">
              Aurora
            </dd>
          </div>
          <div className="sm:grid sm:grid-cols-2">
            <dt className="text-sm font-medium leading-none text-gray-500">
              Business website
            </dt>
            <dd className="text-sm leading-none text-gray-900 mt-2 sm:mt-0">
              www.auroracloud.dev
            </dd>
          </div>
          <div className="sm:grid sm:grid-cols-2">
            <dt className="text-sm font-medium leading-none text-gray-500">
              Support email
            </dt>
            <dd className="text-sm leading-none text-gray-900 mt-2 sm:mt-0">
              kenter@auroracloud.dev
            </dd>
          </div>
        </dl>
      </div>
    </>
  )
}

export default Page
