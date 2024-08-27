"use client"

import { LifebuoyIcon } from "@heroicons/react/24/outline"
import { ContactButton } from "@/components/ContactButton"

type ContactProps = {
  teamKey: string
  text?: string
}

const Contact = ({
  teamKey,
  text = "Need help setting up deals?",
}: ContactProps) => {
  return (
    <section className="flex items-start justify-between gap-3 p-4 bg-slate-100 border border-slate-200 rounded-xl sm:p-5 md:p-6 sm:items-center sm:gap-5 shadow-sm shadow-slate-200">
      <LifebuoyIcon className="flex-shrink-0 w-8 h-8 text-slate-500 sm:h-11 sm:w-11" />
      <div className="flex flex-col items-start justify-between flex-1 gap-y-3 sm:items-center sm:flex-row">
        <div>
          <p className="text-base font-medium leading-none text-slate-900">
            {text}
          </p>
          <p className="mt-2 text-sm leading-5 text-slate-500">
            Reach out to our support team to get assistance.
          </p>
        </div>
        <ContactButton teamKey={teamKey} />
      </div>
    </section>
  )
}

export default Contact
