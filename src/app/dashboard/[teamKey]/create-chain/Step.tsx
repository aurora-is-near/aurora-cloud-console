import clsx from "clsx"

interface StepProps {
  number: number
  title: string
  description: string
  children: React.ReactNode
  actionButton?: React.ReactNode
  hasError?: boolean
}

const Step: React.FC<StepProps> = ({
  number,
  title,
  description,
  children,
  actionButton,
  hasError,
}) => {
  return (
    <div className="mb-8 flex">
      <div className="relative w-10 h-10 mr-4 flex-shrink-0 z-10">
        <div className="absolute inset-0 bg-slate-50 rounded-full scale-150" />
        <div
          className={clsx(
            "absolute inset-0 text-white text-lg font-semibold rounded-full flex items-center justify-center",
            hasError ? "bg-rose-600" : "bg-slate-900",
          )}
        >
          {number}
        </div>
      </div>
      <div className="w-full">
        <div className="flex justify-between items-start mb-1">
          <div className="flex flex-col gap-2">
            <h2
              className={clsx(
                "text-2xl tracking-tight leading-7 font-bold",
                hasError ? "text-rose-600" : "text-slate-900",
              )}
            >
              {title}
            </h2>
            <p className="text-slate-500 font-normal mb-3">{description}</p>
          </div>
          {actionButton && <div>{actionButton}</div>}
        </div>
        <div className="py-3 ">{children}</div>
      </div>
    </div>
  )
}

export default Step
