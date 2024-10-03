import React from "react"

interface StepProps {
  number: number
  title: string
  description: string
  children: React.ReactNode
  actionButton?: React.ReactNode
  frozen?: boolean
}

const Step: React.FC<StepProps> = ({
  number,
  title,
  description,
  children,
  actionButton,
  frozen = false,
}) => {
  return (
    <div className={`mb-8 flex ${frozen ? "pointer-events-none" : ""}`}>
      <div className="relative w-10 h-10 mr-4 flex-shrink-0 z-10">
        <div
          className="absolute inset-0 bg-slate-50 rounded-full"
          style={{ transform: "scale(1.5)" }}
        />
        <div className="absolute inset-0 bg-slate-900 text-white text-lg font-semibold rounded-full flex items-center justify-center">
          {number}
        </div>
      </div>
      <div className="w-full">
        <div className="flex justify-between items-start mb-1">
          <div className="flex flex-col">
            <h2 className="text-2xl tracking-[-1px] font-semibold text-slate-900">
              {title}
            </h2>
            <p className="text-slate-500 mb-4">{description}</p>
          </div>
          {actionButton && <div>{actionButton}</div>}
        </div>
        <div className="py-3 ">{children}</div>
      </div>
    </div>
  )
}

export default Step
