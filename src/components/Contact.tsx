"use client"

import { LifebuoyIcon } from "@heroicons/react/24/outline"
import { useModals } from "@/hooks/useModals"
import { Button } from "@/components/Button"
import ContactModal from "@/components/ContactModal"
import { Modals } from "@/utils/modals"

const Contact = ({
  text = "Need help setting up deals?",
}: {
  text?: string
}) => {
  const { openModal } = useModals()

  return (
    <>
      <section className="flex items-start justify-between gap-3 p-4 bg-gray-100 border border-gray-200 rounded-md sm:p-5 md:p-6 sm:items-center sm:gap-5">
        <LifebuoyIcon className="flex-shrink-0 w-8 h-8 text-gray-500 sm:h-11 sm:w-11" />
        <div className="flex flex-col items-start justify-between flex-1 gap-y-3 sm:items-center sm:flex-row">
          <div>
            <p className="text-base font-medium leading-none text-gray-900">
              {text}
            </p>
            <p className="mt-2 text-sm leading-5 text-gray-500">
              Reach out to our support team to get assistance.
            </p>
          </div>
          <Button
            className="flex-shrink-0"
            onClick={() => openModal(Modals.Contact)}
            variant="border"
            size="sm"
          >
            Contact us
          </Button>
        </div>
      </section>
      <ContactModal />
    </>
  )
}

export default Contact
