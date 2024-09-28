import { EnvelopeIcon } from "@heroicons/react/20/solid"
import { AuthHeading } from "@/components/AuthHeading"
import { TryAgainButton } from "./TryAgainButton"
import { LinkSentText } from "./LinkSentText"

const Page = () => {
  return (
    <>
      <div className="relative">
        <EnvelopeIcon className="w-16 h-16 text-green-400" />
        <div className="rounded-full w-3 h-3 bg-rose-500 mt-0.5 absolute -right-3 top-0" />
      </div>
      <AuthHeading className="mt-6 mb-4 text-2xl lg:text-4xl">
        Check your email
      </AuthHeading>
      <div className="text-center text-slate-400">
        <LinkSentText />
        <p className="mt-0.5">Click the link in the email to login.</p>
        <p className="mt-4">
          Didn’t receive it? <TryAgainButton />
        </p>
      </div>
    </>
  )
}

export default Page
