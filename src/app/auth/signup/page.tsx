import { SignUpForm } from "@/app/auth/signup/SignUpForm"
import { AuthHeading } from "@/components/AuthHeading"

const Page = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <AuthHeading className="mb-5 text-2xl lg:text-5xl">Sign up</AuthHeading>
      <span className="text-base text-slate-400 mb-5">
        Enter your information to create an account.
      </span>
      <SignUpForm />
    </div>
  )
}

export default Page
