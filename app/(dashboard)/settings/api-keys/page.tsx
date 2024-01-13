"use client"

import Heading from "@/components/Heading"
import { ApiKeysContent } from "@/app/(dashboard)/settings/api-keys/ApiKeyContent"
import AddApiKeyButton from "./AddApiKeyButton"

const Page = () => {
  return (
    <>
      <div className="flex justify-between items-center mb-7">
        <Heading tag="h2">API Keys</Heading>
        <div className="flex items-center gap-3">
          <AddApiKeyButton />
        </div>
      </div>

      <ApiKeysContent />
    </>
  )
}

export default Page
