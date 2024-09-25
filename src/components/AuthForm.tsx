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
  )
}
