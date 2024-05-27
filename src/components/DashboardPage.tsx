import BreadcrumbHeading from "@/components/BreadcrumbHeading"
import Heading from "@/components/Heading"
import { Toaster } from "@/components/Toaster"
import clsx from "clsx"

import { DetailedHTMLProps, FormHTMLAttributes, ReactNode } from "react"

type DashboardPageProps = {
  children: ReactNode
  heading?: string | [string, string]
  actions?: ReactNode
  footer?: ReactNode
  banner?: ReactNode
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
const CONTAINER_CLASSNAME = "px-4 py-6 md:px-6 lg:px-8"

export const DashboardPage = ({
  children,
  footer,
  heading,
  actions,
  isForm,
  formProps,
  banner,
}: DashboardPageProps) => {
  const content = (
    <>
      <main className="overflow-auto">
        <Toaster />
        {banner && (
          <div className={clsx("w-full bg-white shadow", CONTAINER_CLASSNAME)}>
            {banner}
          </div>
        )}
        <div
          className={clsx(
            "relative min-h-screen flex flex-col",
            CONTAINER_CLASSNAME,
          )}
        >
          {heading && (
            <div className="flex justify-between items-center mb-7">
              {typeof heading === "string" ? (
                <Heading tag="h2">{heading}</Heading>
              ) : (
                <BreadcrumbHeading titles={heading} />
              )}
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
