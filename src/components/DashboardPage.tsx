import Heading from "@/components/Heading"
import { Toaster } from "@/components/Toaster"

import { DetailedHTMLProps, FormHTMLAttributes, ReactNode } from "react"

type DashboardPageProps = {
  children: ReactNode
  heading?: string
  actions?: ReactNode
  footer?: ReactNode
} & (
  | {
      isForm: true
      formProps?: DetailedHTMLProps<
        FormHTMLAttributes<HTMLFormElement>,
        HTMLFormElement
      >
    }
  | {
      isForm?: never
      formProps?: never
    }
)

const WRAPPER_CLASSNAME = "max-h-full flex-1 flex flex-col"

export const DashboardPage = ({
  children,
  footer,
  heading,
  actions,
  isForm,
  formProps,
}: DashboardPageProps) => {
  const content = (
    <>
      <main className="overflow-auto">
        <Toaster />
        <div className="relative px-4 py-6 md:px-6 lg:px-8 min-h-screen flex flex-col">
          {heading && (
            <div className="flex justify-between items-center mb-7">
              <Heading tag="h2">{heading}</Heading>
              {actions && (
                <div className="flex items-center gap-3">{actions}</div>
              )}
            </div>
          )}
          <div className="space-y-4 sm:space-y-5">{children}</div>
        </div>
      </main>
      {footer}
    </>
  )

  if (isForm) {
    return (
      <form className={WRAPPER_CLASSNAME} {...formProps}>
        {content}
      </form>
    )
  }

  return <div className={WRAPPER_CLASSNAME}>{content}</div>
}
