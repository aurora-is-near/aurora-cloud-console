"use client"

import Link from "next/link"
import { useState } from "react"
import LoginForm from "@/app/auth/login/LoginForm"
import SignupForm from "@/app/auth/login/SignupForm"
import { Heading } from "./Heading"

const Page = () => {
  const [isSigningUp, setIsSigningUp] = useState(false)
  const toggleIsSigningUp = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    setIsSigningUp(!isSigningUp)
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Heading className="mb-5 text-5xl">Sign in</Heading>
      <span className="text-[16px] text-slate-400 mb-5">
        Enter your email to receive a sign-in link.
      </span>
      <div className="flex flex-col divide-y divide-slate-700 items-center justify-center bg-slate-800 border border-slate-700 rounded-2xl">
        <div className="p-8 w-96">
          {isSigningUp ? (
            <SignupForm toggleForm={() => setIsSigningUp(false)} />
          ) : (
            <LoginForm />
          )}
        </div>
        <div className="p-4 w-full flex flex-row gap-2 justify-center items-center">
          {isSigningUp ? (
            <>
              <span className="text-sm text-slate-400">
                Already have an account?
              </span>
              <Link href="#" onClick={toggleIsSigningUp}>
                <span className="text-sm text-green-400">Sign in</span>
              </Link>
            </>
          ) : (
            <>
              <span className="text-sm text-slate-400">New to Aurora?</span>
              <Link href="#" onClick={toggleIsSigningUp}>
                <span className="text-sm text-green-400">Create account</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Page
