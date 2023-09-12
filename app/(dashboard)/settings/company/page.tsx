import Button from "@/components/Button"
import Card from "@/components/Card"
import Heading from "@/components/Heading"
import { PencilIcon } from "@heroicons/react/20/solid"

const Page = () => {
  return (
    <div className="space-y-7">
      <Heading tag="h2">Company</Heading>

      <Card>
        <Card.Title tag="h3">Company information</Card.Title>
        <Card.Actions>
          <Button style="secondary">
            <PencilIcon className="w-5 h-5" />
            <span>Edit</span>
          </Button>
        </Card.Actions>
        <dl className="px-6 pb-7 space-y-10">
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
      </Card>
    </div>
  )
}

export default Page
