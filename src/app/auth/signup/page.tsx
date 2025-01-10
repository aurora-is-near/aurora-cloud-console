import { SignUpForm } from "@/app/auth/signup/SignUpForm"
import AuroraLogo from "@/components/AuroraLogo"
import { AuthHeading } from "@/components/AuthHeading"

const Page = () => {
  return (
    <>
      <div className="flex md:hidden pb-10">
        <AuroraLogo />
      </div>
      <AuthHeading className="mb-5 text-2xl lg:text-5xl">
        Create account
      </AuthHeading>
      <span className="text-base text-slate-400 mb-9 max-w-sm text-center">
        You are one step away from exploring infrastructure and integrations
        available on Aurora Cloud.
      </span>
      <SignUpForm />
    </>
  )
}

export default Page
