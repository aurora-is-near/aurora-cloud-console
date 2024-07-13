import clsx from "clsx"
import { ReactNode } from "react"
import Card from "@/components/Card"

type OracleDeploymentStepProps = {
  stepNumber: number
  isDisabled?: boolean
  connectingLine?: "solid" | "dashed"
  children: ReactNode
}

export const OracleDeploymentStep = ({
  stepNumber,
  isDisabled,
  connectingLine,
  children,
}: OracleDeploymentStepProps) => {
  return (
    <div className="flex flex-row relative">
      <div
        className={clsx(
          "w-10 h-10 rounded-full flex items-center justify-center text-lg text-white font-medium mr-6 mt-4 md:mt-6 border border-slate-50 outline outline-8 outline-slate-50 z-10",
          isDisabled ? "bg-slate-400" : "bg-slate-900",
        )}
      >
        {stepNumber}
      </div>
      <Card isDisabled={isDisabled} className="flex-1">
        {children}
      </Card>
      {connectingLine && (
        <div
          className={clsx(
            "absolute top-10 md:top-16 left-[19px] h-full border border-1 border-slate-200",
            connectingLine === "dashed" && "border-dashed",
          )}
        />
      )}
    </div>
  )
}
