import { ReactNode } from "react"
import { Button } from "@/components/Button"

type AuthFormProps = {
  isSubmitting: boolean
  onSubmit: () => void
  children: ReactNode
  submitButtonText: string
  errorMessage?: string
}

export const AuthForm = ({
  isSubmitting,
  children,
  onSubmit,
  submitButtonText,
  errorMessage,
}: AuthFormProps) => {
  return (
    <div className="flex flex-col divide-y divide-slate-700 items-center justify-center bg-slate-800 border border-slate-700 rounded-2xl">
      <div className="p-4 md:p-8 w-full md:w-96">
        <form className="space-y-6" onSubmit={onSubmit}>
          {children}

          <Button loading={isSubmitting} type="submit" fullWidth>
            {submitButtonText}
          </Button>

          {errorMessage && (
            <div className="h-5">
              <p className="text-sm text-center text-red-500">{errorMessage}</p>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
