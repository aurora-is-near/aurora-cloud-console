import { ReactNode } from "react"
import Link from "next/link"
import { Button } from "@/components/Button"

type AuthFormProps = {
  isSubmitting: boolean
  onSubmit: () => void
  children: ReactNode
  submitButtonText: string
  errorMessage?: string
  isSignup?: boolean
}

export const AuthForm = ({
  isSubmitting,
  children,
  onSubmit,
  submitButtonText,
  errorMessage,
  isSignup,
}: AuthFormProps) => {
  return (
    <div className="flex flex-col divide-y divide-slate-700 items-center justify-center bg-slate-800 border border-slate-700 rounded-3xl">
      <div className="p-6 md:p-10 w-full md:w-[457px]">
        <form className="space-y-4" onSubmit={onSubmit}>
          {children}

          <Button loading={isSubmitting} size="lg" type="submit" fullWidth>
            {submitButtonText}
          </Button>

          {errorMessage && (
            <div className="h-5">
              <p className="text-sm text-center text-red-500">{errorMessage}</p>
            </div>
          )}
        </form>
      </div>

      <div className="p-4 w-full flex flex-row gap-2 justify-center items-center">
        {isSignup ? (
          <>
            <span className="text-base text-slate-400">
              Already have an account?
            </span>
            <Link href="/auth/login">
              <span className="text-sm text-green-400">Sign in</span>
            </Link>
          </>
        ) : (
          <>
            <span className="text-base text-slate-400">New to Aurora?</span>
            <Link href="/auth/signup">
              <span className="text-base text-green-400">Create account</span>
            </Link>
          </>
        )}
      </div>
    </div>
  )
}
