import { CheckCircleIcon } from "@heroicons/react/20/solid"
import { AuthHeading } from "@/components/AuthHeading"
import { TryAgainButton } from "./TryAgainButton"
import { LinkSentText } from "./LinkSentText"

const Page = () => {
  return (
    <>
      <AuthHeading className="mb-5 text-2xl lg:text-5xl">
        Check your email
      </AuthHeading>
      <span className="text-base text-slate-400 mb-5">
        You will receive an email with a sign-in link.
      </span>
      <div className="flex flex-col divide-y divide-slate-700 items-center justify-center bg-slate-800 border border-slate-700 rounded-2xl">
        <div className="p-4 lg:p-8 w-full lg:w-96">
          <div className="flex items-start justify-center text-white">
            <div className="flex-shrink-0">
              <CheckCircleIcon
                className="w-5 h-5 text-green-400"
                aria-hidden="true"
              />
            </div>
            <div className="ml-3">
              <LinkSentText />
              <p className="text-sm font-medium text-white">
                Click the link in the email to login.
              </p>
              <p className="mt-2 text-sm text-gray-400">
                Didn’t receive it? <TryAgainButton />
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Page
