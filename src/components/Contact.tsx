import { LifebuoyIcon } from "@heroicons/react/24/outline"
import clsx from "clsx"
import { ContactButton } from "@/components/ContactButton"
import { LinkButton } from "@/components/LinkButton"

type ContactProps = {
  teamKey: string
  text?: string
  description?: string
  className?: string
  button?: {
    text: string
    href: string
  }
}

const Contact = ({
  teamKey,
  text = "Need help setting up deals?",
  description = "Reach out to our support team to get assistance.",
  className,
  button,
}: ContactProps) => {
  return (
    <section
      className={clsx(
        "flex items-start justify-between gap-3 p-4 bg-gray-100 border border-gray-200 rounded-md sm:p-5 md:p-6 sm:items-center sm:gap-5",
        className,
      )}
    >
      <LifebuoyIcon className="flex-shrink-0 w-8 h-8 text-gray-500 sm:h-11 sm:w-11" />
      <div className="flex flex-col items-start justify-between flex-1 gap-y-3 sm:items-center sm:flex-row">
        <div>
          <p className="text-base font-medium leading-none text-gray-900">
            {text}
          </p>
          <p className="mt-2 text-sm leading-5 text-gray-500">{description}</p>
        </div>
        {button ? (
          <LinkButton
            className="flex-shrink-0"
            href={button.href}
            variant="border"
          >
            {button.text}
          </LinkButton>
        ) : (
          <ContactButton teamKey={teamKey} />
        )}
      </div>
    </section>
  )
}

export default Contact
