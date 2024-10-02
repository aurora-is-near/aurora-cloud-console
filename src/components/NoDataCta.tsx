import { ComponentType, ReactNode } from "react"

type NoDataCtaProps = {
  title: string
  description?: string
  Icon: ComponentType<{ className?: string }>
  children?: ReactNode
  className?: string
}

export const NoDataCta = ({
  title,
  description,
  Icon,
  children,
  className,
}: NoDataCtaProps) => (
  <div className={className}>
    <div className="text-center flex flex-col items-center">
      <div className="bg-slate-200 rounded-lg p-3 flex justify-center items-center mx-auto">
        <Icon className="text-slate-900 w-6 h-6 shrink-0" />
      </div>
      <h3 className="mt-4 text-sm font-semibold text-slate-900">{title}</h3>
      {description && (
        <p className="mt-1 text-sm text-slate-500">{description}</p>
      )}
      {children && <div className="mt-6">{children}</div>}
    </div>
  </div>
)
