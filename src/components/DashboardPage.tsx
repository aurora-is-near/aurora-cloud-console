import clsx from "clsx"
import { DetailedHTMLProps, FormHTMLAttributes, ReactNode } from "react"
import BreadcrumbHeading from "@/components/BreadcrumbHeading"
import Heading from "@/components/Heading"
import { Toaster } from "@/components/Toaster"
import { BaseContainer } from "@/components/BaseContainer"

type DashboardPageProps = {
  children: ReactNode
  heading?: string | string[]
  headingSize?: "sm" | "md" | "lg"
  actions?: ReactNode
  footer?: ReactNode
  banner?: ReactNode
  className?: string
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

const WRAPPER_CLASSNAME = "h-full max-h-full flex-1 flex flex-col"

export const DashboardPage = ({
  children,
  footer,
  heading,
  headingSize,
  actions,
  isForm,
  formProps,
  className,
  banner,
}: DashboardPageProps) => {
  const content = (
    <>
      <main className={clsx("overflow-auto flex-1", className)}>
        <Toaster />
        {!!banner && (
          <BaseContainer className="w-full shadow">{banner}</BaseContainer>
        )}
        <BaseContainer className="relative flex flex-col">
          {!!heading && (
            <div className="flex justify-between items-center mb-6">
              {typeof heading === "string" ? (
                <Heading tag="h1" size={headingSize}>
                  {heading}
                </Heading>
              ) : (
                <BreadcrumbHeading titles={heading} />
              )}
              {!!actions && (
                <div className="flex items-center gap-3">{actions}</div>
              )}
            </div>
          )}
          <div className="flex flex-col flex-1 space-y-4 sm:space-y-5 mb-16">
            {children}
          </div>
        </BaseContainer>
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
