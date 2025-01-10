import LoginForm from "@/app/auth/login/LoginForm"
import AuroraLogo from "@/components/AuroraLogo"
import { AuthHeading } from "@/components/AuthHeading"

const Page = () => {
  return (
    <>
      <div className="flex md:hidden pb-10">
        <AuroraLogo />
      </div>
      <AuthHeading className="mb-9 text-2xl lg:text-5xl">Sign in</AuthHeading>
      <span className="text-base text-slate-400 mb-5">
        Enter your email to receive a sign-in link.
      </span>
      <LoginForm />
    </>
  )
}

export default Page
