"use client"

import Heading from "@/components/Heading"
import Card from "@/components/Card"
import useCurrentUser from "@/hooks/useCurrentUser"
import Button from "@/components/Button"

const Page = () => {
  const { user } = useCurrentUser()

  return (
    <div className="space-y-4 sm:space-y-5">
      <Heading tag="h2">API Key</Heading>

      <div className="flex justify-between items-center">
        <Heading tag="h2">Permissions</Heading>
        <Button>
          {/* <PaperAirplaneIcon className="w-5 h-5" /> */}
          <span>Create API Key</span>
        </Button>
      </div>

      <Card>
        <p className="px-6 py-7 space-y-10">
          {user?.api_key}
        </p>
      </Card>
    </div>
  )
}

export default Page
