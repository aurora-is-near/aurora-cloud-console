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
  banner,
}: DashboardPageProps) => {
  const content = (
    <>
      <main className="overflow-auto flex-1">
        <Toaster />
        {banner && (
          <BaseContainer className="w-full bg-white shadow">
            {banner}
          </BaseContainer>
        )}
        <BaseContainer className="relative flex flex-col">
          {heading && (
            <div className="flex justify-between items-center mb-5">
              {typeof heading === "string" ? (
                <Heading tag="h1" size={headingSize}>
                  {heading}
                </Heading>
              ) : (
                <BreadcrumbHeading titles={heading} />
              )}
              {actions && (
                <div className="flex items-center gap-3">{actions}</div>
              )}
            </div>
          )}
          <div className="space-y-4 sm:space-y-5 flex flex-col flex-1">
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
