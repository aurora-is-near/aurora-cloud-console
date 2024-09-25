import { CheckCircleIcon } from "@heroicons/react/20/solid"
import { TryAgainButton } from "./TryAgainButton"
import { LinkSentText } from "./LinkSentText"
import { Heading } from "./Heading"

const Page = () => {
  return (
    <>
      <Heading className="mb-10">Check your email</Heading>
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
    </>
  )
}

export default Page
