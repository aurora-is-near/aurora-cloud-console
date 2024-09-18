import React from "react"

interface StepProps {
  number: number
  title: string
  description: string
  children: React.ReactNode
  actionButton?: React.ReactNode
}

const Step: React.FC<StepProps> = ({
  number,
  title,
  description,
  children,
  actionButton,
}) => {
  return (
    <div className="mb-8 flex">
      <div className="relative w-8 h-8 mr-4 flex-shrink-0 z-10">
        <div
          className="absolute inset-0 bg-slate-50 rounded-full"
          style={{ transform: "scale(1.5)" }}
        />
        <div className="absolute inset-0 bg-slate-900 text-white rounded-full flex items-center justify-center">
          {number}
        </div>
      </div>
      <div className="w-full">
        <div className="flex justify-between items-start mb-1">
          <h2 className="text-2xl tracking-tighter font-semibold text-slate-900">
            {title}
          </h2>
          {actionButton && <div>{actionButton}</div>}
        </div>
        <p className="text-slate-500 mb-4">{description}</p>
        <div className="py-3 ">{children}</div>
      </div>
    </div>
  )
}

export default Step
