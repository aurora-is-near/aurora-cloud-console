import { ReactNode } from "react"
import Link from "next/link"
import { Button } from "@/components/Button"

type AuthFormProps = {
  isSubmitting: boolean
  onSubmit: () => void
  children: ReactNode
  submitButtonText: string
  errorMessage?: string
  footer?: {
    text: string
    link: string
    linkText: string
  }
}

export const AuthForm = ({
  isSubmitting,
  children,
  onSubmit,
  submitButtonText,
  errorMessage,
  footer,
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

      {footer && (
        <div className="p-6 w-full flex flex-row gap-2 justify-center items-center">
          <span className="text-slate-400">{footer.text}</span>
          <Link href={footer.link}>
            <span className="text-green-400 hover:underline">
              {footer.linkText}
            </span>
          </Link>
        </div>
      )}
    </div>
  )
}
