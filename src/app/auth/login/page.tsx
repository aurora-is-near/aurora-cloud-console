import LoginForm from "@/app/auth/login/LoginForm"
import Heading from "@/components/Heading"

const Page = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Heading className="mb-5 text-5xl">Sign in</Heading>
      <span className="text-[16px] text-slate-400 mb-5">
        Enter your email to receive a sign-in link.
      </span>
      <div className="flex flex-col divide-y divide-slate-700 items-center justify-center bg-slate-800 border border-slate-700 rounded-2xl">
        <div className="p-8 w-96">
          <LoginForm />
        </div>
      </div>
    </div>
  )
}

export default Page
