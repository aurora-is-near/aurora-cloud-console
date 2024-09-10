import LoginForm from "@/app/auth/login/LoginForm"
import { Heading } from "./Heading"

const Page = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Heading className="mb-10">Sign in</Heading>
      <LoginForm />
    </div>
  )
}

export default Page
