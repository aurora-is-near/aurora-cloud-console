import { SignUpForm } from "@/app/auth/signup/SignUpForm"
import { AuthHeading } from "@/components/AuthHeading"

const Page = () => {
  return (
    <>
      <AuthHeading className="mb-5 text-2xl lg:text-5xl">
        Create account
      </AuthHeading>
      <span className="text-base text-slate-400 mb-5 max-w-sm text-center">
        You are one step away from exploring infrastructure and integrations
        available on Aurora Cloud.
      </span>
      <SignUpForm />
    </>
  )
}

export default Page
