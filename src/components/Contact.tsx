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
        "flex items-start justify-between gap-3 py-4 px-5 bg-slate-100 border border-slate-200 rounded-md sm:py-5 sm:px-6 md:py-6 md:px-7 sm:items-center sm:gap-5",
        className,
      )}
    >
      <LifebuoyIcon className="flex-shrink-0 w-8 h-8 text-slate-500 sm:h-11 sm:w-11" />
      <div className="flex flex-col items-start justify-between flex-1 gap-y-3 sm:items-center sm:flex-row">
        <div>
          <p className="text-base font-medium leading-none text-slate-900">
            {text}
          </p>
          <p className="mt-2 text-sm leading-5 text-slate-500">{description}</p>
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
