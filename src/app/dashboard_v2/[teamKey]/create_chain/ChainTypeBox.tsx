import React from "react"
import { NetworkType } from "@/app/dashboard_v2/[teamKey]/create_chain/useChainCreationForm"
import SelectableBox from "../../../../components/v2/dashboard/SelectableBox"
import { WarningOctagon } from "../../../../../public/static/v2/images/icons"

interface ChainTypeBoxProps {
  title: string
  description: string
  type: NetworkType
  onClick: () => void
  selected: boolean
}

const Label: React.FC<{ type: "free" | "enterprise" }> = ({ type }) => {
  const bgColor = type === "free" ? "bg-green-600" : "bg-slate-400"
  const textColor = type === "free" ? "text-green-50" : "text-green-50"
  const text = type === "free" ? "Free" : "Enterprise"

  return (
    <div
      className={`p-0.5 px-1.5 uppercase rounded-2xl text-xs font-medium ${bgColor} ${textColor}`}
    >
      {text}
    </div>
  )
}

const ChainTypeBox: React.FC<ChainTypeBoxProps> = ({
  title,
  description,
  type,
  onClick,
  selected,
}) => {
  return (
    <SelectableBox
      selected={selected}
      onClick={onClick}
      className="w-[50%] p-6"
    >
      <div className="flex flex-row justify-between items-start">
        <h3 className="font-semibold mb-2 text-slate-900 text-xl tracking-[-1px]">
          {title}
        </h3>
        <Label type={type === "devnet" ? "free" : "enterprise"} />
      </div>
      <p className="text-sm text-gray-600">{description}</p>
      {type === "devnet" && (
        <div className="flex flex-row items-start mt-2">
          <WarningOctagon className="w-5 h-4 mr-[5px]" />
          <p className="text-xs text-slate-500">
            Devnet is limited in functionalities and native assets cannot be
            bridged out.
          </p>
        </div>
      )}
    </SelectableBox>
  )
}

export default ChainTypeBox
