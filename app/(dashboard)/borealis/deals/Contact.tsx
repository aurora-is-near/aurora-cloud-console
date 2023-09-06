"use client"

import Button from "@/components/Button"
import { LifebuoyIcon } from "@heroicons/react/24/outline"

const Contact = () => {
  return (
    <div className="mt-12 p-5 sm:p-6 rounded-md border border-gray-200 bg-gray-100 flex justify-between sm:items-center items-start gap-3 sm:gap-5">
      <LifebuoyIcon className="h-8 w-8 sm:h-11 sm:w-11 text-gray-500 flex-shrink-0" />
      <div className="flex-1 flex items-start gap-y-3 sm:items-center justify-between sm:flex-row flex-col">
        <div>
          <p className="font-medium leading-none text-base text-gray-900">
            Need help setting up deals?
          </p>
          <p className="mt-2 text-gray-500 text-sm leading-5 ">
            Reach out to our support team to get assistance.
          </p>
        </div>
        <Button
          className="flex-shrink-0"
          onClick={() => console.log("contact us")}
          style="border"
          size="sm"
        >
          Contact us
        </Button>
      </div>
    </div>
  )
}

export default Contact
